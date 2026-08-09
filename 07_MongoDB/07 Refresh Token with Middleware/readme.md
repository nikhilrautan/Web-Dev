Refresh Token & Middleware — Notes
1. Access Token vs Refresh Token
Access Token
Lifetime: short (15 min – 1 hr)
Stored: client memory / cookie
Purpose: har request ko authenticate karne ke liye
Invalidate: kabhi manually invalidate nahi hota, bas expire hota hai
Refresh Token
Lifetime: long (7 – 30 days)
Stored: database + cookie
Purpose: naya access token generate karne ke liye
Invalidate: ho sakta hai (password change, logout)

Refresh token basically ek "random string" hota hai jise hum DB me store karte hain taaki uska track rakh sakein.

2. Refresh Token ko DB me kyu store karte hain

Login ke time hum accessToken aur refreshToken dono generate karte hain, aur refreshToken ko user document ke andar DB me save kar dete hain.

Jab client naya access token maangta hai (refresh route pe):

Client se aaya hua refresh token lo
JWT verify karo
DB me stored refresh token se match karo
Match nahi hua -> 401 Unauthorized error bhejo
Match ho gaya -> naya access token (aur chaho to naya refresh token bhi) generate karo
js
// controllers/auth.controller.js
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json({ message: "Unauthorized request" });
  }

  try {
    const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded?._id);

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res.status(401).json({ message: "Refresh token is expired or used" });
    }

    const accessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    res
      .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
      .cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true })
      .json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};
3. Password Change -> Refresh Token Invalidate

Jab user password change karta hai:

Refresh token invalidate ho jata hai (security ke liye, agar purana token kisi ne churaya ho)
Access token invalidate nahi hota (wo apne aap expire ho jayega, short-lived hai)
js
const changeCurrentPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid old password" });
  }

  user.password = newPassword;
  user.refreshToken = undefined;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({ message: "Password changed successfully" });
};

Isse user ko dobara login karna padega, aur naya refresh token generate hoga.

4. Problem: Har route pe baar baar authentication code

GET, POST, DELETE — har jagah pehle user ko authenticate karna padta tha, jisse code repeat ho raha tha:

js
// bad practice - har controller me repeat
router.get("/profile", async (req, res) => {
  const token = req.cookies.accessToken;
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decoded._id);
  // actual logic
});

Isi problem ko solve karne ke liye middleware introduce hota hai.

5. Middleware kya hai

Middleware ek function hai jo request aur response ke beech me chalta hai, controller tak pahunchne se pehle. Ye request ko check ya modify kar sakta hai, aur next() call karke agle step pe bhej sakta hai.

Flow:

Client Request -> Middleware (auth check) -> Controller -> Response
Auth middleware (JWT verify)
js
// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized request" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded?._id).select("-password -refreshToken");

    if (!user) {
      return res.status(401).json({ message: "Invalid Access Token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: error?.message || "Invalid access token" });
  }
};
Attaching middleware to routes
js
// routes/user.routes.js
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getProfile, deleteAccount, changeCurrentPassword } from "../controllers/user.controller.js";

const router = Router();

router.get("/profile", verifyJWT, getProfile);
router.delete("/delete", verifyJWT, deleteAccount);
router.post("/change-password", verifyJWT, changeCurrentPassword);

export default router;

Ab har protected route me verifyJWT middleware add kar do. Authentication logic sirf ek jagah likha hua hai, sab jagah reuse ho raha hai.

6. Extra Notes and Best Practices
httpOnly cookies use karo tokens store karne ke liye, JS se access nahi ho payenge (XSS se protection)
secure: true cookie option production me lagao (sirf HTTPS pe bheje)
Refresh token ko DB me plain store karne ke bajaye chaho to hash karke bhi store kar sakte ho
Access token secret aur refresh token secret alag alag rakho (ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET)
Logout pe bhi refresh token ko DB se undefined/null kar do, taaki wo dobara use na ho sake
Middleware ko generic bana lo (verifyJWT), taaki auth ke alawa aur middlewares (role check, rate limit) isi pattern se bana sako
next() bhoolna mat, nahi to request hang ho jayegi
7. Flow Summary
1. Login -> accessToken + refreshToken generate -> refreshToken DB me save
2. Protected route hit -> verifyJWT middleware -> accessToken check -> req.user set -> controller run
3. AccessToken expire -> client refresh route call -> refreshToken DB se match -> naya accessToken + refreshToken
4. Password change -> refreshToken = undefined (DB) -> user ko dobara login karna padega
5. Logout -> refreshToken = undefined (DB) + cookies clear
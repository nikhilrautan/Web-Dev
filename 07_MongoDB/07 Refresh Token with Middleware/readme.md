🔐 Refresh Token & Middleware — Notes
1. Access Token vs Refresh Token
Property	Access Token	Refresh Token
Lifetime	Short (15m - 1hr)	Long (7d - 30d)
Storage	Client memory / cookie	Database + cookie
Purpose	Har request ko authenticate krne k liye	Naya access token generate krne k liye
Invalidate	❌ Kabhi invalidate nhi hoga (bas expire hoga)	✅ Invalidate ho skta hai (password change, logout)

Refresh Token is basically a "Random String" jo hum DB me store krte hai taaki uska track rakh saken.

2. Refresh Token ko DB me kyu store krte hai?
Jab user login krta hai → hum accessToken + refreshToken dono generate krte hai.
refreshToken ko hum Database me save kr dete hai (user document ke andar ek field refreshToken bna kr).
Jab bhi client naya access token maangega (refresh route pr), hum:
Client se aaya hua refresh token le lenge.
Verify krenge (JWT verify).
DB me stored refresh token se match krenge.
Match nhi hua → Error (401 Unauthorized) bhej denge.
Match ho gaya → naya accessToken (aur chaho to naya refreshToken bhi) generate kr denge.
js
// controllers/auth.controller.js
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json({ message: "Unauthorized request" });
  }

  try {
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded?._id);
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // 🔑 DB wale refresh token se match kro
    if (incomingRefreshToken !== user?.refreshToken) {
      return res.status(401).json({ message: "Refresh token is expired or used" });
    }

    // Naya access + refresh token generate kro
    const accessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken; // DB update
    await user.save({ validateBeforeSave: false });

    res
      .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
      .cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true })
      .json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};
3. Password Change → Refresh Token Invalidate

Jab user apna password change karta hai, to:

Refresh Token invalidate ho jayega (kyunki security risk hota hai — agar kisi ne purana refresh token chura liya ho).
Access Token invalidate nahi hoga (kyunki wo already short-lived hai, apne aap expire ho jayega).
js
const changeCurrentPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid old password" });
  }

  user.password = newPassword;
  user.refreshToken = undefined; // 🔑 refresh token ko invalidate kr diya
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({ message: "Password changed successfully" });
};

Isse forcefully user ko dobara login karna padega (naya refresh token generate hoga).

4. Problem: Har route pr baar-baar authentication code likhna

GET, POST, DELETE — har jagah pehle user ko authenticate karna padta tha, jisse code repeat ho raha tha:

js
// ❌ Bad practice: har controller me repeat
router.get("/profile", async (req, res) => {
  const token = req.cookies.accessToken;
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decoded._id);
  // ... actual logic
});

Isi problem ko solve karne ke liye Middleware introduce hota hai.

5. Middleware kya hai?

Middleware ek function hai jo request aur response ke beech me chalta hai — controller tak pahunchne se pehle. Ye request ko check/modify kar sakta hai, aur next() call karke agle step pr bhej sakta hai.

Client Request → Middleware (auth check) → Controller → Response
Auth Middleware (JWT Verify)
js
// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized request" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid Access Token" });
    }

    req.user = user; // ✅ user ko request object me attach kr diya
    next(); // agle middleware/controller ko call kro
  } catch (error) {
    return res.status(401).json({ message: error?.message || "Invalid access token" });
  }
};
Middleware ko routes me attach karna
js
// routes/user.routes.js
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getProfile, deleteAccount, changeCurrentPassword } from "../controllers/user.controller.js";

const router = Router();

// 🔒 Protected routes — pehle verifyJWT chalega, phir controller
router.get("/profile", verifyJWT, getProfile);
router.delete("/delete", verifyJWT, deleteAccount);
router.post("/change-password", verifyJWT, changeCurrentPassword);

export default router;

Ab har route ke andar verifyJWT middleware add kr do — authentication logic sirf ek jagah likha hua hai, sab jagah reuse ho raha hai. ✅

6. Extra Notes / Best Practices
httpOnly cookies use karo tokens store krne ke liye — JS se access nahi ho payenge (XSS se protection).
secure: true cookie option production me lagao (sirf HTTPS pr bheje).
Refresh token ko DB me plain store karne ke bajaye chaho to hash karke bhi store kr sakte ho (extra security layer).
Access token secret aur refresh token secret alag-alag rakho (ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET).
Logout pr bhi refresh token ko DB se undefined/null kr do — taaki wo dobara use na ho sake.
Middleware ko generic bana lo (verifyJWT) taaki auth ke alawa aur bhi middlewares (role-check, rate-limit) isi pattern se banaye ja saken.
next() bhoolna mat — nahi to request hang ho jayegi.
7. Flow Summary (Diagram)
1. Login → accessToken + refreshToken generate → refreshToken DB me save
2. Protected Route hit → verifyJWT middleware → accessToken check → req.user set → controller run
3. AccessToken expire → Client refresh route call → refreshToken DB se match → naya accessToken + refreshToken
4. Password Change → refreshToken = undefined (DB) → user ko dobara login karna padega
5. Logout → refreshToken = undefined (DB) + cookies clear
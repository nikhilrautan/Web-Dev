# Refresh Token & Auth Middleware
 
Notes on implementing JWT access/refresh token authentication with reusable Express middleware.
 
## Table of Contents
 
- [Access Token vs Refresh Token](#access-token-vs-refresh-token)
- [Why Store the Refresh Token in the DB](#why-store-the-refresh-token-in-the-db)
- [Password Change Invalidates the Refresh Token](#password-change-invalidates-the-refresh-token)
- [The Problem: Repeated Auth Code](#the-problem-repeated-auth-code)
- [What is Middleware](#what-is-middleware)
- [Best Practices](#best-practices)
- [Flow Summary](#flow-summary)
## Access Token vs Refresh Token
 
| | Access Token | Refresh Token |
|---|---|---|
| **Lifetime** | Short (15 min – 1 hr) | Long (7 – 30 days) |
| **Stored** | Client memory / cookie | Database + cookie |
| **Purpose** | Authenticate each request | Generate a new access token |
| **Invalidation** | Never invalidated manually, just expires | Can be invalidated (password change, logout) |
 
The refresh token is essentially a random string stored in the DB so its usage can be tracked.
 
## Why Store the Refresh Token in the DB
 
At login, both `accessToken` and `refreshToken` are generated, and the `refreshToken` is saved on the user's document in the DB.
 
When the client requests a new access token (via the refresh route):
 
1. Take the refresh token sent by the client
2. Verify the JWT
3. Match it against the token stored in the DB
4. No match → send `401 Unauthorized`
5. Match → generate a new access token (and optionally a new refresh token)
```js
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
```
 
## Password Change Invalidates the Refresh Token
 
When a user changes their password:
 
- The **refresh token is invalidated** (for security, in case the old token was stolen)
- The **access token is not invalidated** (it will expire on its own since it's short-lived)
```js
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
```
 
This forces the user to log in again, generating a new refresh token.
 
## The Problem: Repeated Auth Code
 
Every `GET`, `POST`, `DELETE` route needed to authenticate the user first, leading to duplicated code:
 
```js
// bad practice - repeated in every controller
router.get("/profile", async (req, res) => {
  const token = req.cookies.accessToken;
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decoded._id);
  // actual logic
});
```
 
Middleware solves this problem.
 
## What is Middleware
 
Middleware is a function that runs between the request and response, before it reaches the controller. It can check or modify the request, then pass control on via `next()`.
 
**Flow:**
 
```
Client Request -> Middleware (auth check) -> Controller -> Response
```
 
### Auth Middleware (JWT Verify)
 
```js
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
```
 
### Attaching Middleware to Routes
 
```js
// routes/user.routes.js
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getProfile, deleteAccount, changeCurrentPassword } from "../controllers/user.controller.js";
 
const router = Router();
 
router.get("/profile", verifyJWT, getProfile);
router.delete("/delete", verifyJWT, deleteAccount);
router.post("/change-password", verifyJWT, changeCurrentPassword);
 
export default router;
```
 
Now every protected route just adds the `verifyJWT` middleware. Authentication logic lives in one place and is reused everywhere.
 
## Best Practices
 
- Use `httpOnly` cookies to store tokens — they can't be accessed via JS (protects against XSS)
- Set `secure: true` on cookies in production (sent only over HTTPS)
- Optionally hash the refresh token before storing it in the DB, instead of storing it as plain text
- Keep `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` separate
- On logout, also set the refresh token to `undefined`/`null` in the DB so it can't be reused
- Keep middleware generic (`verifyJWT`) so other middlewares (role checks, rate limiting) can follow the same pattern
- Don't forget to call `next()` — otherwise the request will hang
## Flow Summary
 
1. **Login** → generate `accessToken` + `refreshToken` → save `refreshToken` in DB
2. **Protected route hit** → `verifyJWT` middleware → check `accessToken` → set `req.user` → run controller
3. **Access token expires** → client calls refresh route → match `refreshToken` against DB → issue new `accessToken` + `refreshToken`
4. **Password change** → `refreshToken = undefined` in DB → user must log in again
5. **Logout** → `refreshToken = undefined` in DB + clear cookies
 
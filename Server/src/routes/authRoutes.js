import express from "express";
import {
  signup,
  requestOtp,
  verifyOtp,
  getProfile,
} from "../controllers/authController.js";
import verifyToken from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/request-otp", requestOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.get("/profile", verifyToken, getProfile);

export default authRouter;
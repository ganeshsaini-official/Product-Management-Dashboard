import dotenv from 'dotenv';
dotenv.config();


import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateOTP, sendOTP } from "../utils/sendOtp.js";
import Otp from "../models/otp.js";

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const signup = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login."
      });
    }
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login."
      });
    }
    const user = await User.create({
      name,
      phone,
      email: email || "",
      role: "user"
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Signup successful",
      data: { user, token }
    });

  } catch (error) {

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(e => e.message);

      return res.status(400).json({
        success: false,
        message: errors[0]
      });
    }

    console.error("Signup Error:", error);

    res.status(500).json({
      success: false,
      message: "Signup failed"
    });
  }
};



const requestOtp = async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        error: "Email or phone required"
      });
    }
    if (phone && !/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid 10-digit Indian phone number"
      });
    }

    let user;

    if (email) {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({ phone });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found. Please signup first."
      });
    }

    const otp = generateOTP();

    const otpExpiresAt = new Date();
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 10);

    await Otp.create({
      phone: user.phone,
      email: user.email,
      otp,
      otpExpiresAt
    });

    await sendOTP(
      {
        phone: user.phone,
        email: user.email
      },
      otp
    );


    res.status(200).json({
      success: true,
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.error("OTP Request Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send OTP"
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { identifier, otp } = req.body; 

    if (!identifier || !otp) {
      return res.status(400).json({
        success: false,
        message: "Identifier and OTP are required"
      });
    }

    let user;
    if (identifier.includes("@")) {
      user = await User.findOne({ email: identifier });
    } else {
      user = await User.findOne({ phone: identifier });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const otpRecord = await Otp.findOne({
      phone: user.phone, 
      otp,
      otpExpiresAt: { $gt: new Date() }
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP"
      });
    }

    await Otp.deleteOne({ _id: otpRecord._id });

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({
      success: false,
      message: "OTP verification failed",
      error: error.message
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get profile",
      error: error.message
    });
  }
};

export {
  signup,
  requestOtp,
  verifyOtp,
  getProfile,
};
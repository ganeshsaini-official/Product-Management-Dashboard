import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: `<h2>Your OTP is: ${otp}</h2>
             <p>This OTP will expire in 10 minutes.</p>`,
    });

    return true;
  } catch (error) {
    console.error("Please check your internet :", error);
    return false;
  }
};

const sendPhoneOTP = async (phone, otp) => {
  try {
    return true;
  } catch (error) {
    console.error("Phone OTP Error:", error);
    return false;
  }
};

const sendOTP = async ({ phone, email }, otp) => {
  let results = [];

  if (phone) {
    results.push(await sendPhoneOTP(phone, otp));
  }

  if (email) {
    results.push(await sendEmailOTP(email, otp));
  }

  return results.every(Boolean);
};

const isOTPExpired = (otpExpiresAt) => {
  return new Date() > new Date(otpExpiresAt);
};

export { generateOTP, sendOTP, isOTPExpired };

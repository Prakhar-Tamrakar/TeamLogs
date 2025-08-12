import Employee from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

import Otp from "../models/otp.model.js";
import otpGenerator from "otp-generator";
import User from "../models/user.model.js";


export const signup = async (req, res , next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    // res.status(500).json(error.message)
    next(error)
  }
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  try {
    await Otp.create({ email, otp });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: "ankittamrakar3091@gmail.com",
        pass: "xcsi bypu dant kgpj", // move to env in production
      },
    });

    const mailOptions = {
      from: "ankittamrakar3091@gmail.com",
      to: email,
      subject: "One Time Password",
      text: `Hi, your one time password is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to send OTP",
          error: error.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: "OTP sent successfully",
        otp,
        messageId: info.messageId,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const validUser = await User.findOne({ email });
  const validOtp = await Otp.findOne({ email, otp });

  if (!validUser || !validOtp) {
    return res.status(401).json({
      success: false,
      message: "Invalid OTP or user not found",
    });
  }
  await Otp.deleteMany({ email });

  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
  const { password, ...rest } = validUser._doc;

  res
    .cookie("access_token", token, { httpOnly: true })
    .status(200)
    .json({ success: true, ...rest });
};
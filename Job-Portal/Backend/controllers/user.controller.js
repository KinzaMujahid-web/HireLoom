import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";

import crypto from "crypto";
import nodemailer from "nodemailer";







// new user registration
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password,  role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role ) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }


    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "Profile image is required",
        success: false,
      });
    }

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    await newUser.save();

    return res.status(201).json({
      message: `Account created successfully for ${fullname}`,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error registering user",
      success: false,
    });
  }
};








// existing user login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (user.role !== role) {
      return res.status(403).json({
        message: "You don't have the necessary role to access this resource",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const sanitizedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: sanitizedUser,
        success: true,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error login failed",
      success: false,
    });
  }
};







// Logout from account
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error logging out",
      success: false,
    });
  }
};






// update user profile
export const updateProfile = async (req, res) => {
  try {
    const {
      fullname,
      email,
      phoneNumber,
      bio,
      skills,
      location,
      experience,
      degree,
      institute,
      passingYear,
    } = req.body;

    const file = req.file;

    const userId = req.id;

    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;    
    if (bio) user.profile.bio = bio;
    if (skills) {
      user.profile.skills = skills.split(",");
    }
    if (location) {
      user.profile.location = location;
    }   
    if (experience) {
      user.profile.experience = experience;
    }

    user.profile.education = {
      degree: degree || user.profile.education?.degree,
      institute: institute || user.profile.education?.institute,
      passingYear:
        passingYear || user.profile.education?.passingYear,
    };

  if (file) {
    const fileUri = getDataUri(file);

    const cloudResponse = await cloudinary.uploader.upload(
      fileUri.content,
      
       {
      resource_type: "raw",
      folder: "resume_files",
      public_id:`resume_${userId}_${Date.now()}.pdf`,
      access_mode: "public",
    }
  
    );

   if (cloudResponse) {
        user.profile.resume =
          cloudResponse.secure_url;

        user.profile.resumeOriginalname =
          file.originalname;
      }
    }


    await user.save();

    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error updating profile",
      success: false,
    });
  }
};










// Forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "No account found with this email address.",
        success: false,
      });
    }

    if (user.authProvider === "google") {
      return res.status(400).json({
        message: "This account uses Google sign-in. Password reset is not available.",
        success: false,
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"HireLoom" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px;border:1px solid #e5e7eb;border-radius:12px;">
          <h2 style="margin:0 0 8px;font-size:20px;color:#111827;">Reset your password</h2>
          <p style="color:#6b7280;font-size:14px;margin:0 0 24px;">Hi ${user.fullname},</p>
          <p style="color:#374151;font-size:14px;margin:0 0 24px;">
            We received a request to reset your password. Click the button below to choose a new one.
            This link will expire in <strong>15 minutes</strong>.
          </p>
          <a href="${resetUrl}"
            style="display:inline-block;background:#1D9E75;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">
            Reset Password
          </a>
          <p style="color:#9ca3af;font-size:12px;margin-top:32px;">
            If you didn't request this, you can safely ignore this email. Your password will not change.
          </p>
          <hr style="border:none;border-top:1px solid #f3f4f6;margin:24px 0;" />
          <p style="color:#d1d5db;font-size:11px;margin:0;">HireLoom · This is an automated email, please do not reply.</p>
        </div>
      `,
    });

    return res.status(200).json({
      message: "Password reset link has been sent to your email.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error.", success: false });
  }
};








// Reset password
export const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "This reset link is invalid or has expired.",
        success: false,
      });
    }

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res.status(200).json({
      message: "Password reset successfully. You can now sign in.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error.", success: false });
  }
};




import {
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/sendMail.js";
import { generateTokenAndSetCookie } from "../utils/GenerateToken.js";
import { User } from "./../models/UserModel.js";
import bcrypt from "bcryptjs";

//register controller
export const RegisterController = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All the fields are required.");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    //generate a 6 digit verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    //create a new user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationCode,
      verificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours
    });

    //save the new user to the database
    await user.save();

    //jwt
    generateTokenAndSetCookie(res, user._id);

    //send verification email
    await sendVerificationEmail(user.email, verificationCode);

    res.status(201).json({
      success: true,
      message: "User added successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//verify email controller
export const VerifyEmailController = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationCode: code,
      verificationExpiresAt: { $gt: Date.now() }, //gt= greater than
    });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationCode = undefined; //remove the verficatin code from db after the verification is complete
    user.verificationExpiresAt = undefined;
    await user.save();

    //send welsome email
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      use: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in verify email controller", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//login controller
export const LoginController = async (req, res) => {
  res.send("LoginController");
};

//logout controller
export const LogoutController = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

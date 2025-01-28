import { sendVerificationEmail } from "../mailtrap/sendMail.js";
import { generateTokenAndSetCookie } from "../utils/GenerateToken.js";
import { User } from "./../models/UserModel.js";
import bcrypt from "bcryptjs";

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

export const LoginController = async (req, res) => {
  res.send("LoginController");
};

export const LogoutController = async (req, res) => {
  res.send("LogoutController");
};

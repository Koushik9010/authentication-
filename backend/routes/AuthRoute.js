import express from "express";
import {
  LoginController,
  LogoutController,
  RegisterController,
  VerifyEmailController,
} from "../controllers/AuthControllers.js";

const router = express.Router();

router.post("/register", RegisterController);

router.post("/login", LoginController);

router.post("/logout", LogoutController);

router.post("/verify-email", VerifyEmailController);

export default router;

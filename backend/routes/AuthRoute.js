import express from "express";
import { LoginController, LogoutController, RegisterController } from "../controllers/AuthControllers.js";

const router = express.Router();

router.get("/register", RegisterController);

router.get("/login", LoginController);

router.get("/logout", LogoutController);

export default router;

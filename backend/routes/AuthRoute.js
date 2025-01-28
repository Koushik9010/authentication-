import express from "express";
import { LoginController, LogoutController, RegisterController } from "../controllers/AuthControllers.js";

const router = express.Router();

router.post("/register", RegisterController);

router.post("/login", LoginController);

router.post("/logout", LogoutController);

export default router;

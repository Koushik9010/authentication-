import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1/auth", authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});

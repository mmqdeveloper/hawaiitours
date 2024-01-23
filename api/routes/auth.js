import express from "express";
import { login, register, logout, loginByToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/login-by-token", loginByToken)
router.post("/logout", logout)

export default router
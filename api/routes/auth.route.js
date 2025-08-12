import express from "express";
import {signup , sendOtp , verifyOtp} from "../controllers/auth.controller.js";



const router = express.Router();

router.post('/signup' , signup)
router.post('/send-otp', sendOtp)
router.post('/verify-email', verifyOtp)


export default router;
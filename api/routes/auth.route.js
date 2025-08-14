import express from "express";
import {signup , sendOtp , verifyOtp,signinVerifyEmail, signin} from "../controllers/auth.controller.js";



const router = express.Router();

router.post('/signup' , signup)
router.post('/signin' , signin)
router.post('/signup-send-otp', sendOtp)
router.post('/signup-verify-email', verifyOtp)
router.post('/signin-verify-email',signinVerifyEmail)


export default router;
import express from "express";
import {signup , sendOtp} from "../controllers/auth.controller.js";



const router = express.Router();

router.post('/signup' , signup)
router.post('/send-otp', sendOtp)


export default router;
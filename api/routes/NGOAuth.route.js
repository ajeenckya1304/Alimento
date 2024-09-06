import express from 'express';
import { NGOForgotpassword, NGOUpdatePassword, NGOVerifyOTP, NGOsignOut, NGOsignin, NGOsignup, google, sendOTP} from '../controllers/NGOAuth.controller.js';

const NGOrouter = express.Router();

NGOrouter.post("/NGOsignup", NGOsignup);
NGOrouter.post("/NGOsignin", NGOsignin);
NGOrouter.post("/NGOForgotpassword", NGOForgotpassword);
NGOrouter.post("/NGOVerifyOTP", NGOVerifyOTP);
NGOrouter.post("/NGOUpdatePassword", NGOUpdatePassword);
NGOrouter.post("/sendOTP", sendOTP);
NGOrouter.post("/google", google);
NGOrouter.get("/NGOsignOut", NGOsignOut);

export default NGOrouter;
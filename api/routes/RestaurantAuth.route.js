import express from 'express';
import { RestaurantForgotpassword, RestaurantUpdatePassword, RestaurantVerifyOTP, RestaurantsignOut, Restaurantsignin, Restaurantsignup } from '../controllers/RestaurantAuth.controller.js';
import { google, sendOTP } from '../controllers/NGOAuth.controller.js';

const Restaurantrouter = express.Router();

Restaurantrouter.post("/Restaurantsignup", Restaurantsignup);
Restaurantrouter.post("/Restaurantsignin", Restaurantsignin);
Restaurantrouter.post("/RestaurantForgotpassword",RestaurantForgotpassword);
Restaurantrouter.post("/RestaurantUpdatePassword",RestaurantUpdatePassword);
Restaurantrouter.post("/RestaurantVerifyOTP",RestaurantVerifyOTP);
Restaurantrouter.post("/sendOTP", sendOTP);
Restaurantrouter.post("/google", google);
Restaurantrouter.get("/RestaurantsignOut", RestaurantsignOut);

export default Restaurantrouter;
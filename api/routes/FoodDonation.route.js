import express from 'express';
import { RestaurantverifyToken } from '../utils/verifyRestaurantUser.js';
import { CreateFoodDonation, getAllDonations, getDonation, receiveDonation } from '../controllers/FoodDonation.controller.js';
// import { NGOverifyToken } from '../utils/verifyNGOUser.js';

const router = express.Router();

router.post('/create', RestaurantverifyToken, CreateFoodDonation);
router.get('/get/:id', getDonation);
router.get('/getAll', getAllDonations);
router.post('/donations/:id/receive', receiveDonation);
// router.get('/currentUser', [RestaurantverifyToken, NGOverifyToken], getCurrentUser);

export default router;

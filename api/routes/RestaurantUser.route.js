import express from 'express';
import { RestaurantupdateUser, deleteRestaurantUser, getRestaurantUserDonations, testR } from '../controllers/RestaurantUser.controller.js';
import { RestaurantverifyToken } from '../utils/verifyRestaurantUser.js';


const router = express.Router();

router.get('/testR', testR);
router.post('/Restaurantupdate/:id', RestaurantverifyToken, RestaurantupdateUser)
router.delete('/delete/:id', RestaurantverifyToken, deleteRestaurantUser)
router.get('/donations/:id', RestaurantverifyToken, getRestaurantUserDonations)

export default router;
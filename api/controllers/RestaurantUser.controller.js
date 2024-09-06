import RestaurantUser from '../models/RestaurantUser.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import FoodDonate from '../models/FoodDonate.model.js';

export const testR = (req, res) => {
    res.json({
        message: 'Api route is working',
    })
}

export const RestaurantupdateUser = async (req, res, next) => {
    if (req.RestaurantUser.id !== req.params.id)
      return next(errorHandler(401, 'You can only update your own account!'));
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
      const RestaurantupdatedUser = await RestaurantUser.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
  
      const { password, ...rest } = RestaurantupdatedUser._doc;
  
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

  export const deleteRestaurantUser = async (req, res, next) => {
    if (req.RestaurantUser.id !== req.params.id)
      return next(errorHandler(401, 'You can only delete your own account!'));
    try {
      await RestaurantUser.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted!');
    } catch (error) {
      next(error);
    }
  };

  export const getRestaurantUserDonations = async (req, res, next) => {
    if (req.RestaurantUser.id === req.params.id) {
      try {
        const donations = await FoodDonate.find({ userId: req.RestaurantUser.id });
        res.status(200).json(donations);
      } catch (error) {
        console.error("Error occurred while fetching donations: ", error);
        next(error);
      }
    } else {
      return next(errorHandler(401, 'You can only view your own listings!'));
    }
  };
  
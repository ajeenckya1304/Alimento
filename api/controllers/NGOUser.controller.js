import NGOUser from '../models/NGOUser.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const testN = (req, res) => {
    res.json({
        message: 'Api route is working',
    })
}

export const NGOupdateUser = async (req, res, next) => {
    if (req.NGOUser.id !== req.params.id)
      return next(errorHandler(401, 'You can only update your own account!'));
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
      const NGOupdatedUser = await NGOUser.findByIdAndUpdate(
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
  
      const { password, ...rest } = NGOupdatedUser._doc;
  
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

  export const deleteNGOUser = async (req, res, next) => {
    if (req.NGOUser.id !== req.params.id)
      return next(errorHandler(401, 'You can only delete your own account!'));
    try {
      await NGOUser.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted!');
    } catch (error) {
      next(error);
    }
  };
  
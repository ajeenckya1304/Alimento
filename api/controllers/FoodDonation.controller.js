import FoodDonate from "../models/FoodDonate.model.js";
import nodemailer from 'nodemailer';
// import NGOUser from '../models/NGOUser.model.js';
// import RestaurantUser from '../models/RestaurantUser.model.js';

export const CreateFoodDonation = async (req, res, next) => {
  try {
    const newFoodDonation = await FoodDonate.create({ ...req.body, userId: req.RestaurantUser.id });
    return res.status(201).json(newFoodDonation);
  } catch (error) {
    next(error);
  }
};

export const getDonation = async (req, res, next) => {
  try {
    const donation = await FoodDonate.findById(req.params.id);
    if (!donation) {
      return next(errorHandler(404, 'Donation not found!'));
    }
    res.status(200).json(donation);
  } catch (error) {
    next(error);
  }
};


export const getAllDonations = async (req, res, next) => {
  try {
    const donations = await FoodDonate.find().populate('userId', 'username email'); // Include 'email'
    res.status(200).json(donations);
  } catch (error) {
    next(error);
  }
};

export const receiveDonation = async (req, res, next) => {
  try {
    const donation = await FoodDonate.findById(req.params.id).populate('userId', 'username email');
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Send email to user who made the donation
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: donation.userId.email,
      subject: 'Your donation has been requested',
      text: `Hello ${donation.userId.username},

Your donation has been requested by the NGO. Here are the details of your donation:

- Food Name: ${donation.Food_Name}
- Category: ${donation.Type_Of_Food}
- Type: ${donation.Meal_Type}
- Quantity: ${donation.Qauntity}
- Address: ${donation.Address}

The NGO will soon contact you. Thank you for your generosity!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    // Update donation status
    donation.status = 'Received';
    await donation.save();

    res.status(200).json(donation);
  } catch (error) {
    next(error);
  }
};

// export const getCurrentUser = async (req, res, next) => {
//   try {
//     let user = null;

//     if (req.RestaurantUser) {
//       user = await RestaurantUser.findById(req.RestaurantUser.id);
//     } else if (req.NGOUser) {
//       user = await NGOUser.findById(req.NGOUser.id);
//     }
//     res.json(user);
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }
//     else{
//       return res.status(201).json({msg: 'success'});

//     }

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

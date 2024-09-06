import bcryptjs from 'bcryptjs';
import RestaurantUser from '../models/RestaurantUser.model.js';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';


const sendVerificationEmail1 = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  let mailOptions1 = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for AliMento signup',
    text: `Your OTP for AiMento signup is: ${otp}`,
    html: `<p>Your OTP for AliMento signup is: <strong>${otp}</strong></p>`
  };

  await transporter.sendMail(mailOptions1);
};

export const sendOTP = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Generate an OTP and send it to the email
    const otp = generateOTP();
    await sendVerificationEmail1(email, otp);

    // Store the OTP in the session for later verification
    req.session.otp = otp;
    req.session.email = email; // Store the email in the session

    res.status(200).json({ message: 'OTP sent successfully. Please check your email.' });
  } catch (error) {
    next(error);
  }
};


export const Restaurantsignup = async (req, res, next) => {
  const { username, email, password, address, otp } = req.body;

  try {
    // Verify the OTP and email
    
    if (req.session.otp !== parseInt(otp) || req.session.email !== email) {
      return res.status(400).json({ error: 'Invalid OTP or email. Please try again.' });
    }

    // Check if the email already exists in the database
    const existingUser = await RestaurantUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Store the user data in the database with a status of 'pending'
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new RestaurantUser({ username, email, password: hashedPassword, address });
    await newUser.save();

    // Clear the OTP and email from the session
    req.session.otp = null;
    req.session.email = null;

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    next(error);
  }
};


export const Restaurantsignin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validRestaurantUser = await RestaurantUser.findOne({ email });
    if (!validRestaurantUser) return next(errorHandler(404, 'User not found!'));
    const validRestaurantPassword = bcryptjs.compareSync(password, validRestaurantUser.password);
    if (!validRestaurantPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validRestaurantUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validRestaurantUser._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};


const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); 
};

const sendOTPEmail = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP for password reset is: ${otp}`,
    html: `<p>Your OTP for password reset is: <strong>${otp}</strong></p>`
  };

  await transporter.sendMail(mailOptions);
};


export const RestaurantForgotpassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await RestaurantUser.findOne({ email });
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const otp = generateOTP();
    user.otp = otp; // Assigning the generated OTP to user.otp
    await user.save(); // Save the updated user object to the database

    await sendOTPEmail(email, otp);
     
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    next(error);
  }
};


export const RestaurantVerifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;
  
  try {
    const user = await RestaurantUser.findOne({ email });
    
    if (user.otp !== parseInt(otp)) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    next(error);
  }
};


export const RestaurantUpdatePassword = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    // Hash the new password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Find the user by email
    const user = await RestaurantUser.findOne({ email });

    // Check if user exists
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error("Error updating password:", error);
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await RestaurantUser.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new RestaurantUser({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const RestaurantsignOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};
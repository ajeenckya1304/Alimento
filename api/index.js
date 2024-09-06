import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import NGOUserRouter from './routes/NGOUser.route.js'
import RestaurantUserRouter from './routes/RestaurantUser.route.js'
import NGOAuthRouter from './routes/NGOAuth.route.js';
import RestaurantAuthRouter from './routes/RestaurantAuth.route.js';
import cookieParser from 'cookie-parser';
import router from './routes/FoodDonation.route.js';
import path from 'path';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });
  
const __dirname = path.resolve();

const app = express();

// Use the session middleware
app.use(session({
  secret: 'asdf123', // replace 'your secret key' with your own secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Note: the 'secure' option should be true if you're using HTTPS
}));

app.use(express.json());

app.use(cookieParser());

app.listen(5000, () => {
  console.log('Server is running on port 5000!');
});

app.use('/api/NGOUser', NGOUserRouter);
app.use('/api/RestaurantUser', RestaurantUserRouter);
app.use('/api/NGOAuth', NGOAuthRouter);
app.use('/api/RestaurantAuth', RestaurantAuthRouter);
app.use('/api/FoodDonation', router);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

import mongoose from 'mongoose';

const RestaurantuserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar:{
      type: String,
      default: "client\public\blank profile.png"
    },
    otp:{
      type: Number,
      default: 0
    },
    address:{
      type: String, // You can adjust the type based on your requirements (e.g., coordinates, full address, etc.)
      required: true,
    }
  },
  { timestamps: true }
);

const RestaurantUser = mongoose.model('Restaurant User', RestaurantuserSchema);

export default RestaurantUser;

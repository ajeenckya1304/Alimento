import mongoose from 'mongoose';

const foodDonateSchema = new mongoose.Schema(
  {
    Food_Name: {
      type: String,
      required: true,
    },
    Type_Of_Food: {
      type: String,
      required: true,
    },
    Meal_Type: {
      type: String,
      required: true,
    },
    Qauntity: {
      type: Number,
      required: true,
    },
    PhoneNumber: {
      type: Number,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Restaurant User', // This assumes you have a User model
    },
  },
  { timestamps: true }
);

const FoodDonate = mongoose.model('FoodDonate', foodDonateSchema);

export default FoodDonate;

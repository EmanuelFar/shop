const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  cart: {
    items: {
      type: [
        {
          productName: { type: String, required: true },
          quantity: { type: Number, default: 1 },
          price: { type: Number, required: true }
        }
      ],
      default: []
    }
  }
});

// Check if we're in a test environment
const isTest = process.env.NODE_ENV === 'test';
console.log('Current NODE_ENV:', process.env.NODE_ENV);
console.log('Is test environment:', isTest);

// Use the test collection name if we're in test environment
const collectionName = isTest ? 'playwright-test-users' : 'users';
console.log('Using collection:', collectionName);

const User = mongoose.model("User", userSchema, collectionName);

module.exports = User;

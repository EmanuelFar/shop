require("dotenv").config();

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");

const db = process.env.MONGODB_URI;

mongoose.connect(db)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log(err);
});

router.get("/", (res) => {
  res.send("from API route");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            // User not found
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Check password
        if (user.password !== password) {
            // Password does not match
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful!", user: { email: user.email } });
    } catch (err) {
        res.status(500).json({ message: "Error logging in!" });
    }
});

router.post("/register", async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    // Email validation 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email address" });
    }

    // Password length and capital letter check
    const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: "Password must be at least 6 characters and also contain 1 capital letter" });
    }

    // Confirm password check
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    try {
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({ email, password });
        await user.save();
        console.log("User registered successfully:", email);
        res.status(200).json({ message: "User registered!" });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ 
            message: "Error registering user!",
            error: err.message 
        });
    }
});

// Simple validation endpoint that checks if user exists
router.post("/validate", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ valid: true, user: { email: user.email } });
    } else {
      res.status(401).json({ valid: false, message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ valid: false, message: "Error validating user" });
  }
});


/********* CART ROUTES *********/

router.post("/cart", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Return only the items array
    res.json({ cart: user.cart.items });
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});

router.post("/cart/add", async (req, res) => {
  const { email, productName, price } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) { 
      return res.status(404).json({ message: "User not found" }); 
    }

    // Initialize cart if it doesn't exist
    if (!user.cart) {
      user.cart = { items: [] };
    }

    // Ensure items array exists
    if (!Array.isArray(user.cart.items)) {
      user.cart.items = [];
    }

    // Check if the product already exists in the cart
    const productIndex = user.cart.items.findIndex(item => item.productName === productName);
    if (productIndex !== -1) {
      // Product already exists, increment quantity
      user.cart.items[productIndex].quantity += 1;
    } else {
      // Product does not exist, add it to the cart
      user.cart.items.push({ 
        productName,
        quantity: 1,
        price: Number(price) // Ensure price is a number
      });
    }

    await user.save();
    res.json({ 
      message: "Product added to cart successfully",
      cart: user.cart.items 
    });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ 
      message: "Error adding product to cart",
      error: err.message 
    });
  }
});

router.post("/cart/delete", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart = { items: [] };
    await user.save();
    res.json({ message: "Cart deleted successfully" });
  } catch (err) {
    console.error("Error deleting cart:", err);
    res.status(500).json({ message: "Error deleting cart" });
  }
});

module.exports = router;

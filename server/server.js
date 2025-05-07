require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api");
const cors = require("cors");

const port = process.env.PORT || 3000;

// Log environment and collection info
console.log('Using collection:', process.env.NODE_ENV === 'test' ? 'playwright-test-users' : 'users');

app.use(cors());
app.use(bodyParser.json());
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


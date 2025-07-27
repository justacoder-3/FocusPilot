// setup
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// app connection
const app = express();

// middleware to parse the data
app.use(express.urlencoded({ extended: true }));

// MONGODB connection connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MONGODB Connected"))
  .catch(err => console.error("MONGODB error:", err));

app.get('/', (req, res) => {
  res.send("working");
});

// starting the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

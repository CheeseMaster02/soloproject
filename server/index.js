const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://assalleyloganj:HssXzS5JuId5f8jY@cluster0.a5xv8sw.mongodb.net/mydatabase?retryWrites=true&w=majority"
);

app.get("/getUsers", async (req, res) => {
  try {
    const result = await UserModel.find({});
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/addUser", async (req, res) => {
  const user = req.body; // req.body will be whatever is passed in from the client side
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user);
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

const express = require("express");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/gentoken");

const User = require("../model/User");

const usersRoute = express.Router();

// Rgister route
usersRoute.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({
      email: email,
    });
    if (userExists) {
      throw new Error("User already exists");
    }
    const userCreated = await User.create({
      name,
      email,
      password,
    });
    res.json({
        _id: userCreated._id,
        name: userCreated.name,
        password: userCreated.password,
        email: userCreated.password,
        token: generateToken(userCreated._id),
      });
  })
);

// Login route
//Login
usersRoute.post(
    '/login',
    asyncHandler(async (req, res) => {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (user && (await user.isPasswordMatch(password))) {
        //set status code
        res.status(200);
  
        res.json({
          _id: user._id,
          name: user.name,
          password: user.password,
          email: user.password,
        token: generateToken(user._id),
        });
      } else {
        res.status(401);
        throw new Error('Invalid credentials');
      }
    })
  );

// update route
usersRoute.put("/update", (req, res) => {
  res.send("update route");
});

// delete route
usersRoute.delete("/:id", (req, res) => {
  res.send("delete route");
});

// fetch route
usersRoute.get("/", (req, res) => {
  res.send("fetch route");
});

module.exports = usersRoute;

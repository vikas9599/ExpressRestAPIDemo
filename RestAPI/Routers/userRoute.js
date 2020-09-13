const express = require("express");
const app = express();
const router = express.Router();
const User = require("../Models/Users");
const { signUpValidation } = require("../Validation/validation");
const jwt = require("jsonwebtoken");

// To return the number of user
router.get("/list", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong",
    });
  }

  res.send("Welcome to user route");
});

//To save the user data
router.post("/signup", async (req, res) => {
  const { error } = signUpValidation(req.body);

  if (error)
    return res.status().json({
      message: error.details[0].message,
    });

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });

  try {
    const svUser = await user.save();
    const data = {
      status: 200,
      message: "User created successfully",
      data: svUser,
    };

    res.send(data);
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong",
    });
  }
});

//To get the specific user info
router.get("/list/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    console.log("ID is  " + req.param.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong",
    });
  }
});

//To delete the existing user
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  if (!userId)
    return res.status(404).json({
      message: "User id is not find",
    });

  try {
    const id = req.body.id;
    const deleteUser = await User.remove({ _id: userId });
    res.status(200).json({
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;

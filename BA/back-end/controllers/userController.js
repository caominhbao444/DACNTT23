const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//@desc Get all users
//@route GET /api/users
//@access private

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

//@desc Get all users
//@route GET /api/users
//@access private
const createUser = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);

  const newUser = new User({
    fullname: req.body.fullname,
    phone: req.body.phone,
    city: req.body.city,
    from: req.body.from,
    education: req.body.education,
    email: req.account.email,
    accountId: req.account.id,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }

  res.status(201).json(savedUser);
});

//@desc Get user
//@route GET /api/users/:id
//@access private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!users) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(user);
});

//@desc Update user
//@route PUT /api/users/:id
//@access private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

//@desc Delete user
//@route DELETE /api/users/:id
//@access private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await User.deleteOne({ _id: req.params.id });
  res.status(200).json(user);
});

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};

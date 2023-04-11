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
  const { fullname, email, phone, city , from } = req.body;
  if (!fullname || !email || !phone || !city || !from) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const users = await User.create({
    fullname,
    email,
    phone,
    city,
    from,
    accountId: req.account.id,
    //userId : req.user.id
  });

  res.status(201).json(users);
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

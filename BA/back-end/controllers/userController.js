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
    phone: req.body.phone,
    city: req.body.city,
    from: req.body.from,
    education: req.body.education,
    username : req.account.username,
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

const inforUser = asyncHandler(async (req, res) => {
  const currentUser = await User.findOne({ accountId: req.account.id });
  if(currentUser){
    res.status(200).json(currentUser);
  }else{
    res.status(404);
    throw new Error("User not found")
  }
});

const followUser = asyncHandler(async (req, res) => {
  if (req.body._id != req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findOne({ accountId: req.account.id });
      if (!user.followers.includes(currentUser._id)) {
        await user.updateOne({ $push: { followers: currentUser._id } });
        await currentUser.updateOne({ $push: { followings: user._id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

const unfollowUser = asyncHandler(async (req, res) => {
  if (req.body._id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findOne({ accountId: req.account.id });
      if (user.followers.includes(currentUser._id)) {
        await user.updateOne({ $pull: { followers: currentUser._id } });
        await currentUser.updateOne({ $pull: { followings: user._id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

const friendsUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const friends = await Promise.all(
    user.followings.map((friendId) => {
      return User.findById(friendId);
    })
  );
  const friendList = friends.map((friend) => {
    const { _id, username } = friend;
    return { _id, username };
  });
  res.status(200).json(friendList);
});



const test = asyncHandler(async (req, res) => {
 
});

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  inforUser,
  followUser,
  unfollowUser,
  friendsUser,
  test,
};

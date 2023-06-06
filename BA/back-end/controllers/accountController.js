const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/accountModel");
const moment = require("moment-timezone");

//@desc Register a account
//@route POST /api/accounts/register
//@access public
const register = asyncHandler(async (req, res) => {
  const { fullname, email, password, phone, city, from, education, img } =
    req.body;
  if (
    !fullname ||
    !email ||
    !password ||
    !phone ||
    !city ||
    !from ||
    !education ||
    !img
  ) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const accountAvailable = await Account.findOne({ email });
  if (accountAvailable) {
    res.status(400);
    throw new Error("Account already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const account = await Account.create({
    fullname,
    email,
    password: hashedPassword,
    phone,
    city,
    from,
    education,
    img,
    createdAt: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
  });

  console.log(`Account created ${account}`);
  if (account) {
    res.status(201).json({ _id: account.id, email: account.email });
  } else {
    res.status(400);
    throw new Error("Account data us not valid");
  }
  res.json({ message: "Register the  Admin account" });
});

//@desc Login account
//@route POST /api/accounts/login
//@access public

const loginAccount = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const account = await Account.findOne({ email });

  //compare password with hashedpassword
  if (account && (await bcrypt.compare(password, account.password))) {
    const accessToken = jwt.sign(
      {
        account: {
          fullname: account.fullname,
          email: account.email,
          id: account.id,
          phone: account.phone,
          city: account.city,
          from: account.from,
          education: account.education,
          img: account.img,
          isAdmin : account.isAdmin,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "1d" }
    );
    res.cookie("jwt", accessToken, {});
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

const getAccounts = asyncHandler(async (req, res) => {
  try {
    const account = await Account.find();
    if (!account) {
      res.status(404);
      throw new Error("Account not found");
    } else {
      res.status(200).json(account);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//@desc Current account info
//@route POST /api/accounts/current
//@access private
const currentAccount = asyncHandler(async (req, res) => {
  const account = await Account.findOne(req.account);

  if (account && account.isAdmin === true) {
    res.send({
      message: "You Are ADMIN",
      account,
    });
  } else {
    res.send({
      message: "You Are NOT ADMIN",
      account,
    });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  //check account exist
  const accountAvailable = await Account.findOne({ email: req.params.email });
  if (!accountAvailable) {
    res.status(403);
    throw new Error("Account have not already registered!");
  }
  //Hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log("Hashed Password: ", hashedPassword);
  await Account.findOneAndUpdate(
    { email: req.params.email },
    { password: hashedPassword }
  );
  res.status(200).json({ message: "Reset password successfully" });
});

const updateAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (account._id == req.account.id) {
    const update = await Account.findOneAndUpdate(
      { _id: req.params.id },
      {
        fullname: req.body.fullname,
        email: req.account.email,
        password: hashedPassword,
        phone: req.body.phone,
        city: req.body.city,
        from: req.body.from,
        education: req.body.education,
        img: req.body.img,
        createdAt:req.account.createdAt,
        updatedAt: moment()
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        new: true,
      }
    );
    if (!update) {
      res.status(404);
      throw new Error("Account không tìm thấy");
    } else {
      res.status(201).json(update);
    }
  } else {
    res.status(403).json("không được phép chỉnh sửa");
  }
});

const deleteAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);
  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }

  await account.deleteOne({ _id: req.params.id });
  res.status(200).json(account);
});

const getAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);
  res.status(200).json(account);
});

const followAccount = asyncHandler(async (req, res) => {
  if (req.body._id != req.params.id) {
    try {
      const account = await Account.findById(req.params.id);
      const currentAccount = await Account.findOne(req.account);
      if (!account.followers.includes(currentAccount._id)) {
        await account.updateOne({ $push: { followers: currentAccount._id } });
        await currentAccount.updateOne({ $push: { followings: account._id } });
        res.status(200).json("Account has been followed");
      } else {
        res.status(403).json("you allready follow this Account");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

const unfollowAccount = asyncHandler(async (req, res) => {
  if (req.body._id !== req.params.id) {
    try {
      const account = await Account.findById(req.params.id);
      const currentAccount = await Account.findOne(req.account);
      if (account.followers.includes(currentAccount._id)) {
        await account.updateOne({ $pull: { followers: currentAccount._id } });
        await currentAccount.updateOne({ $pull: { followings: account._id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(404).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

const friendsAccount = asyncHandler(async (req, res) => {
  try {
    const account = await Account.findOne(req.account).lean();
    const friendIds = account.followings;
    const friends = await Account.find({ _id: { $in: friendIds } }).lean();
    const friendList = friends.map((friend) => ({
      _id: friend._id,
      fullname: friend.fullname,
      img: friend.img,
    }));
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

const notFriendsAccount = asyncHandler(async (req, res) => {
  try {
    const account = await Account.find();
    const currentAccount = await Account.findOne(req.account);
    if (!currentAccount.followings.includes(account._id)) {
      res.status(200).json(account);
    } else {
      res.status(404).json("cant find friends");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

const checkFriends = asyncHandler(async (req, res) => {
  if (req.body._id !== req.params.id) {
    try {
      const account = await Account.findById(req.params.id);
      const currentAccount = await Account.findOne(req.account);
      if (
        currentAccount.followings.includes(account._id) &&
        req.params.id !== req.account.id
      ) {
        res.status(200).json({ check: 1 });
      } else if (req.params.id === req.account.id) {
        res.status(201).json({ check: 2 });
      } else {
        res.status(202).json({ check: 0 });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(404).json("Friends not found");
  }
});

module.exports = {
  register,
  loginAccount,
  getAccounts,
  getAccount,
  currentAccount,
  resetPassword,
  updateAccount,
  deleteAccount,
  followAccount,
  unfollowAccount,
  friendsAccount,
  notFriendsAccount,
  checkFriends,
};

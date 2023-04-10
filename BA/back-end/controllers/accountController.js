const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/accountModel");


//@desc Register a account
//@route POST /api/accounts/register
//@access public
const register = asyncHandler(async (req, res) => {
  const { username, email, password} = req.body;
  if (!username || !email || !password) {
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
    username,
    email,
    password: hashedPassword,
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
          username: account.username,
          email: account.email,
          id: account.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});


const getAccount = asyncHandler(async(req,res)=>{
  const account = await Account.find();
 
  if(!account){
    res.status(404);
    throw new Error("Account not found");
  }else{
    res.json(account);
  }
})

//@desc Current account info
//@route POST /api/accounts/current
//@access private
const currentAccount = asyncHandler(async (req, res) => {
  const account = await Account.findOne(req.account);

  if (account && account.isAdmin === true) {
    res.send({message :"You Are ADMIN", id : account.id, username: account.username , email: account.email});
  }
  else{
    res.send({message :"You Are NOT ADMIN", id : account.id, username: account.username , email: account.email});
  }
});



const resetPassword = asyncHandler(async (req,res)=>{
  //check account exist
  const accountAvailable = await Account.findOne({email:req.params.email});
  if (!accountAvailable) {
    res.status(400);
    throw new Error("Account have not already registered!");
  }
  //Hash password
  const hashedPassword = await bcrypt.hash(req.body.password,10);
  console.log("Hashed Password: ", hashedPassword);
  await Account.findOneAndUpdate(
      {email: req.params.email} ,
      {password : hashedPassword}
  );
  res.status(200).json({ message: "Reset password successfully" });
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

module.exports = { register,loginAccount, getAccount,currentAccount,resetPassword,deleteAccount};

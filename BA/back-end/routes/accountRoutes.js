const express = require("express");
const {
  register,
  currentAccount,
  loginAccount,
  resetPassword,
} = require("../controllers/accountController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", register);

router.post("/login", loginAccount);

router.get("/current", validateToken, currentAccount);

router.put("/reset/:email",validateToken,resetPassword);




module.exports = router;
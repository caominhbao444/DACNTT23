const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Pleas add the username"],
    },
    email: {
      type: String,
      required: [true, "Please add the email"],
      unique: [true, "Email addess already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    phone: {
      type: String,
      required: [true, "Please add the phone number"],
    },
    city: {
      type: String,
      required: [true, "Please add the city"],
    },
    from: {
      type: String,
      required: [true, "Please add from"],
    },
    education: {
      type: String,
      required: [true, "Please add education"],
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Account = mongoose.model("Account", accountSchema);

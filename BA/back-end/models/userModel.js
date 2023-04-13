const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Account",
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please add the email"],
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

module.exports = User = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"Account",
    },
    fullname: {
      type: String,
      required: [true, "Please add the full name "],
    },
    email: {
      type: String,
      required: [true, "Please add the email"],
    },
    phone: {
      type: String,
      required: [true, "Please add the phone number"],
    },
    city:{
      type: String,
      required :[true, "Please add the city"],
    },
    from:{
      type: String,
      required:[true, "Please add from"]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    accountId: {
      type:String,
      required:[true]
    },
    desc: {
      type: String,
      required:[true]
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);

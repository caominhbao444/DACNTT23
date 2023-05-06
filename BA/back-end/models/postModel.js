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
    img:{
      type:String,
      required:[true]
    },
    createdAt:{
      type:String,
    },
    updatedAt:{
      type:String,
    }
  }

);

module.exports = mongoose.model("Post", postSchema);

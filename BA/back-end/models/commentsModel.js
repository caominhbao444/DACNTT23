const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema(
  {
    postId: {
      type: String,
      required: [true],
    },
    senderId: {
      type: String,
      required: [true],
    },
    content: {
      type: String,
      required: [true],
    },
    createdAt:{
      type:String,
    },
    updatedAt:{
      type:String,
    }
  },
);

module.exports = mongoose.model("Comments", commentsSchema);

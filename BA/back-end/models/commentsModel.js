const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  postId: {
    type:String,
    required:[true]
  },
  senderId:{
    type: String,
    required:[true],
  },
  content: {
    type: String,
    required: [true],
  },
});

module.exports = mongoose.model("Comments", commentsSchema);

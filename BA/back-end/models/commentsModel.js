const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  postId: {
    type:String,
    required:[true]
  },
  senderId:{
    type: mongoose.Schema.Types.ObjectId,
    required:[true],
    ref:"Account"
  },
  content: {
    type: String,
    required: [true],
  },
});

module.exports = mongoose.model("Comments", commentsSchema);

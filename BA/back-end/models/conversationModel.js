const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    senderId:{
      type: String,
      required:[true]
    },
    receiverId:{
      type : String,
      required:[true]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);

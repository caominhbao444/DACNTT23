const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required:[true],
      ref:"Account"
    },
    fullname :{
      type : String,
      required:[true]
    },
    text: {
      type: String,
      required:[true]
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);

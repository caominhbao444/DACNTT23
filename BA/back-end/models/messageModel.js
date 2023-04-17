const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      required:[true],
      ref:"Account"
    },
    text: {
      type: String,
      required:[true]
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);

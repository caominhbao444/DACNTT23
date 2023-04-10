const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Account",
    },
    title: {
      type: String,
      required: [true, "Please add the titile"],
    },
    price: {
      type: Number,
      required: [true, "PLease add the price"],
    },
    description: {
      type: String,
      required: [true, "Please add the dscription"],
    },
    category: {
      type: String,
      required: [true, "PLease add the category"],
    },
    createBy:{
      type: String
    }
  },
  {
    
    timestamps: true,
  }
);

module.exports = Product =  mongoose.model("Product", productSchema);

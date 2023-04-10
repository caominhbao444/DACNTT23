const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Account",
    },
    orderItems: [
      {
        title: {
          type: String,
          required: [true, "add title"],
        },
        qty: {
          type: Number,
          required: [true, "add qty"],
        },
        productId: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      }],
    shipping: [
      {
        address: {
          type: String,
          required: [true, "add address"],
        },
      }],
    payment: [
      {
        paymentMethod: {
          type: String,
          required: true,
        },
      }],
    itemsPrice: {
      type: Number,
    },
    shippingPrice: {
      type: Number,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);

import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
          required: true
        }
      }
    ],
    shippingAddress: {
      address: { type: String, required: true, unique: true },
      city: { type: String, required: true, unique: true },
      postalCode: { type: String, required: true, unique: true },
      country: { type: String, required: true, unique: true }
    },
    paymentMethod: { type: String, required: true, unique: true },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_Address: { type: String }
    },
    taxPrice: { type: String, required: true, default: 0.0 },
    shippingPrice: { type: String, required: true, default: 0.0 },
    totalPrice: { type: String, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date }
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;

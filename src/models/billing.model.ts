import { model, Schema } from "mongoose";
import BillingType from "../types/billing";

const billingSchema = new Schema<BillingType>(
  {
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    tax: Number,
    subPrice: Number,
    total: Number,
    metadata: {
      payment_order_id: String,
      razorpay_payment_id: String,
      razorpay_order_id: String,
      razorpay_signature: String,
    },
    couponDiscount: {
      coupon: String,
      benefitAmount: Number,
      activeAt: Date,
      couponId: {
        type: Schema.Types.ObjectId,
        ref: "Coupon",
      },
    },
    extraCharge: {
      amount: Number,
      comment: String,
      tax: Number,
    },
  },
  { timestamps: true }
);

export const BillingModel = model<BillingType>("Billing", billingSchema);

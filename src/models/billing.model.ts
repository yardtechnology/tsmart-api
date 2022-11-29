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
      charged_id: String,
      balance_transaction: String,
      paymentId: String,
      clientSecret: String,
    },
    extraChargesMetadata: {
      charged_id: String,
      balance_transaction: String,
      paymentId: String,
      clientSecret: String,
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
    status: {
      type: String,
      default: "PENDING",
    },
    type: {
      type: String,
      default: "REGULAR",
    },
  },
  { timestamps: true }
);

export const BillingModel = model<BillingType>("Billing", billingSchema);

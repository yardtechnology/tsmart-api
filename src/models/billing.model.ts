import { model, Schema } from "mongoose";
import BillingType from "../types/billing";
import { OrderModel } from "./order.model";

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
  },
  { timestamps: true }
);
// if not paid in a day the delete the billing
billingSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60, partialFilterExpression: { status: "PENDING" } }
);

export const BillingModel = model<BillingType>("Billing", billingSchema);
BillingModel.watch().on("change", async (data: any) => {
  try {
    if (data.operationType === "delete") {
      console.log(data?.documentKey?._id);
      await OrderModel.deleteMany({ billing: data?.documentKey?._id });
    }
  } catch (error) {
    console.log(error);
  }
});

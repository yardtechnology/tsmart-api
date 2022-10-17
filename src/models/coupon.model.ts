import { Model, model, Schema } from "mongoose";
import { COUPON_TYPE } from "../types";

const couponSchema = new Schema<COUPON_TYPE, Model<COUPON_TYPE>>(
  {
    code: {
      type: String,
      unique: true,
      required: [true, "Code is required."],
    },
    discountPercent: {
      type: Number,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);
const CouponSchema = model<COUPON_TYPE, Model<COUPON_TYPE>>(
  "Coupon",
  couponSchema
);
export default CouponSchema;

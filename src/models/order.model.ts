import { model, Schema } from "mongoose";
import OrderType from "../types/order";

const orderSchema = new Schema<OrderType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    store: {
      type: {},
    },
    product: {
      type: {},
    },
    quantity: Number,
    billing: {
      type: Schema.Types.ObjectId,
      ref: "Billing",
    },
    address: {
      type: {},
    },
    ETA: {
      type: Date,
    },
    status: String,
    trackingNumber: String,
    totalPrice: Number,
    totalMrp: Number,
    startImage: String,
    startImagePATH: String,
    technician: {
      type: {},
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    technicianID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    storeID: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
    endOTP: {
      verifiedAt: Date,
      isVerified: Boolean,
      otp: Number,
    },
    endImage: String,
    endImagePATH: String,
    service: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "ServicePrice",
        },
      ],
    },
    scheduledTime: Date,
    technicianImage: String,
    technicianImagePATH: String,
    startOTP: {
      verifiedAt: Date,
      isVerified: Boolean,
      otp: Number,
    },
    type: String,
  },
  { timestamps: true }
);

export const OrderModel = model<OrderType>("Order", orderSchema);

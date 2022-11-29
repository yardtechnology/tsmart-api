import { model, Schema } from "mongoose";
import OrderType from "../types/order";

const orderSchema = new Schema<OrderType>(
  {
    user: {},
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
    faceVideo: String,
    faceVideoPath: String,
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
    service: [],
    scheduledTime: Date,
    technicianImage: String,
    technicianImagePATH: String,
    startOTP: {
      verifiedAt: Date,
      isVerified: Boolean,
      otp: Number,
    },
    type: String,
    price: Number,
    mrp: Number,
    serviceType: String,
    evaluatedPrice: Number,
    evaluatedValues: [],
    paymentMethod: String,
    make: {},
    model: {},
    device: {},
    makeId: { type: Schema.Types.ObjectId, ref: "Make" },
    modelId: { type: Schema.Types.ObjectId, ref: "Model" },
    deviceId: { type: Schema.Types.ObjectId, ref: "Device" },
    bankDetails: {
      fullName: String,
      accountNumber: Number,
      sortCode: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    color: {},
    memory: {},
    colorId: {
      type: Schema.Types.ObjectId,
      ref: "Color",
    },
    memoryId: { type: Schema.Types.ObjectId, ref: "Memory" },
    extraServices: [],
    accessory: [],
    imei: String,
    nearByTechnicians: [],
  },
  { timestamps: true }
);

export const OrderModel = model<OrderType>("Order", orderSchema);

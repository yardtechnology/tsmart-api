import { model, Schema } from "mongoose";
import AddressType from "../types/address";

const addressSchema = new Schema<AddressType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    landmark: {
      type: String,
    },
    email: String,
    phoneNumber: {
      type: Number,
      required: true,
    },
    countryCode: String,
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
    isDefault: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["HOME", "WORK", "OTHER"],
      default: "OTHER",
    },
    houseNumber: String,
    latitude: Number,
    longitude: Number,
  },
  { timestamps: true }
);

export const AddressModel = model<AddressType>("Address", addressSchema);

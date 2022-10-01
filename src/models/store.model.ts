import { model, Schema } from "mongoose";
import StoreType from "../types/store";

const storeSchema = new Schema<StoreType>(
  {
    displayName: String,
    email: String,
    phoneNumber: Number,
    countryCode: Number,
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    imageURL: String,
    imagePath: String,
    about: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      default: "STORE",
    },
  },
  { timestamps: true }
);

export const StoreModel = model<StoreType>("Store", storeSchema);

import { model, Schema } from "mongoose";
import StoreType from "../types/store";

const storeSchema = new Schema<StoreType>(
  {
    displayName: String,
    email: String,
    phoneNumber: Number,
    countryCode: Number,
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
    address: {
      state: String,
      city: String,
      street: String,
      country: String,
      zip: Number,
      latitude: Number,
      longitude: Number,
    },
    reviews: {
      total: {
        type: Number,
        default: 0,
      },
      stars: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

export const StoreModel = model<StoreType>("Store", storeSchema);

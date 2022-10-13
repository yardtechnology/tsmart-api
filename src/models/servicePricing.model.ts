import { model, Schema } from "mongoose";
import ServicePriceType from "../types/servicePrice";

const modelSchema = new Schema<ServicePriceType>(
  {
    title: String,
    description: String,
    image: String,
    imagePATH: String,
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
    isInStock: Boolean,
    mrp: Number,
    salePrice: Number,
    device: {
      type: Schema.Types.ObjectId,
      ref: "Device",
    },
    model: {
      type: Schema.Types.ObjectId,
      ref: "Model",
    },
  },
  { timestamps: true }
);

export const ModelModel = model<ServicePriceType>("ServicePrice", modelSchema);

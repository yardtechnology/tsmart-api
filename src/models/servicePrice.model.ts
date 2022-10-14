import { model, Schema } from "mongoose";
import ServicePriceType from "../types/servicePrice";

const servicePriceSchema = new Schema<ServicePriceType>(
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
    model: {
      type: Schema.Types.ObjectId,
      ref: "Model",
    },
  },
  { timestamps: true }
);

export const ServicePriceModel = model<ServicePriceType>(
  "ServicePrice",
  servicePriceSchema
);

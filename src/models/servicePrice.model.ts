import { model, Model, Schema } from "mongoose";
import ServicePriceType from "../types/servicePrice";

const servicePriceSchema = new Schema<
  ServicePriceType,
  Model<ServicePriceType>
>(
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
    isInStock: {
      type: Boolean,
      default: true,
    },
    mrp: Number,
    salePrice: Number,
    model: {
      type: Schema.Types.ObjectId,
      ref: "Model",
    },
    type: String,
    isMostPopular: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const ServicePriceModel = model<
  ServicePriceType,
  Model<ServicePriceType>
>("ServicePrice", servicePriceSchema);

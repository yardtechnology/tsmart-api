import { model, Schema } from "mongoose";
import ServiceType from "../types/service";

const serviceSchema = new Schema<ServiceType>(
  {
    title: String,
    description: String,
    image: String,
    imagePATH: String,
  },
  { timestamps: true }
);

export const ServiceModel = model<ServiceType>("Service", serviceSchema);

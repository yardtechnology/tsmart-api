import { model, Model, Schema } from "mongoose";
import SERVICE_PROPERTY_TYPE from "../types/serviceProperty";

const servicePropertySchema = new Schema<
  SERVICE_PROPERTY_TYPE,
  Model<SERVICE_PROPERTY_TYPE>
>(
  {
    title: String,
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
    type: {
      default: "string",
      type: String,
      enum: {
        message: "type must be string or boolean.",
        values: ["string", "boolean"],
      },
    },
  },
  { timestamps: true }
);

export const ServicePropertySchema = model<
  SERVICE_PROPERTY_TYPE,
  Model<SERVICE_PROPERTY_TYPE>
>("ServiceProperty", servicePropertySchema);

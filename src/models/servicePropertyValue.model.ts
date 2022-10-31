import { model, Model, Schema } from "mongoose";
import { SERVICE_PROPERTY_VALUE_TYPE } from "../types";

const servicePropertyValueSchema = new Schema<
  SERVICE_PROPERTY_VALUE_TYPE,
  Model<SERVICE_PROPERTY_VALUE_TYPE>
>(
  {
    value: String,
    servicePrice: {
      type: Schema.Types.ObjectId,
      ref: "ServicePrice",
    },
    serviceProperty: {
      type: Schema.Types.ObjectId,
      ref: "ServiceProperty",
    },
  },
  { timestamps: true }
);

export const ServicePropertyValueSchema = model<
  SERVICE_PROPERTY_VALUE_TYPE,
  Model<SERVICE_PROPERTY_VALUE_TYPE>
>("ServicePropertyValue", servicePropertyValueSchema);

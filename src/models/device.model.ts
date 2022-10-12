import { Model, model, Schema } from "mongoose";
import { DEVICE_TYPE } from "../types";

const deviceSchema = new Schema<DEVICE_TYPE, Model<DEVICE_TYPE>>(
  {
    image: {
      type: String,
    },
    imagePATH: {
      type: String,
    },
    title: {
      type: String,
      unique: true,
      index: true,
      require: [true, "Device title is required."],
    },
  },
  { timestamps: true }
);
const DevicesSchema = model<DEVICE_TYPE, Model<DEVICE_TYPE>>(
  "Device",
  deviceSchema
);
export default DevicesSchema;

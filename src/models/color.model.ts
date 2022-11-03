import { Model, model, Schema } from "mongoose";
import { COLOR_TYPE } from "../types";

const deviceSchema = new Schema<COLOR_TYPE, Model<COLOR_TYPE>>(
  {
    color: String,
  },
  { timestamps: true }
);
const DevicesSchema = model<COLOR_TYPE, Model<COLOR_TYPE>>(
  "Color",
  deviceSchema
);
export default DevicesSchema;

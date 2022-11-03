import { Model, model, Schema } from "mongoose";
import { COLOR_TYPE } from "../types";

const colorSchema = new Schema<COLOR_TYPE, Model<COLOR_TYPE>>(
  {
    color: String,
    hashCode: String,
  },
  { timestamps: true }
);
const ColorSchema = model<COLOR_TYPE, Model<COLOR_TYPE>>("Color", colorSchema);
export default ColorSchema;

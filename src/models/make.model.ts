import { Schema, Model, model } from "mongoose";
import { MAKE_TYPE } from "../types";

const makeSchema = new Schema<MAKE_TYPE, Model<MAKE_TYPE>>(
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
    devices: [
      {
        type: Schema.Types.ObjectId,
        ref: "Device",
      },
    ],
  },
  { timestamps: true }
);
const MakeSchema = model<MAKE_TYPE, Model<MAKE_TYPE>>("Make", makeSchema);
export default MakeSchema;

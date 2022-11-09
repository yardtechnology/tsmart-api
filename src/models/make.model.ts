import { Model, model, Schema } from "mongoose";
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
      require: [true, "Make title is required."],
    },
    devices: [
      {
        type: Schema.Types.ObjectId,
        ref: "Device",
      },
    ],
    type: [
      {
        type: String,
        enum: {
          values: ["SERVICE", "SELL"],
          message: "type must be SERVICE or SELL",
        },
      },
    ],
  },
  { timestamps: true }
);
const MakeSchema = model<MAKE_TYPE, Model<MAKE_TYPE>>("Make", makeSchema);
// MakeSchema.watch().on("change", (change) => {
//   console.log(change);
// });
export default MakeSchema;

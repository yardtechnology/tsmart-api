import { model, Schema } from "mongoose";
import ModelType from "../types/model";

const modelSchema = new Schema<ModelType>(
  {
    title: String,
    description: String,
    image: String,
    imagePATH: String,
    device: {
      type: Schema.Types.ObjectId,
      ref: "Device",
    },
    make: {
      type: Schema.Types.ObjectId,
      ref: "Make",
    },
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

export const ModelModel = model<ModelType>("Model", modelSchema);

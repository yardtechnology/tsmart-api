import { model, Schema } from "mongoose";
import ModelType from "../types/model";

const modelSchema = new Schema<ModelType>(
  {
    title: {
      unique: true,
      type: String,
      required: true,
    },
    description: String,
    image: String,
    imagePATH: String,
    device: {
      required: [true, "Device id is required"],
      type: Schema.Types.ObjectId,
      ref: "Device",
    },
    make: {
      required: [true, "Model id is required"],
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

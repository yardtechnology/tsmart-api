import { model, Schema } from "mongoose";
import ModelType from "../types/model";

const modelSchema = new Schema<ModelType>(
  {
    title: String,
    description: String,
    image: String,
    imagePATH: String,
  },
  { timestamps: true }
);

export const StoreModel = model<ModelType>("Model", modelSchema);

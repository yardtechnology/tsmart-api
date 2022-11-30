import { model, Schema } from "mongoose";
import AboutUsType from "../types/aboutUs";

const aboutUsSchema = new Schema<AboutUsType>(
  {
    title: String,
    description: String,
    image: String,
    imagePath: String,
  },
  { timestamps: true }
);

export const AboutUsModel = model<AboutUsType>("AboutUs", aboutUsSchema);

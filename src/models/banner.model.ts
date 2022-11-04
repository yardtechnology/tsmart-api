import { model, Schema } from "mongoose";
import BannerType from "../types/banner";

const bannerSchema = new Schema<BannerType>(
  {
    title: String,
    description: String,
    imageURL: String,
    link: String,
    imagePath: String,
    data: {
      screen: String,
      id: String,
    },
    type: String,
    themeColor: String,
    textColor: String,
  },
  { timestamps: true }
);

export const BannerModel = model<BannerType>("Banner", bannerSchema);

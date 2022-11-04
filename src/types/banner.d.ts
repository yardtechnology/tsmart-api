import { Document } from "mongoose";

export default interface BannerType extends Document {
  title: string;
  description: string;
  imageURL: string;
  link: string;
  imagePath: string;
  data: {
    screen: string;
    id: string;
  };
  type: string;
  themeColor: string;
  textColor: string;
}

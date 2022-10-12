import { Document } from "mongoose";

export default interface ModelType extends Document {
  title: string;
  description: string;
  image: string;
  imagePATH: string;
  //   device:
}

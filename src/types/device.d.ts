import { Document } from "mongoose";

export default interface DEVICE_TYPE extends Document {
  image: string;
  imagePATH: string;
  title: string;
}

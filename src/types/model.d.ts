import { Document } from "mongoose";
import DEVICE_TYPE from "./device";

export default interface ModelType extends Document {
  title: string;
  description: string;
  image: string;
  imagePATH: string;
  device: DEVICE_TYPE;
  make: ModelType;
}

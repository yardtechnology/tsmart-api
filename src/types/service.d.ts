import { Document } from "mongoose";

export default interface ServiceType extends Document {
  title: string;
  description: string;
  image: string;
  imagePATH: string;
}

import { Document } from "mongoose";

export default interface EVALUATION_TYPE extends Document {
  image: string;
  imagePATH: string;
  title: string;
  description: string;
}

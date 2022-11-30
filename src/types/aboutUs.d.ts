import { Document } from "mongoose";

export default interface AboutUsType extends Document {
  title: string;
  description: string;
  image: string;
  imagePath: string;
}

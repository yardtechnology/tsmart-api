import { Document, ObjectId } from "mongoose";

export default interface MAKE_TYPE extends Document {
  title: string;
  imagePATH: string;
  image: string;
  devices?: ObjectId[];
}

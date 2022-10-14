import { Document, ObjectId } from "mongoose";

export default interface REVIEW_TYPE extends Document {
  comment: string;
  ratings: number;
  product?: ObjectId;
  user: ObjectId;
  store?: ObjectId;
  technician?: ObjectId;
}

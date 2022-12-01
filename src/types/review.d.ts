import { Document, ObjectId } from "mongoose";
import ORDER_TYPE from "./order";
export default interface REVIEW_TYPE extends Document {
  comment: string;
  ratings: number;
  order: ORDER_TYPE;
  product?: ObjectId;
  user: ObjectId;
  store?: ObjectId;
  technician?: ObjectId;
}

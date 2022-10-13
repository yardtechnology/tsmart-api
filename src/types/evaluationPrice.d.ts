import { Document, ObjectId } from "mongoose";

export default interface EVALUATION_PRICE_TYPE extends Document {
  price: number;
  evaluation: ObjectId;
  model: ObjectId;
}

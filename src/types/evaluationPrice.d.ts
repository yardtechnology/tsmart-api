import { Document, ObjectId } from "mongoose";
import EVALUATION_TYPE from "./evaluation";

export default interface EVALUATION_PRICE_TYPE extends Document {
  price: number;
  evaluation: EVALUATION_TYPE;
  model: ObjectId;
}

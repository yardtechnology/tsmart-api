import { Document } from "mongoose";
import COLOR_TYPE from "./color";
import MEMORY_TYPE from "./memory";
import MODEL_TYPE from "./model";
export default interface SALE_PRICE_TYPE extends Document {
  price: number;
  model: MODEL_TYPE;
  memory?: MEMORY_TYPE;
  color: COLOR_TYPE;
}

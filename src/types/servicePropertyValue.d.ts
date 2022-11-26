import { Document } from "mongoose";
import { MODEL_TYPE } from ".";
import SERVICE_PRICE_TYPE from "./servicePrice";
import SERVICE_PROPERTY_TYPE from "./serviceProperty";

export default interface SERVICE_PROPERTY_VALUE_TYPE extends Document {
  value: string;
  serviceProperty: SERVICE_PROPERTY_TYPE;
  servicePrice: SERVICE_PRICE_TYPE;
  model: MODEL_TYPE;
}

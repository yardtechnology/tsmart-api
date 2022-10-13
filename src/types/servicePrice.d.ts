import { Document } from "mongoose";
import DEVICE_TYPE from "./device";
import ModelType from "./model";
import ServiceType from "./service";
import StoreType from "./store";

export default interface ServicePriceType extends Document {
  title: string;
  description: string;
  image: string;
  imagePATH: string;
  device: DEVICE_TYPE;
  model: ModelType;
  service: ServiceType;
  store: StoreType;
  isInStock: boolean;
  mrp: number;
  salePrice: number;
}

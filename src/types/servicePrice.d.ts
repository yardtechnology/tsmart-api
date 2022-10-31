import { Document } from "mongoose";
import ModelType from "./model";
import ServiceType from "./service";
import StoreType from "./store";

export default interface ServicePriceType extends Document {
  title: string;
  description: string;
  image: string;
  imagePATH: string;
  model: ModelType;
  service: ServiceType;
  store: StoreType;
  isInStock: boolean;
  mrp: number;
  salePrice: number;
  type?: string;
  isMostPopular: boolean;
}

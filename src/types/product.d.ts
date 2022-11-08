import { Document } from "mongoose";
import CategoryType from "./category";
import { ImageType } from "./core";
import DEVICE_TYPE from "./device";
import MAKE_TYPE from "./make";
import ModelType from "./model";
import StoreType from "./store";

export interface ProductType<T = ImageType> {
  title: string;
  shortDescription: string;
  description: string;
  isFeatured: boolean;
  isActive: boolean;
  category: CategoryType;
  stock: number;
  salePrice: number;
  mrp: number;
  displayImage: T;
  images: T[];
  store: StoreType;
  variantOf: ProductType;
  memory: string;
  color: string;
  condition: "GOOD" | "BETTER" | "BEST";
  reviews: {
    total: number;
    stars: number;
  };
  device: DEVICE_TYPE;
  make: MAKE_TYPE;
  model: ModelType;
  type: "REFURBISHED" | "ACCESSORY";
}

export default interface index extends ProductType, Document {}

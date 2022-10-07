import { Document } from "mongoose";
import CategoryType from "./category";
import { ImageType } from "./core";
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
  reviews: {
    total: number;
    stars: number;
  };
}

export default interface index extends ProductType, Document {}

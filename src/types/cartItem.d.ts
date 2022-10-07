import { Document } from "mongoose";
import ProductType from "./product";
import UserType from "./user";

export default interface CartItemType extends Document {
  product: ProductType;
  quantity: number;
  user: UserType;
  total?: number;
}

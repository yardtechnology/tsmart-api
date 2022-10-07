import { Document } from "mongoose";
import { ProductType } from "./product";
import UserType from "./user";

export default interface WishlistType extends Document {
  user: UserType;
  product: ProductType;
}

import { model, Schema } from "mongoose";
import WishListType from "../types/wishlist";

const wishListSchema = new Schema<WishListType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

export const WishListModel = model<WishListType>("Wishlist", wishListSchema);

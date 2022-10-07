import { model, Schema } from "mongoose";
import CartItemType from "../types/cartItem";

const cartSchema = new Schema<CartItemType>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const CartItemModel = model<CartItemType>("CartItem", cartSchema);

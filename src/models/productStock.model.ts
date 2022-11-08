import { model, Schema } from "mongoose";
import ProductType from "../types/productStock";

const productSchema = new Schema<ProductType>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    stock: Number,
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
  },
  { timestamps: true }
);

export const AccessoryModel = model<ProductType>("ProductStock", productSchema);

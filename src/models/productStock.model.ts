import { model, Schema } from "mongoose";
import ProductStockType from "../types/productStock";

const productStockSchema = new Schema<ProductStockType>(
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

export const ProductStockModel = model<ProductStockType>(
  "ProductStock",
  productStockSchema
);

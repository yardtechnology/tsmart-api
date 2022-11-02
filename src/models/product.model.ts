import { model, Schema } from "mongoose";
import ProductType from "../types/product";

const productSchema = new Schema<ProductType>(
  {
    title: String,
    shortDescription: String,
    description: String,
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    stock: {
      type: Number,
      min: 0,
    },
    salePrice: Number,
    mrp: Number,
    displayImage: {
      url: String,
      path: String,
    },
    images: [
      {
        url: String,
        path: String,
      },
    ],
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
    variantOf: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    memory: String,
    color: String,
    condition: String,
    reviews: {
      total: {
        type: Number,
        default: 0,
      },
      stars: {
        type: Number,
        default: 0,
      },
    },
    device: {
      type: Schema.Types.ObjectId,
      ref: "Device",
    },
    make: {
      type: Schema.Types.ObjectId,
      ref: "Make",
    },
    model: {
      type: Schema.Types.ObjectId,
      ref: "Model",
    },
  },
  { timestamps: true }
);

export const ProductModel = model<ProductType>("Product", productSchema);

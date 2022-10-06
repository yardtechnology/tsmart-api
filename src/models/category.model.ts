import { model, Schema } from "mongoose";
import CategoryType from "../types/category";

const categorySchema = new Schema<CategoryType>(
  {
    name: String,
    image: String,
    imagePath: String,
    description: String,
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    isFeatured: Boolean,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const CategoryModel = model<CategoryType>("Category", categorySchema);

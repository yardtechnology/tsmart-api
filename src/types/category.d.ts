import { Document } from "mongoose";

export default interface CategoryType extends Document {
  name: string;
  image: string;
  imagePath: string;
  description: string;
  parentCategory: CategoryType;
  isActive: boolean;
  isFeatured: boolean;
}

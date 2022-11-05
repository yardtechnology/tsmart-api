import { model, Schema } from "mongoose";
import BlogType from "../types/blog";

const blogSchema = new Schema<BlogType>(
  {
    title: String,
    description: String,
    author: String,
    poster: String,
    posterPATH: String,
    tags: [String],
    article: String,
  },
  { timestamps: true }
);

export const BlogModel = model<BlogType>("Blog", blogSchema);

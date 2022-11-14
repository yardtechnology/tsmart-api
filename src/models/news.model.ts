import { model, Schema } from "mongoose";
import NewsType from "../types/news";

const newsSchema = new Schema<NewsType>(
  {
    title: String,
    description: String,
    author: String,
    poster: String,
    posterPATH: String,
    tags: [String],
    article: String,
    link: String,
  },
  { timestamps: true }
);

export const NewsModel = model<NewsType>("News", newsSchema);

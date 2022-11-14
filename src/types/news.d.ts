import { Document } from "mongoose";

export default interface NewsType extends Document {
  title: string;
  description: string;
  author: string;
  poster: string;
  posterPATH: string;
  tags: string[];
  article: string;
  link: string;
}

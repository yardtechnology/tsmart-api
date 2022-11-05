import { Document } from "mongoose";

export default interface BlogType extends Document {
  title: string;
  description: string;
  author: string;
  poster: string;
  posterPATH: string;
  tags: string[];
  article: string;
}

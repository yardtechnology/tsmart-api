import { Document } from "mongoose";
import BlogType from "./blog";

export default interface CommentType extends Document {
  user: UserType;
  comment: string;
  blog: BlogType;
}

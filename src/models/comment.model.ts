import { Model, model, Schema } from "mongoose";
import CommentType from "../types/comment";

const commentSchema = new Schema<CommentType, Model<CommentType>>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comment: String,
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  { timestamps: true }
);
export const CommentSchema = model<CommentType, Model<CommentType>>(
  "Comment",
  commentSchema
);

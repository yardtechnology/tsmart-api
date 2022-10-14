import { Model, model, Schema } from "mongoose";
import { REVIEW_TYPE } from "../types";

const reviewSchema = new Schema<REVIEW_TYPE, Model<REVIEW_TYPE>>(
  {
    comment: {
      type: String,
      required: [true, "Comments is required."],
    },
    ratings: {
      type: Number,
      enum: {
        values: [1, 2, 3, 4, 5],
        message: "Rating must be more be require",
      },
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: undefined,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      default: undefined,
    },
    technician: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: undefined,
    },
    user: {
      required: [true, "User is is require."],
      type: Schema.Types.ObjectId,
      ref: "User",
      default: undefined,
    },
  },
  { timestamps: true }
);
const ReviewSchema = model<REVIEW_TYPE, Model<REVIEW_TYPE>>(
  "Review",
  reviewSchema
);
export default ReviewSchema;

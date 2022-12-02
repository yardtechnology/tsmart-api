import { Model, model, Schema } from "mongoose";
import { POPULAR_PAGE_TYPE } from "../types";

const popularPageSchema = new Schema<
  POPULAR_PAGE_TYPE,
  Model<POPULAR_PAGE_TYPE>
>(
  {
    url: String,
    title: String,
    count: Number,
  },
  { timestamps: true }
);
const PopularPageSchema = model<POPULAR_PAGE_TYPE, Model<POPULAR_PAGE_TYPE>>(
  "PopularPage",
  popularPageSchema
);
export default PopularPageSchema;

import { Document } from "mongoose";

export default interface POPULAR_PAGE_TYPE extends Document {
  url: string;
  title: string;
  count: number;
}

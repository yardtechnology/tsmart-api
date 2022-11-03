import { Document } from "mongoose";

export default interface COLOR_TYPE extends Document {
  color: string;
  hashCode: String;
}

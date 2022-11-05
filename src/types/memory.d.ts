import { Document } from "mongoose";

export default interface MEMORY_TYPE extends Document {
  ram: string;
  internal: string;
}

import { Model, model, Schema } from "mongoose";
import { MEMORY_TYPE } from "../types";

const memorySchema = new Schema<MEMORY_TYPE, Model<MEMORY_TYPE>>(
  {
    internal: String,
    ram: String,
  },
  { timestamps: true }
);
const MemorySchema = model<MEMORY_TYPE, Model<MEMORY_TYPE>>(
  "Memory",
  memorySchema
);
export default MemorySchema;

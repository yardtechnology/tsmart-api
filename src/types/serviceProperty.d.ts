import { Document, ObjectId } from "mongoose";

export default interface SERVICE_PROPERTY_TYPE extends Document {
  type: "string" | "boolean";
  title: string;
  service: ObjectId;
}

import { Document, ObjectId } from "mongoose";

export default interface VISITOR_TYPE extends Document {
  windowsCount: number;
  macCount: number;
  androidCount: number;
  iosCount: number;
  otherCount: number;
}

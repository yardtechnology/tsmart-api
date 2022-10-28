import { Document } from "mongoose";
import USER_TYPE from "./user";

export default interface OnlineRecordType extends Document {
  user: USER_TYPE;
  startTime: Date;
  endTime: Date;
  totalSeconds: number;
}

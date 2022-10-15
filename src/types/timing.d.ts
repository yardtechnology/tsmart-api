import { Document, ObjectId } from "mongoose";

export default interface TIMING_TYPE extends Document {
  store: ObjectId;
  numberOfRepairers: number;
  start: Date;
  end: Date;
  dayOfWeekNumber: Number;
}

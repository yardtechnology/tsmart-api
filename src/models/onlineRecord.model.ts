import { model, Schema } from "mongoose";
import OnlineRecordType from "../types/onlineRecord";

const onlineRecordSchema = new Schema<OnlineRecordType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    startTime: Date,
    endTime: Date,
    totalSeconds: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
export const OnlineRecordSchema = model<OnlineRecordType>(
  "OnlineRecord",
  onlineRecordSchema
);

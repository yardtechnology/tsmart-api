import { Model, model, Schema } from "mongoose";
import { TIMING_TYPE } from "../types";

const timingSchema = new Schema<TIMING_TYPE, Model<TIMING_TYPE>>(
  {
    numberOfRepairers: {
      type: Number,
      default: 0,
    },
    durationInMin: {
      type: Number,
      default: 30,
    },
    dayOfWeekNumber: {
      type: Number,
      default: 1,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },

    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      default: undefined,
    },
  },
  { timestamps: true }
);
const TimingSchema = model<TIMING_TYPE, Model<TIMING_TYPE>>(
  "Timing",
  timingSchema
);
export default TimingSchema;

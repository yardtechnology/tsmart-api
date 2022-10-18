import { model, Schema } from "mongoose";
import HolidayType from "../types/holiday";

const holidaySchema = new Schema<HolidayType>(
  {
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
    date: Date,
    title: String,
    description: String,
  },
  { timestamps: true }
);
export const HolidayModel = model<HolidayType>("Holiday", holidaySchema);

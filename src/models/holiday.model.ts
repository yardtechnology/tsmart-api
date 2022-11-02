import { model, Model, Schema } from "mongoose";
import HolidayType from "../types/holiday";

const holidaySchema = new Schema<HolidayType, Model<HolidayType>>(
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
export const HolidayModel = model<HolidayType, Model<HolidayType>>(
  "Holiday",
  holidaySchema
);

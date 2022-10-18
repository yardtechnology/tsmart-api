import { model, Schema } from "mongoose";
import HolidayType from "../types/holiday";

const faqSchema = new Schema<HolidayType>(
  {
    date: String,
    title: String,
    description: String,
  },
  { timestamps: true }
);
export const FAQModel = model<HolidayType>("Holiday", faqSchema);

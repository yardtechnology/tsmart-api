import { Document } from "mongoose";

export default interface HolidayType extends Document {
  date: string;
  title: string;
  description: string;
}

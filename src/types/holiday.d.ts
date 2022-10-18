import { Document } from "mongoose";
import StoreType from "./store";

export default interface HolidayType extends Document {
  store: StoreType;
  date: Date;
  title: string;
  description: string;
}

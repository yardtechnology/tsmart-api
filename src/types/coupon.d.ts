import { Document } from "mongoose";

export default interface COUPON_TYPE extends Document {
  code: string;
  discountPercent: number;
  startDate: Date;
  endDate: Date;
  maxCashBack: number;
  users?: objectId[];
}

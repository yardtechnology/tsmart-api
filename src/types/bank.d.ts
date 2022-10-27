import { Document } from "mongoose";
import UserType from "./user";

export default interface BankType extends Document {
  fullName: string;
  accountNumber: number;
  sortCode: string;
  user: UserType;
}

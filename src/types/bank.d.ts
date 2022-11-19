import { Document } from "mongoose";
import UserType from "./user";

export default interface BankType extends Document {
  bankName: string;
  fullName: string;

  accountNumber: number;
  SORDCode: string;
  //

  //
  user: UserType;
}

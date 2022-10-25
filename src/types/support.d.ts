import { Document } from "mongoose";

export default interface SUPPORT_TYPE extends Document {
  email: string;
  phoneNumber: string;
  countryCode: String;
  subject: String;
  message: String;
  isReplayed: boolean;
}

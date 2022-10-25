import { Document } from "mongoose";
import STORE_TYPE from "./store";
export default interface CONTACT_US_TYPE extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  subject: string;
  message: string;
  store: STORE_TYPE;
}

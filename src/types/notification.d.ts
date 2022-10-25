import { Document } from "mongoose";
import USER_TYPE from "./user";

export default interface NOTIFICATION_TYPE extends Document {
  user: USER_TYPE;
  icon?: string;
  iconPATH?: string;
  title: string;
  description: string;
  readStatus: boolean;
  redirectLink?: string;
}

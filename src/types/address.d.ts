import { Document } from "mongoose";
import UserType from "./user";

export default interface AddressType extends Document {
  user: UserType;
  name: string;
  houseNumber: string;
  landmark: string;
  email: string;
  phoneNumber: number;
  countryCode: number;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: number;
  isDefault: boolean;
  type?: "HOME" | "WORK" | "OTHER";
}

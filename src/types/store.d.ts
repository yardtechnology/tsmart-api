import { Document } from "mongoose";
import AddressType from "./address.type";
import UserType from "./user.type";

export default interface StoreType extends Document {
  displayName: string;
  email: string;
  phoneNumber: number;
  countryCode: number;
  address: AddressType;
  imageURL: string;
  imagePath: string;
  about: string;
  createdBy: UserType;
  type: "HUB" | "STORE";
  address: {
    state: string;
    city: string;
    street: string;
    country: string;
    zip: string;
    latitude: number;
    longitude: number;
  };
  reviews: {
    total: number;
    stars: number;
  };
  timing: string;
}

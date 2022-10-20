import { Document } from "mongoose";
import AddressType from "./address";
import BillingType from "./billing";
import ProductType from "./product";
import ServicePriceType from "./servicePrice";
import StoreType from "./store";
import UserType from "./user";

export default interface OrderType extends Document {
  user: UserType;
  store: StoreType;
  product: ProductType;
  quantity: number;
  billing: BillingType;
  address: AddressType;
  ETA: Date;
  status:
    | "INITIATED"
    | "COMPLETED"
    | "CANCELLED"
    | "CONFIRMED"
    | "PACKED"
    | "SHIPPED"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "RECEIVED"
    | "PAID"
    | "TECHNICIAN_ASSIGNED"
    | "TECHNICIAN_REACHED"
    | "REPAIRED"
    | "ADD_ON_SERVICE";
  trackingNumber: string;
  totalPrice: number;
  totalMrp: number;
  startImage: string;
  startImagePATH: string;
  technician: UserType;
  userID: UserType;
  technicianID: UserType;
  storeID: StoreType;
  endOTP: {
    verifiedAt: Date;
    isVerified: boolean;
    otp: number;
  };
  endImage: string;
  endImagePATH: string;
  service: ServicePriceType[];
  scheduledTime: Date;
  technicianImage: string;
  technicianImagePATH: string;
  startOTP: {
    verifiedAt: Date;
    isVerified: boolean;
    otp: number;
  };
  type: "BUY" | "SELL";
  price: number;
  mrp: number;
  serviceType: "IN_STOR" | "MAIL_IN" | "CALL_OUT";
  createdAt: Date;
  updatedAt: Date;
}

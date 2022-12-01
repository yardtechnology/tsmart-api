import { Document } from "mongoose";
import AddressType from "./address";
import BankType from "./bank";
import BillingType from "./billing";
import COLOR_TYPE from "./color";
import DEVICE_TYPE from "./device";
import EVALUATION_PRICE_TYPE from "./evaluationPrice";
import MAKE_TYPE from "./make";
import MEMORY_TYPE from "./memory";
import ModelType from "./model";
import { OrderStatus } from "./order.d";
import ProductType from "./product";
import ServicePriceType from "./servicePrice";
import StoreType from "./store";
import UserType from "./user";

export type OrderStatus =
  | "PENDING"
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

export default interface OrderType extends Document {
  user: UserType;
  store: StoreType;
  product: ProductType;
  quantity: number;
  billing: BillingType;
  extraBilling: BillingType;
  address: AddressType;
  ETA: Date;
  status: OrderStatus;
  trackingNumber: string;
  totalPrice: number;
  totalMrp: number;
  faceVideo: String;
  faceVideoPath: String;
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
  type: "REPAIR" | "SELL" | "ACCESSORY" | "REFURBISH";
  price: number;
  mrp: number;
  serviceType: "IN_STOR" | "MAIL_IN" | "CALL_OUT";
  createdAt: Date;
  updatedAt: Date;
  evaluatedPrice: number;
  evaluatedValues: EVALUATION_PRICE_TYPE[];
  paymentMethod: "ONLINE" | "CHEQUE";
  make: MAKE_TYPE;
  model: ModelType;
  device: DEVICE_TYPE;
  makeId: MAKE_TYPE;
  modelId: ModelType;
  deviceId: DEVICE_TYPE;
  bankDetails: BankType;
  color: COLOR_TYPE;
  memory: MEMORY_TYPE;
  colorId: COLOR_TYPE;
  memoryId: MEMORY_TYPE;
  extraServices?: ServicePriceType[];
  accessory?: ProductType[];
  imei: string;
  nearByTechnicians: string[];
}

import { Document } from "mongoose";

export default interface CONFIG_TYPE extends Document {
  tax: number;
  storeAndroid: {
    message: string;
    version: string;
    title: string;
    isDismissible: boolean;
  };
  storeIos: {
    message: string;
    version: string;
    title: string;
    isDismissible: boolean;
  };
  customerIos: {
    message: string;
    version: string;
    title: string;
    isDismissible: boolean;
  };
  customerAndroid: {
    message: string;
    version: string;
    title: string;
    isDismissible: boolean;
  };
  technicianAndroid: {
    message: string;
    version: string;
    title: string;
    isDismissible: boolean;
  };
  technicianIos: {
    message: string;
    version: string;
    title: string;
    isDismissible: boolean;
  };
  mailInInstauration: string;
  aboutUs: string;
  privacyPolicy: string;
  termsAndConditions: string;
  shoppingPolicy: string;
  mailInstructions: string;
  ourWarranty: string;
  storeRange: number;
  orderCancelTime: number; // in minutes
  newsLatterEmails: string[];
  technicianSearchRange: number;
}

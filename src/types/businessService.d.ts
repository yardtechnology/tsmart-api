import { Document } from "mongoose";

export default interface BUSINESS_SERVICE_TYPE extends Document {
  name: string;
  phoneNumber: string;
  countryCode: string;
  email: string;
  companyName: string;
  companyRegNumber: string;
  message: string;
}

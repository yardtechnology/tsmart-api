import { Document } from "mongoose";

export default interface WARRANTY_TYPE extends Document {
  email: string;
  phoneNumber: string;
  name: string;
  makeModel: string;
  storeVisited: String;
  claimInformation: String;
}

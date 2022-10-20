import { Document } from "mongoose";

export default interface JOIN_OUR_TEAM_TYPE extends Document {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  postalPin: string;
  resume: string;
  resumePATH: string;
  rightToWorkInUk: boolean;
  commuteIntoCentralLondon: boolean;
}

import { Model, model, Schema } from "mongoose";
import { BUSINESS_SERVICE_TYPE } from "../types";

const businessServiceSchema = new Schema<
  BUSINESS_SERVICE_TYPE,
  Model<BUSINESS_SERVICE_TYPE>
>(
  {
    name: {
      type: String,
      required: [true, "name is required."],
    },
    phoneNumber: {
      type: String,
      required: [true, "phoneNumber is required."],
    },
    countryCode: {
      type: String,
      required: [true, "countryCode is required."],
    },
    email: {
      type: String,
      required: [true, "email is required."],
    },
    companyName: {
      type: String,
      required: [true, "companyName is required."],
    },
    companyRegNumber: {
      type: String,
      required: [true, "companyRegNumber is required."],
    },
    message: {
      type: String,
      required: [true, "message is required."],
    },
  },
  { timestamps: true }
);
const BusinessServiceSchema = model<
  BUSINESS_SERVICE_TYPE,
  Model<BUSINESS_SERVICE_TYPE>
>("BusinessService", businessServiceSchema);
export default BusinessServiceSchema;

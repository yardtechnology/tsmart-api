import { Model, model, Schema } from "mongoose";
import { SUPPORT_TYPE } from "../types";

const supportSchema = new Schema<SUPPORT_TYPE, Model<SUPPORT_TYPE>>(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required."],
    },
    countryCode: {
      type: String,
      required: [true, "Country Code is required."],
    },
    message: {
      type: String,
      required: [true, "Message is required."],
    },
    subject: {
      type: String,
      required: [true, "Subject is required."],
    },
    isReplayed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const SupportSchema = model<SUPPORT_TYPE, Model<SUPPORT_TYPE>>(
  "Support",
  supportSchema
);
export default SupportSchema;

import { Model, model, Schema } from "mongoose";
import { CONTACT_US_TYPE } from "../types";

const contactUsSchema = new Schema<CONTACT_US_TYPE, Model<CONTACT_US_TYPE>>(
  {
    name: {
      type: String,
      required: [true, "name is required."],
    },
    email: {
      type: String,
      required: [true, "email is required."],
    },
    phoneNumber: {
      type: String,
      required: [true, "phoneNumber is required."],
    },
    countryCode: {
      type: String,
      required: [true, "countryCode is required."],
    },
    subject: {
      type: String,
      required: [true, "subject is required."],
    },
    message: {
      type: String,
      required: [true, "message is required."],
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
  },
  { timestamps: true }
);
const ContactUsSchema = model<CONTACT_US_TYPE, Model<CONTACT_US_TYPE>>(
  "ContactUs",
  contactUsSchema
);
export default ContactUsSchema;

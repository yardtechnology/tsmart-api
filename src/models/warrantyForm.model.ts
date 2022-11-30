import { Model, model, Schema } from "mongoose";
import { WARRANTY_TYPE } from "../types";

const warrantySchema = new Schema<WARRANTY_TYPE, Model<WARRANTY_TYPE>>(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
    },
    name: {
      type: String,
      required: [true, "name is required."],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required."],
    },
    makeModel: {
      type: String,
      required: [true, "makeModel is required."],
    },
    storeVisited: {
      type: String,
      required: [true, "StoreVisited is required."],
    },
    claimInformation: {
      type: String,
      required: [true, "ClaimInformation is required."],
    },
  },
  { timestamps: true }
);
const WarrantySchema = model<WARRANTY_TYPE, Model<WARRANTY_TYPE>>(
  "Warranty",
  warrantySchema
);
export default WarrantySchema;

import { Model, model, Schema } from "mongoose";
import { VISITOR_TYPE } from "../types";

const visitorSchema = new Schema<VISITOR_TYPE, Model<VISITOR_TYPE>>(
  {
    windowsCount: {
      default: 0,
      type: Number,
    },
    macCount: {
      default: 0,
      type: Number,
    },
    androidCount: {
      default: 0,
      type: Number,
    },
    iosCount: {
      default: 0,
      type: Number,
    },
    otherCount: {
      default: 0,
      type: Number,
    },
  },
  { timestamps: true }
);
const VisitorSchema = model<VISITOR_TYPE, Model<VISITOR_TYPE>>(
  "Visitor",
  visitorSchema
);
export default VisitorSchema;

import { model, Model, Schema } from "mongoose";
import BankType from "../types/bank";

const bankSchema = new Schema<BankType, Model<BankType>>(
  {
    fullName: {
      type: String,
      required: [true, "fullName is required."],
    },
    accountNumber: {
      type: Number,
      required: [true, "accountNumber is required."],
    },
    bankName: {
      type: String,
      required: [true, "bankName is required."],
    },
    SORDCode: {
      type: String,
      required: [true, "SORDCode is required."],
    },
    user: {
      required: [true, "user is required."],
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const BankModel = model<BankType, Model<BankType>>("Bank", bankSchema);

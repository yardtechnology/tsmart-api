import { model, Model, Schema } from "mongoose";
import BankType from "../types/bank";

const bankSchema = new Schema<BankType, Model<BankType>>(
  {
    fullName: String,
    accountNumber: Number,
    bankName: String,
    SORDCode: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const BankModel = model<BankType, Model<BankType>>("Bank", bankSchema);

import { model, Schema } from "mongoose";
import BankType from "../types/bank";

const bankSchema = new Schema<BankType>(
  {
    fullName: String,
    accountNumber: Number,
    sortCode: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const BankModel = model<BankType>("Bank", bankSchema);

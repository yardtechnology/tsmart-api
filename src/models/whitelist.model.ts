import { model, Schema } from "mongoose";
const crypto = require("crypto");

const whitelistSchema = new Schema(
  {
    phoneNumber: Number,
    otp: Number,
  },
  { timestamps: true }
);

export const WhiteListModel = model("Whitelist", whitelistSchema);

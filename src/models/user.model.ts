import { model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import UserType from "../types/user";
const crypto = require("crypto");

const userSchema = new Schema<UserType>(
  {
    displayName: {
      type: String,
      required: true,
    },
    phoneNumber: Number,
    country: {
      code: String,
      name: String,
      phone: String,
    },
    avatar: String,
    avatarPath: String,
    email: {
      type: String,
      unique: true,
    },
    gender: String,
    encrypted_password: String,
    salt: String,
    // password: String,
    token: String,
    dateOfBirth: String,
    role: {
      type: String,
      enum: ["USER", "MANAGER", "ADMIN", "TECHNICIAN"],
      default: "USER",
    },
    fcmTokens: {
      web: String,
      android: String,
      ios: String,
    },
    isLoggedIn: Boolean,
    isOnline: Boolean,
    blockStatus: String,
    status: {
      type: String,
      enum: ["INACTIVE", "ACTIVE", "VERIFIED"],
      default: "INACTIVE",
    },
    verificationInfo: {
      OTP: Number,
      OTPExpiry: Date,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
    lastLogin: Date,
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    console.log("salt:", this.salt);
    console.log("password:", password);
    this.encrypted_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods.authenticate = function (rawPassword: string) {
  return this.encryptPassword(rawPassword) === this.encrypted_password;
};
userSchema.methods.encryptPassword = function (rawPassword: string) {
  console.log("rawPassword:", rawPassword);
  if (!rawPassword) {
    return "";
  }
  try {
    return crypto
      .createHash("sha256", this.salt)
      .update(rawPassword)
      .digest("hex");
  } catch (error) {
    console.log("password encryption error:", error);
    return "";
  }
};

export const UserModel = model<UserType>("User", userSchema);

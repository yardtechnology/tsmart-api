import { Document } from "mongoose";
import StoreType from "./store.type";

export default interface UserType extends Document {
  _doc: UserType;
  displayName: string;
  phoneNumber: number;
  activeOTP: {
    otp: number;
    createdAt: Date;
  };
  country: {
    code: string;
    name: string;
    phone: string;
  };
  avatar: string;
  avatarPath: string;
  email: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  encrypted_password: string;
  salt: string;
  password: string;
  _password: string;
  token: string;
  dateOfBirth: string;
  role: "USER" | "MANAGER" | "ADMIN" | "TECHNICIAN";
  status: "INACTIVE" | "ACTIVE" | "PENDING" | "VERIFIED";
  fcmTokens: {
    web: string;
    android: string;
    ios: string;
  };
  isLoggedIn: boolean;
  isOnline: boolean;
  blockStatus: "BLOCKED" | "UNBLOCKED";
  lastLogin: Date;
  verificationInfo: {
    OTP: number;
    OTPExpiry: Date;
  };
  store: StoreType;
  encryptPassword(rawPassword: string): string;
  authenticate(rawPassword: string): boolean;
}

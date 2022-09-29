import { Request } from "express";

export interface JwtDecodedType {
  _id: string;
  email: string;
  role: "USER" | "MANAGER" | "ADMIN";
}

// auth request
export interface AuthRequest extends Request {
  currentUser?: JwtDecodedType;
}

export interface ImageType {
  url: string;
  path: string;
}

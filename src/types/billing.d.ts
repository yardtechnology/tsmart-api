import { Document } from "mongoose";
import OrderType from "./order.type";

export default interface BillingType extends Document {
  orders: OrderType[];
  subPrice: number;
  tax?: number;
  total: number;
  metadata?: {
    charged_id: string;
    balance_transaction: string;
  };
  extraChargesMetadata?: {
    charged_id: string;
    balance_transaction: string;
  };
  couponDiscount?: {
    coupon: string;
    benefitAmount: number;
    activeAt: Date;
    couponId: string;
  };
  extraCharge: {
    amount: number;
    comment: string;
    tax: number;
  };
  status: "PENDING" | "PAID" | "CANCELLED" | "REFUNDED" | "FAILED";
  createdAt: any;
  type: "REGULAR" | "EXTRA";
}

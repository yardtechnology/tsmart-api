import { Document } from "mongoose";
import OrderType from "./order.type";

export default interface BillingType extends Document {
  orders: OrderType[];
  subPrice: number;
  tax?: number;
  total: number;
  metadata?: {
    payment_order_id: string;
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
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
  createdAt: any;
}

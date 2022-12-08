import { CouponSchema } from "../models";
import { BillingModel } from "../models/billing.model";
// import { ConfigModel } from "../models/config.model";
// import { CouponModel } from "../models/coupon.models";
import { OrderModel } from "../models/order.model";
import { ProductModel } from "../models/product.model";
import BillingType from "../types/billing";
import CartLogic from "./cart.logic";
import CouponLogic from "./coupon.logic";

class BillingLogic extends CouponLogic {
  /**
   *create bill of an order
   */
  public async createBill({
    orderIds,
    price,
    mrp,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    payment_order_id,
    status,
    couponId,
    userId,
  }: {
    orderIds: string[];
    price: number;
    mrp?: number;
    razorpay_payment_id?: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
    payment_order_id?: string;
    status?: "PENDING" | "PAID" | "CANCELLED" | "REFUNDED" | "FAILED";
    couponId?: string;
    userId: string;
  }): Promise<BillingType> {
    return new Promise(async (resolve, reject) => {
      try {
        const configData = {
          tax: 15,
        };
        //TODO:calculate after coupon discount price
        const total = price;
        let couponValue = 0;
        let couponData;
        if (couponId) {
          couponData = await CouponSchema.findById(couponId);
          if (!couponData) throw new Error("Coupon not found");
          couponValue = await super.getCouponDiscount({
            couponId,
            currentUserId: userId as string,
            price: price,
          });
        }
        const tax = configData?.tax ? (total * configData.tax) / 100 : 0;
        const subPrice = total - tax;
        const bill: BillingType = await new BillingModel({
          orders: orderIds,
          total: total - couponValue,
          status,
          metadata: {
            payment_order_id,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          },
          tax,
          subPrice,
          couponDiscount: couponData
            ? {
                coupon: couponData?.code,
                benefitAmount: couponValue,
                activeAt: new Date(),
                couponId: couponData?._id,
              }
            : {},
        }).save();
        resolve(bill);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * calculate single item bill of an order
   */
  public async calculateItemBilling({
    productId,
    quantity,
    couponId,
    userId,
  }: {
    productId: string;
    quantity: number;
    couponId?: string;
    userId?: string;
  }): Promise<{
    amount: number;
    couponInfo?: any;
  }> {
    const configData = {};
    const productData = await ProductModel.findById(productId);
    if (!productData) throw new Error("Product not found");
    const amount = productData.salePrice * quantity;
    let couponValue = 0;
    let couponData;
    if (couponId) {
      couponData = await CouponSchema.findById(couponId);
      if (!couponData) throw new Error("Coupon not found");
      couponValue = await super.getCouponDiscount({
        couponId,
        currentUserId: userId as string,
        price: amount,
      });
    }
    return {
      amount: amount - couponValue,
      couponInfo: couponData
        ? {
            coupon: couponData?.code,
            benefitAmount: couponValue,
            activeAt: new Date(),
            couponId: couponData?._id,
          }
        : {},
    };
  }
  /**
   * calculate cart item bill of order
   */
  public async calculateCartItemBilling({
    userId,
    couponId,
  }: {
    userId?: string;
    couponId?: string;
  }): Promise<{
    amount: number;
    couponInfo: any;
  }> {
    const configData = {};
    const cartData = await new CartLogic().getCartItems(userId);
    const amount = cartData?.subTotal;
    let couponValue = 0;
    let couponData;
    if (couponId) {
      couponData = await CouponSchema.findById(couponId);
      if (!couponData) throw new Error("Coupon not found");
      couponValue = await super.getCouponDiscount({
        couponId,
        currentUserId: userId as string,
        price: amount,
      });
    }
    // if (!productData) throw new Error("Product not found");
    return {
      amount: amount - couponValue,
      couponInfo: couponData
        ? {
            coupon: couponData?.code,
            benefitAmount: couponValue,
            activeAt: new Date(),
            couponId: couponData?._id,
          }
        : {},
    };
  }

  /**
   * create order billing
   */
  public async createOrderBilling({
    orderIds,
    paymentMethod,
    payment_order_id,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    couponDiscount,
  }: {
    orderIds: string[];
    paymentMethod: "COD" | "ONLINE";
    payment_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
    couponDiscount?: any;
  }): Promise<BillingType> {
    return new Promise(async (resolve, reject) => {
      try {
        const configData = { tax: 15 };
        const ordersData = await OrderModel.find({ _id: { $in: orderIds } });
        const ordersIdArr = ordersData.map((order) => order._id);
        const basePrice = ordersData.reduce((acc, order) => {
          return (acc += order.product.salePrice * order.quantity);
        }, 0);
        const bill: BillingType = await new BillingModel({
          orders: ordersIdArr,
          subTotal: basePrice,
          tax: configData?.tax ? (basePrice * configData.tax) / 100 : 0,
          total: basePrice - (couponDiscount?.benefitAmount || 0),
          paymentMethod: paymentMethod,
          metadata: {
            payment_order_id,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          },
          couponDiscount,
          // TODO:remove comment after payment gateway integration
          // couponDiscount: {
          //   coupon: String,
          //   benefitAmount: Number,
          //   activeAt: Date,
          // },
          // cancellationFee: Number,
        }).save();
        resolve(bill);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * add extra charges in order
   */
  public async createExtraFeesBilling({
    orderId,
    basePrice,
    paymentMethod,
    couponDiscount,
  }: {
    orderId: string[];
    basePrice: number;
    paymentMethod?: "COD" | "ONLINE";
    couponDiscount?: any;
  }): Promise<BillingType> {
    return new Promise(async (resolve, reject) => {
      try {
        const configData = { tax: 15 };
        let bill = await BillingModel.findOneAndUpdate(
          {
            orders: orderId,
            type: "EXTRA",
          },
          {
            subTotal: basePrice,
            tax: configData?.tax ? (basePrice * configData.tax) / 100 : 0,
            total: basePrice - (couponDiscount?.benefitAmount || 0),
            paymentMethod: paymentMethod,
            couponDiscount,
            orders: orderId,
            type: "EXTRA",
          },
          {
            upsert: true,
          }
        );
        if (!bill) {
          bill = await new BillingModel({
            subTotal: basePrice,
            tax: configData?.tax ? (basePrice * configData.tax) / 100 : 0,
            total: basePrice - (couponDiscount?.benefitAmount || 0),
            paymentMethod: paymentMethod,
            couponDiscount,
            orders: orderId,
            type: "EXTRA",
          }).save();
        }
        resolve(bill);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default BillingLogic;

import { CouponSchema } from "../models";
//   import HolidayType from "../types";

class CouponLogic {
  public getCouponDiscount({
    currentUserId,
    couponId,
    price,
  }: {
    currentUserId?: string;
    couponId: string;
    price: number;
  }): any {
    return new Promise(async (resolve, reject) => {
      try {
        const arg = currentUserId
          ? {
              $push: {
                users: currentUserId,
              },
            }
          : {
              t: 78,
            };
        const couponData = await CouponSchema.findOneAndUpdate({
          _id: couponId,
          $and: [
            {
              startDate: {
                $gte: new Date(),
              },
            },
            {
              endDate: {
                $lte: new Date(),
              },
            },
          ],
        });
        if (!couponData) throw new Error("Coupon expire.");

        const percentageDiscountCalculate =
          price * (couponData?.discountPercent / 100);
        const realDiscount =
          percentageDiscountCalculate <= couponData.maxCashBack
            ? percentageDiscountCalculate
            : couponData.maxCashBack;
        const afterDiscountPriceIs = price - realDiscount;

        resolve({
          price: afterDiscountPriceIs,
          discountPrice: realDiscount,
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default CouponLogic;

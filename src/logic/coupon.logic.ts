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
  }): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const arg = currentUserId
          ? {
              $push: {
                users: currentUserId,
              },
            }
          : {};
        const couponData = await CouponSchema.findOneAndUpdate(
          {
            _id: couponId,
            $and: [
              {
                startDate: {
                  $lte: new Date(),
                },
              },
              {
                endDate: {
                  $gte: new Date(),
                },
              },
            ],
          },
          arg,
          { runValidators: true }
        );
        if (!couponData) throw new Error("Coupon expire.");

        const percentageDiscountCalculate =
          price * (couponData?.discountPercent / 100);
        const realDiscount =
          percentageDiscountCalculate <= couponData.maxCashBack
            ? percentageDiscountCalculate
            : couponData.maxCashBack;
        const afterDiscountPriceIs = price - realDiscount;

        resolve(realDiscount);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default CouponLogic;

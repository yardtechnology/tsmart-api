import { NextFunction, Response } from "express";
import { query } from "express-validator";
import { OrderModel } from "../models/order.model";
import { AuthRequest } from "../types/core";
class PaymentDashboardController {
  async totalRevenue(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      const arrayArg = [];
      if (startDate && endDate) {
        arrayArg.push({
          $match: {
            $expr: {
              $and: [
                {
                  $gte: ["$createdAt", new Date(Number(startDate))],
                },
                {
                  $lte: ["$createdAt", new Date(Number(endDate))],
                },
              ],
            },
          },
        });
      }
      const orderDataAccordingStatus = await OrderModel.aggregate([
        ...arrayArg,

        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            refurBish: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$type", "REFURBISH"],
                  },
                  1,
                  0,
                ],
              },
            },
            accessory: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$type", "ACCESSORY"],
                  },
                  1,
                  0,
                ],
              },
            },
            inStore: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$serviceType", "IN_STOR"],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ]);
      res.json({
        status: "SUCCESS",
        message: "Order card data found successfully.",
        data: orderDataAccordingStatus?.[0],
      });
    } catch (error) {
      next(error);
    }
  }
}
export const PaymentDashboardValidation = {
  totalRevenue: [
    query("startDate")
      .optional()
      .isNumeric()
      .withMessage("startDate must be a number."),
    query("endDate")
      .optional()
      .isNumeric()
      .withMessage("endDate must be a number."),
  ],
};

export default PaymentDashboardController;

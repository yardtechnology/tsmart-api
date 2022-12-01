import { NextFunction, Response } from "express";
import { OrderModel } from "../models/order.model";
// import { nextTick } from "process";/
import { AuthRequest } from "../types/core";

export default class OrderDashboardController {
  async card(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const orderCard = await OrderModel.aggregate([
        {
          $match: {
            $expr: {
              $or: [
                {
                  $eq: ["$type", "ACCESSORY"],
                },
                {
                  $eq: ["$type", "REFURBISH"],
                },
              ],
            },
          },
        },
        {
          $group: {
            _id: null,
            totalRefurbish: {
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
            totalAccessory: {
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
            deliveredRefurbish: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: ["$type", "REFURBISH"],
                      },
                      {
                        $eq: ["$status", "COMPLETED"],
                      },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            deliveredAccessory: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: ["$status", "COMPLETED"],
                      },
                      {
                        $eq: ["$type", "ACCESSORY"],
                      },
                    ],
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
        message: "Call out list successfully.",
        data: orderCard?.[0],
      });
    } catch (error) {
      next(error);
    }
  }
}

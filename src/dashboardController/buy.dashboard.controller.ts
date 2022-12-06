import { NextFunction, Response } from "express";
import { OrderModel } from "../models/order.model";
import { AuthRequest } from "../types/core";
class BuyDashboardController {
  async card(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const orderDataAccordingStatus = await OrderModel.aggregate([
        {
          $match: {
            type: "SELL",
          },
        },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);
      res.json({
        status: "SUCCESS",
        message: "Order card data found successfully.",
        data: orderDataAccordingStatus,
      });
    } catch (error) {
      next(error);
    }
  }
  async circularGraph(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const orderBuyStatus = await OrderModel.aggregate([
        {
          $match: {
            type: "SELL",
          },
        },
        {
          $group: {
            _id: null,
            initiatedCount: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$status", "INITIATED"],
                  },
                  1,
                  0,
                ],
              },
            },
            receivedCount: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$status", "RECEIVED"],
                  },
                  1,
                  0,
                ],
              },
            },
            completeCount: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$status", "COMPLETED"],
                  },
                  1,
                  0,
                ],
              },
            },
            cancelCount: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$status", "CANCELLED"],
                  },
                  1,
                  0,
                ],
              },
            },

            total: { $sum: 1 },
          },
        },
        {
          $project: {
            initiatedPercent: {
              $divide: [{ $multiply: ["$initiatedCount", 100] }, "$total"],
            },
            receivedPercent: {
              $divide: [{ $multiply: ["$receivedCount", 100] }, "$total"],
            },
            completePercent: {
              $divide: [{ $multiply: ["$completeCount", 100] }, "$total"],
            },
            cancelPercent: {
              $divide: [{ $multiply: ["$cancelCount", 100] }, "$total"],
            },
            total: 1,
            initiatedCount: 1,
            receivedCount: 1,
            completeCount: 1,
            cancelCount: 1,
          },
        },
      ]);
      res.json({
        status: "SUCCESS",
        message: "Order card data found successfully.",
        data: orderBuyStatus?.[0],
      });
    } catch (error) {
      next(error);
    }
  }
}

export default BuyDashboardController;

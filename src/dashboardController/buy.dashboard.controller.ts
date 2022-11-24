import { NextFunction, Response } from "express";
import { OrderModel } from "../models/order.model";
import { AuthRequest } from "../types/core";
class BuyDashboardController {
  async card(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const orderDataAccordingStatus = await OrderModel.aggregate([
        {
          $match: {
            type: "BUY",
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
}

export default BuyDashboardController;

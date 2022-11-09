import { NextFunction, Response } from "express";
import { query } from "express-validator";
import { OrderModel } from "../models/order.model";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";

class DashboardController {
  async statusCount(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { status } = req.query;
      const arrayCheck = status
        ? Array.isArray(status)
          ? status
          : [status]
        : undefined;
      const query: any = {};
      arrayCheck && (query["status"] = { $in: arrayCheck });
      const orderStatusCount = await OrderModel.find({ ...query }).count();
      res.json({
        status: "SUCCESS",
        message: "Order count fetched successfully",
        data: orderStatusCount,
      });
    } catch (error) {
      next(error);
    }
  }

  async totalUserCount(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.json({
        status: "SUCCESS",
        message: "Total user found successfully.",
        data: await UserModel.find({}).count(),
      });
    } catch (error) {
      next(error);
    }
  }
  // async repaireOrderCount(req: AuthRequest, res: Response, next: NextFunction)
}

export const DashboardControllerValidation = {
  statusCount: [
    query("status")
      .optional()
      .exists()
      .custom((value) => {
        const arrayCheck = Array.isArray(value) ? value : [value];
        const allDataArray = [
          "INITIATED",
          "COMPLETED",
          "CANCELLED",
          "CONFIRMED",
          "PACKED",
          "SHIPPED",
          "OUT_FOR_DELIVERY",
          "DELIVERED",
          "RECEIVED",
          "PAID",
          "TECHNICIAN_ASSIGNED",
          "TECHNICIAN_REACHED",
          "REPAIRED",
          "ADD_ON_SERVICE",
        ];
        const filterData = arrayCheck.filter((item) =>
          allDataArray.find((item2) => item === item2)
        );
        return Boolean(filterData.length);
      })
      .withMessage(
        "Status must be among of these INITIATED,COMPLETED, CANCELLED, CONFIRMED, PACKED, SHIPPED, OUT_FOR_DELIVERY,DELIVERED, RECEIVED, PAID, TECHNICIAN_ASSIGNED, TECHNICIAN_REACHED, REPAIRED, ADD_ON_SERVICE "
      ),
  ],
  totalRevenue: [],
};

export default DashboardController;

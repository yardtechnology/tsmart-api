import { NextFunction, Response } from "express";
import { query } from "express-validator";
import { paginationHelper } from "../helper";
import { OrderModel } from "../models/order.model";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";
class ReportDashboardController {
  async reportCount(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      const argQuery: any = {};
      if (startDate && endDate) {
        argQuery["$and"] = [
          {
            createdAt: { $gte: new Date(Number(startDate)) },
          },
          {
            createdAt: {
              $lte: new Date(Number(endDate)),
            },
          },
        ];
      }
      const totalUser = await UserModel.find(argQuery).count();
      const totalJob = await OrderModel.find({
        serviceType: "CALL_OUT",
        ...argQuery,
      }).count();
      const totalBrought = await OrderModel.find({
        type: { $in: ["ACCESSORY", "REFURBISH"] },
        ...argQuery,
      }).count();

      res.json({
        status: "SUCCESS",
        message: "Report count successfully.",
        data: { totalUser, totalBrought, totalJob },
      });
    } catch (error) {
      next(error);
    }
  }
  async totalUserList(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      const query: any = {};
      if (startDate && endDate) {
        query["$and"] = [
          {
            createdAt: { $gte: new Date(Number(startDate)) },
          },
          {
            createdAt: {
              $lte: new Date(Number(endDate)),
            },
          },
        ];
      }

      const totalUser = await paginationHelper({
        model: UserModel,
        query,
        limit: req.query.limit,
        chunk: req.query.chunk,
        sort: { createdAt: -1 },
      });
      res.json({
        status: "SUCCESS",
        message: "User list get successfully.",
        data: totalUser,
      });
    } catch (error) {
      next(error);
    }
  }
  async totalJob(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      const query: any = {};
      if (startDate && endDate) {
        query["$and"] = [
          {
            createdAt: { $gte: new Date(Number(startDate)) },
          },
          {
            createdAt: {
              $lte: new Date(Number(endDate)),
            },
          },
        ];
      }
      query["serviceType"] = "CALL_OUT";

      const totalJob = await paginationHelper({
        model: OrderModel,
        query,
        limit: req.query.limit,
        chunk: req.query.chunk,
        sort: { createdAt: -1 },
      });

      res.json({
        status: "SUCCESS",
        message: "Total job get successfully.",
        data: totalJob,
      });
    } catch (error) {
      next(error);
    }
  }
  async totalBrought(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      const query: any = {};
      if (startDate && endDate) {
        query["$and"] = [
          {
            createdAt: { $gte: new Date(Number(startDate)) },
          },
          {
            createdAt: {
              $lte: new Date(Number(endDate)),
            },
          },
        ];
      }
      query["type"] = { $in: ["ACCESSORY", "REFURBISH"] };

      const totalBrought = await paginationHelper({
        model: OrderModel,
        query,
        limit: req.query.limit,
        chunk: req.query.chunk,
        sort: { createdAt: -1 },
      });

      res.json({
        status: "SUCCESS",
        message: "Total brought successfully.",
        data: totalBrought,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const ReportDashboardValidation = {
  totalUser: [
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

export default ReportDashboardController;

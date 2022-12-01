import { NextFunction, Response } from "express";
import { query } from "express-validator";
import { paginationHelper } from "../helper";
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
            refurbish: {
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

            mailInRevenue: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$serviceType", "MAIL_IN"],
                  },
                  1,
                  0,
                ],
              },
            },
            calloutRevenue: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$serviceType", "CALL_OUT"],
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

  async refurbishList(req: AuthRequest, res: Response, next: NextFunction) {
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
      query["type"] = "REFURBISH";

      const totalRefurbish = await paginationHelper({
        model: OrderModel,
        query,
        limit: req.query.limit,
        chunk: req.query.chunk,
        sort: { createdAt: -1 },
      });

      res.json({
        status: "SUCCESS",
        message: "Refurbish list successfully.",
        data: totalRefurbish,
      });
    } catch (error) {
      next(error);
    }
  }

  async accessoryList(req: AuthRequest, res: Response, next: NextFunction) {
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
      query["type"] = "ACCESSORY";

      const accessoryData = await paginationHelper({
        model: OrderModel,
        query,
        limit: req.query.limit,
        chunk: req.query.chunk,
        sort: { createdAt: -1 },
      });

      res.json({
        status: "SUCCESS",
        message: "Accessory list successfully.",
        data: accessoryData,
      });
    } catch (error) {
      next(error);
    }
  }

  async inStoreList(req: AuthRequest, res: Response, next: NextFunction) {
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
      query["type"] = "IN_STOR";

      const inStoreData = await paginationHelper({
        model: OrderModel,
        query,
        limit: req.query.limit,
        chunk: req.query.chunk,
        sort: { createdAt: -1 },
      });

      res.json({
        status: "SUCCESS",
        message: "In-Store list successfully.",
        data: inStoreData,
      });
    } catch (error) {
      next(error);
    }
  }

  async mailInRevenueList(req: AuthRequest, res: Response, next: NextFunction) {
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
      query["type"] = "MAIL_IN";

      const mailInData = await paginationHelper({
        model: OrderModel,
        query,
        limit: req.query.limit,
        chunk: req.query.chunk,
        sort: { createdAt: -1 },
      });

      res.json({
        status: "SUCCESS",
        message: "Mail-in list successfully.",
        data: mailInData,
      });
    } catch (error) {
      next(error);
    }
  }
  async callOutRevenue(req: AuthRequest, res: Response, next: NextFunction) {
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
      query["type"] = "CALL_OUT";

      const callOutData = await paginationHelper({
        model: OrderModel,
        query,
        limit: req.query.limit,
        chunk: req.query.chunk,
        sort: { createdAt: -1 },
      });

      res.json({
        status: "SUCCESS",
        message: "Call out list successfully.",
        data: callOutData,
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

import { NextFunction, Response } from "express";
import { Types } from "mongoose";
import { OrderModel } from "../models/order.model";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";

export default class OrderDashboardController {
  async card(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const role = req?.currentUser?.role;
      let managerFilter: any[] = [];
      if (role === "MANAGER") {
        const findUser = await UserModel.findById(req?.currentUser?._id);
        managerFilter = [
          {
            $match: {
              storeID: new Types.ObjectId(findUser?.store?.toString()),
            },
          },
        ];
      }
      const orderCard = await OrderModel.aggregate([
        ...managerFilter,
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

  async lastOneYearData(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const role = req?.currentUser?.role;
      let managerFilter: any[] = [];
      if (role === "MANAGER") {
        const findUser = await UserModel.findById(req?.currentUser?._id);
        managerFilter = [
          {
            $match: {
              storeID: new Types.ObjectId(findUser?.store?.toString()),
            },
          },
        ];
      }
      const currentDateRoot = new Date(
        new Date().getFullYear(),
        new Date().getMonth()
      );
      const mS = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      const lastOneYearOrder = await OrderModel.aggregate([
        ...managerFilter,
        {
          $match: {
            $expr: {
              $or: [
                {
                  type: "ACCESSORY",
                },
                {
                  type: "REFURBISH",
                },
              ],
            },
          },
        },
        {
          $addFields: {
            endDate: new Date(currentDateRoot),
            startDate: {
              $dateSubtract: {
                startDate: new Date(currentDateRoot),
                unit: "year",
                amount: 1,
              },
            },
          },
        },
        {
          $match: {
            $expr: {
              $and: [
                {
                  $gte: ["$createdAt", "$startDate"],
                },
                {
                  $lte: ["$createdAt", "$endDate"],
                },
              ],
            },
          },
        },
        {
          $addFields: {
            monthNumber: {
              $month: "$createdAt",
            },
          },
        },
        {
          $project: {
            monthNumber: 1,
          },
        },

        {
          $group: {
            _id: null,
            [`${mS[1]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 1] }, 1, 0] },
            },
            [`${mS[2]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 2] }, 1, 0] },
            },
            [`${mS[3]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 3] }, 1, 0] },
            },
            [`${mS[4]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 4] }, 1, 0] },
            },
            [`${mS[5]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 5] }, 1, 0] },
            },
            [`${mS[6]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 6] }, 1, 0] },
            },
            [`${mS[7]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 7] }, 1, 0] },
            },
            [`${mS[8]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 8] }, 1, 0] },
            },
            [`${mS[9]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 9] }, 1, 0] },
            },
            [`${mS[10]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 10] }, 1, 0] },
            },
            [`${mS[11]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 11] }, 1, 0] },
            },
            [`${mS[12]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 12] }, 1, 0] },
            },
          },
        },
      ]);
      res.json({
        status: "SUCCESS",
        message: "Monthly order count successfully.",
        data: lastOneYearOrder,
      });
    } catch (error) {
      next(error);
    }
  }
  async deliveryOrder(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const deliveryOrder = await OrderModel.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $in: ["$type", ["ACCESSORY", "REFURBISH"]],
                },
                {
                  $eq: ["$status", "DELIVERED"],
                },
              ],
            },
          },
        },
        {
          $group: {
            _id: "$type",
            count: { $sum: 1 },
          },
        },
      ]);
      res.json({
        status: "SUCCESS",
        message: "Total delivered order count successfully.",
        data: deliveryOrder,
      });
    } catch (error) {
      next(error);
    }
  }
}

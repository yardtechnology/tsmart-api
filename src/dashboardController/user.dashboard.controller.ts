import { NextFunction, Response } from "express";
import { param } from "express-validator";
import { Types } from "mongoose";
import { OrderModel } from "../models/order.model";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";
class UserDashboardController {
  async userLastWeeklyJoin(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const currentDateRoot = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      );
      const currentDateHigh = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        23,
        59,
        59
      );

      const getUserData = await UserModel.aggregate([
        {
          $addFields: {
            startDay: new Date(currentDateHigh),
            endDay: {
              $dateSubtract: {
                startDate: new Date(currentDateRoot),
                unit: "day",
                amount: 7,
              },
            },
          },
        },
        {
          $match: {
            $expr: {
              $and: [
                {
                  $gte: ["$startDay", "$createdAt"],
                },
                {
                  $lte: ["$endDay", "$createdAt"],
                },
              ],
            },
          },
        },
        {
          $addFields: {
            dayNumber: {
              $dayOfWeek: "$createdAt",
            },
          },
        },
        {
          $sort: {
            dayNumber: 1,
          },
        },
        {
          $group: {
            _id: { date: "$dayNumber", role: "$role" },
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: "$_id.role",
            dataArray: {
              $push: {
                count: "$count",
                dayNumber: "$_id.date",
              },
            },
          },
        },

        {
          $project: {
            name: "$_id",
            data: "$dataArray",
          },
        },
      ]);
      const weekArray = [1, 2, 3, 4, 5, 6, 7];
      const dataStructure = getUserData?.map((dataItem) => {
        return {
          name: dataItem.name,
          data: weekArray.map(
            (item) =>
              dataItem?.data?.find((item2: any) => item2?.dayNumber === item)
                ?.count || 0
          ),
        };
      });
      res.json({
        status: "SUCCESS",
        message: "User data get successfully.",
        data: dataStructure,
      });
    } catch (error) {
      next(error);
    }
  }
  async userTechnicianCount(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const getAllTechnician = await UserModel.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ["$role", "TECHNICIAN"],
                },
                {
                  $in: ["$status", ["VERIFIED", "PENDING"]],
                },
              ],
            },
          },
        },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            status: "$_id",
            count: 1,
          },
        },
      ]);
      res.json({
        status: "SUCCESS",
        message: "Technician count successfully.",
        data: getAllTechnician,
      });
    } catch (error) {
      next(error);
    }
  }
  async customerCount(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const customerCount = await UserModel.aggregate([
        {
          $match: {
            role: "USER",
          },
        },
        {
          $group: {
            _id: "$isOnline",
            status: {
              $first: {
                $cond: [{ $eq: ["$isOnline", true] }, "Online", "Offline"],
              },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            status: 1,
            _id: 0,
            count: 1,
          },
        },
      ]);
      res.json({
        status: "SUCCESS",
        message: "Customer count successfully.",
        data: customerCount,
      });
    } catch (error) {
      next(error);
    }
  }
  // technician details count
  async technician(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { technicianId } = req.params;

      const currentDateRoot = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      );
      const currentDateHigh = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        23,
        59,
        59
      );

      const orderData = await OrderModel.aggregate([
        {
          $match: {
            technicianID: new Types.ObjectId(technicianId),
          },
        },
        {
          $lookup: {
            from: "billings",
            localField: "billing",
            foreignField: "_id",
            as: "billing",
            pipeline: [
              {
                $project: {
                  total: 1,
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: "$billing",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "billings",
            localField: "extraBilling",
            foreignField: "_id",
            as: "extraBilling",
            pipeline: [
              {
                $project: {
                  total: 1,
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: "$extraBilling",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $group: {
            _id: "$technicianID",
            completeJob: {
              $sum: { $cond: [{ $eq: ["$status", "COMPLETED"] }, 1, 0] },
            },
            todayJobs: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $gte: ["$scheduledTime", new Date(currentDateRoot)],
                      },
                      {
                        $lte: ["$createdAt", new Date(currentDateHigh)],
                      },
                      {
                        $ne: ["$status", "COMPLETED"],
                      },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            totalSale: {
              $sum: {
                $cond: [
                  { $eq: ["$status", "COMPLETED"] },
                  {
                    $add: [
                      "$billing.total",
                      { $ifNull: ["$extraBilling.total", 0] },
                    ],
                  },
                  0,
                ],
              },
            },
          },
        },
      ]);
      const findUser = await UserModel.findById(technicianId);
      const ratings =
        (findUser?.reviews?.stars || 0) / (findUser?.reviews?.total || 1);

      res.json({
        status: "SUCCESS",
        message: "Customer count successfully.",

        data: {
          ...orderData?.[0],

          ratings,
          _id: undefined,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
export const userDashboardValidation = {
  technician: [
    param("technicianId")
      .not()
      .isEmpty()
      .withMessage("technicianId is required.")
      .isMongoId()
      .withMessage("technicianId must be mongoes id"),
  ],
};

export default UserDashboardController;

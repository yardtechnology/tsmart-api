import { NextFunction, Response } from "express";
import { Types } from "mongoose";
import { OrderModel } from "../models/order.model";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";
class RepairerDashboardController {
  async repairerStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const role = req?.currentUser?.role;
      let managerFilter: any[] = [{ $ifNull: ["$serviceType", false] }];
      if (role === "MANAGER") {
        const findUser = await UserModel.findById(req?.currentUser?._id);
        managerFilter.push({
          $eq: ["$store", new Types.ObjectId(findUser?.store?.toString())],
        });
      }
      const totalRepairerStatus = await OrderModel.aggregate([
        {
          $match: {
            $expr: {
              $and: managerFilter,
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
          $group: {
            _id: null,
            totalStatusData: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            totalStatusData: 1,
            totalCount: {
              $reduce: {
                input: "$totalStatusData",
                initialValue: 0,
                in: { $add: ["$$value", "$$this.count"] },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalCount: 1,
            totalStatusData: {
              $map: {
                input: "$totalStatusData",
                as: "singleStatus",
                in: {
                  name: "$$singleStatus._id",
                  count: "$$singleStatus.count",
                  percentage: {
                    $divide: [
                      {
                        $multiply: ["$$singleStatus.count", 100],
                      },
                      "$totalCount",
                    ],
                  },
                },
              },
            },
          },
        },
      ]);
      res.json({
        status: "SUCCESS",
        message: "Repairer status data get successfully",
        data: totalRepairerStatus?.[0],
      });
    } catch (error) {
      next(error);
    }
  }
  async lastSevenYearData(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const currentYearLowDate = new Date(new Date().getFullYear(), 0);
      const currentYearHighDate = new Date(
        new Date().getFullYear(),
        11,
        31,
        23,
        59,
        59
      );
      const lastSevenYear = [0, 1, 2, 3, 4, 5, 6];

      const role = req?.currentUser?.role;
      const managerFilter: any[] = [];
      if (role === "MANAGER") {
        const findUser = await UserModel.findById(req?.currentUser?._id);
        managerFilter.push([
          {
            $match: {
              store: new Types.ObjectId(findUser?.store?.toString()),
            },
          },
        ]);
      }
      const lastSevenYearData = await OrderModel.aggregate([
        ...managerFilter,
        {
          $group: {
            _id: null,
          },
        },
        {
          $addFields: {
            lastSevenYear: {
              $map: {
                input: lastSevenYear,
                as: "singleYear",
                in: {
                  startDate: {
                    $dateSubtract: {
                      startDate: new Date(currentYearLowDate),
                      unit: "year",
                      amount: "$$singleYear",
                    },
                  },
                  endDate: {
                    $dateSubtract: {
                      startDate: new Date(currentYearHighDate),
                      unit: "year",
                      amount: "$$singleYear",
                    },
                  },
                },
              },
            },
          },
        },
        {
          $unwind: {
            path: "$lastSevenYear",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 0,
            startDate: "$lastSevenYear.startDate",
            endDate: "$lastSevenYear.endDate",
            year: { $year: "$lastSevenYear.startDate" },
          },
        },
        {
          $lookup: {
            from: "orders",
            as: "orders",
            let: {
              startDate: "$startDate",
              endDate: "$endDate",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $ifNull: ["$serviceType", false],
                      },
                      {
                        $gte: ["$createdAt", "$$startDate"],
                      },
                      {
                        $lte: ["$createdAt", "$$endDate"],
                      },
                    ],
                  },
                },
              },
              {
                $group: {
                  _id: "$serviceType",
                  count: { $sum: 1 },
                },
              },
              {
                $project: {
                  name: "$_id",
                  count: 1,
                },
              },
            ],
          },
        },
        {
          $project: {},
        },
      ]);
      res.json({
        status: "SUCCESS",
        message: "Repairer status data get successfully",
        data: lastSevenYearData,
      });
    } catch (error) {
      next(error);
    }
  }
  async card(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const role = req?.currentUser?.role;
      let managerQuery = {};
      if (role === "MANAGER") {
        const findUser = await UserModel.findById(req?.currentUser?._id);
        managerQuery = { store: findUser?.store };
      }

      const inStoreRepairer = await OrderModel.find({
        serviceType: "IN_STOR",
        ...managerQuery,
      }).count();
      const mailInRepairer = await OrderModel.find({
        serviceType: "MAIL_IN",
        ...managerQuery,
      }).count();
      const callOutRepairer = await OrderModel.find({
        serviceType: "CALL_OUT",
        ...managerQuery,
      }).count();
      const completeRepairer = await OrderModel.find({
        serviceType: { $exists: true },
        status: "COMPLETED",
        ...managerQuery,
      }).count();
      const onGoingRepairer = await OrderModel.find({
        serviceType: { $exists: true },
        status: { $nin: ["COMPLETED", "CANCELLED"] },
        ...managerQuery,
      }).count();
      const cancelRepairer = await OrderModel.find({
        serviceType: { $exists: true },
        status: "CANCELLED",
        ...managerQuery,
      }).count();

      res.json({
        status: "SUCCESS",
        message: "Repairer status data get successfully",
        data: {
          inStoreRepairer,
          mailInRepairer,
          callOutRepairer,
          completeRepairer,
          onGoingRepairer,
          cancelRepairer,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default RepairerDashboardController;

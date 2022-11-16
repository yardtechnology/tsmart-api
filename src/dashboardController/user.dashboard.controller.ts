import { NextFunction, Response } from "express";
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
}
// export const UserDashboardControllerValidation = {

// };

export default UserDashboardController;

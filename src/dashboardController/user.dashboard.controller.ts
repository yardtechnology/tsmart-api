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
        // {
        //   $match: {
        //     $expr: {
        //       $and: [
        //         {
        //           $gte: ["$startDay", "$createdAt"],
        //         },
        //         // {
        //         //   $gte: ["$startDay", "$createdAt"],
        //         // },
        //       ],
        //     },
        //   },
        // },
      ]);
      res.json({
        status: "SUCCESS",
        message: "User data get successfully.",
        data: getUserData,
      });
    } catch (error) {
      next(error);
    }
  }
}
// export const UserDashboardControllerValidation = {

// };

export default UserDashboardController;

import { NextFunction, Response } from "express";
import { query } from "express-validator";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";
class ReportDashboardController {
  async totalUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      const argQuery: any = {};
      if (startDate && endDate) {
        argQuery["$and"] = [
          {
            startDate: { $gte: new Date(Number(startDate)) },
          },
          {
            endDate: {
              $lte: new Date(Number(endDate)),
            },
          },
        ];
      }
      const totalUser = await UserModel.find(argQuery).count();
      res.json({
        status: "SUCCESS",
        message: "user count get successfully.",
        data: totalUser,
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

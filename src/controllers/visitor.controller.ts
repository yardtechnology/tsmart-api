import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { InternalServerError } from "http-errors";
import { fieldValidateError } from "../helper";
import { VisitorSchema } from "../models";
import { AuthRequest } from "../types/core";

class VisitorController {
  async createAndUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);
      const { windowsCount, macCount, androidCount, iosCount, otherCount } =
        req.body;
      const incrementObject: any = {};
      windowsCount && (incrementObject["windowsCount"] = 1);
      macCount && (incrementObject["macCount"] = 1);
      androidCount && (incrementObject["androidCount"] = 1);
      iosCount && (incrementObject["iosCount"] = 1);
      otherCount && (incrementObject["otherCount"] = 1);

      const updateVisitors = await VisitorSchema.findOneAndUpdate(
        {},
        {
          $inc: incrementObject,
        },
        {
          upsert: true,
          runValidators: true,
          new: true,
        }
      );
      if (!updateVisitors)
        throw new InternalServerError(
          "Something went wrong, data is not saved.1"
        );

      res.json({
        status: "SUCCESS",
        message: "Timing is created successfully.",
        data: updateVisitors,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const getVisitorCount = await VisitorSchema.findOne({});
      res.json({
        status: "SUCCESS",
        message: "Visitor data found successfully.",
        data: getVisitorCount,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const VisitorControllerValidation = {
  createAndUpdate: [
    body("windowsCount")
      .optional()
      .isNumeric()
      .withMessage("windowsCount most be number."),
    body("macCount")
      .optional()
      .isNumeric()
      .withMessage("macCount most be number."),
    body("androidCount")
      .optional()
      .isNumeric()
      .withMessage("androidCount most be number."),
    body("iosCount")
      .optional()
      .isNumeric()
      .withMessage("iosCount most be number."),
    body("otherCount")
      .optional()
      .isNumeric()
      .withMessage("otherCount most be number."),
  ],
};

export default VisitorController;

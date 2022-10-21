import { NextFunction, Response } from "express";
import { body, param } from "express-validator";
import { InternalServerError } from "http-errors";
import { Types } from "mongoose";
import { fieldValidateError } from "../helper";
import { TimingSchema } from "../models";
import { AuthRequest } from "../types/core";

class TimingController {
  async createAndUpdate(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);
      const {
        numberOfRepairers,
        start,
        end,
        storeId,
        timingId,
        durationInMin,
      } = req.body;
      const user = req?.currentUser?._id;
      const dayOfWeekNumber = start ? new Date(start).getDay() : undefined;
      const arg: any = {
        store: storeId,
      };
      timingId && (arg["_id"] = timingId);
      dayOfWeekNumber && (arg["dayOfWeekNumber"] = dayOfWeekNumber);

      const timingCreateAndUpdate = await TimingSchema.findOneAndUpdate(
        arg,
        {
          start,
          end,
          numberOfRepairers,
          dayOfWeekNumber: dayOfWeekNumber,
          durationInMin,
        },
        {
          upsert: true,
          new: true,
        }
      );
      if (!timingCreateAndUpdate)
        throw new InternalServerError(
          "Something went wrong, Timing is not created."
        );
      res.json({
        status: "SUCCESS",
        message: "Timing is created successfully.",
        data: timingCreateAndUpdate,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { limit, chunk } = req.query;
      const { storeId } = req.params;
      const { start } = req.body;

      const dayOfWeekNumber = start ? new Date(start).getDay() : undefined;

      const query: any = {};
      dayOfWeekNumber && (query["dayOfWeekNumber"] = dayOfWeekNumber);
      // storeId && (query["store"] = storeId);

      const getAllData = await TimingSchema.aggregate([
        {
          $match: {
            store: new Types.ObjectId(storeId),
          },
        },
        {
          $addFields: {
            timeArray: {
              $range: [
                "$start",
                "$end",
                {
                  $dateAdd: {
                    startDate: "$start",
                    unit: "minute",
                    amount: 30,
                  },
                },
              ],
            },
          },
        },
      ]);
      res.status(200).json({
        status: "SUCCESS",
        message: storeId
          ? "Timing found successfully."
          : "All Timing found successfully.",
        data: getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const TimingControllerValidation = {
  createAndUpdate: [
    body("numberOfRepairers")
      .not()
      .isEmpty()
      .withMessage("numberOfRepairers is required.")
      .isNumeric()
      .withMessage("numberOfRepairers must be number."),
    body("storeId")
      .not()
      .isEmpty()
      .withMessage("storeId is required.")
      .isMongoId()
      .withMessage("storeId must be mongoes id."),
    body("timingId")
      .optional()
      .exists()
      .isMongoId()
      .withMessage("timingId must be mongoes id."),
    body("durationInMin")
      .optional()
      .exists()
      .isNumeric()
      .withMessage("durationInMin should be number."),

    body("start")
      .optional()
      .exists()
      // .isISO8601()
      .toDate()
      .withMessage("start is invalid date."),
    body("end")
      .optional()
      .exists()
      // .isISO8601()
      .toDate()
      .withMessage("end is invalid date.")

      .custom((value, { req }) => {
        const endDateDay = new Date(value).getDay();
        const startDateDay = new Date(req.body.start).getDay();
        return endDateDay === startDateDay;
      })
      .withMessage("Start day and end day have to same day in week."),
  ],
  getAll: [
    param("storeId")
      .optional()
      .isMongoId()
      .withMessage("storeId must be mongoose id."),
  ],
};

export default TimingController;

import { NextFunction, Response } from "express";
import { body, param } from "express-validator";
import { Types } from "mongoose";
import { fieldValidateError } from "../helper";
import { TimingSchema } from "../models";
import { AuthRequest } from "../types/core";

class TimingController {
  async createAndUpdate(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);
      const { numberOfRepairers, start, end, storeId, durationInMin } =
        req.body;
      const user = req?.currentUser?._id;
      const dayOfWeekNumber = new Date(start).getDay();
      const subtract = new Date(end).getTime() - new Date(start).getTime();
      const divide = Math.floor(subtract / (durationInMin * 60 * 1000));
      const deleteFirst = await TimingSchema.deleteMany({
        dayOfWeekNumber: dayOfWeekNumber,
      });

      const dateArray = new Array(divide).fill(1).map((item, index) => {
        return {
          store: storeId,
          dayOfWeekNumber: dayOfWeekNumber,
          durationInMin,
          numberOfRepairers,
          start: new Date(
            new Date(start).getTime() + index * (durationInMin * 60 * 1000)
          ),
          end: new Date(
            new Date(start).getTime() +
              (index + 1) * (durationInMin * 60 * 1000)
          ),
        };
      });
      const insertData = await TimingSchema.insertMany(dateArray);

      res.json({
        status: "SUCCESS",
        message: "Timing is created successfully.",
        data: insertData,
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
  async userGetStoreLeftBookingList(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { limit, chunk } = req.query;
      const { storeId } = req.params;
      const { date } = req.body;

      const dayOfWeekNumber = new Date(date || new Date()).getDay();

      const query: any = {};
      dayOfWeekNumber && (query["dayOfWeekNumber"] = dayOfWeekNumber);
      // storeId && (query["store"] = storeId);

      const getAllData = await TimingSchema.aggregate([
        {
          $match: {
            $and: [
              {
                store: new Types.ObjectId(storeId),
              },
              {
                dayOfWeekNumber: dayOfWeekNumber,
              },
            ],
          },
        },
        {
          $addFields: {
            startDateForm: {
              $dateFromParts: {
                year: new Date(date).getFullYear(),
                month: new Date(date).getMonth() + 1,
                day: new Date(date).getDate(),
                hour: {
                  $hour: "$start",
                },
                minute: {
                  $minute: "$start",
                },
              },
            },
            endDateForm: {
              $dateFromParts: {
                year: new Date(date).getFullYear(),
                month: new Date(date).getMonth() + 1,
                day: new Date(date).getDate(),
                hour: {
                  $hour: "$end",
                },
                minute: {
                  $minute: "$end",
                },
              },
            },
          },
        },
        {
          $lookup: {
            from: "orders",
            localField: "store",
            foreignField: "storeID",
            as: "orderHave",
            let: {
              startDate: "$startDateForm",
              endDate: "$endDateForm",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$serviceType", "IN_STOR"],
                      },
                      {
                        $gte: ["$scheduledTime", new Date(date)],
                      },
                      {
                        $eq: [
                          { $dayOfWeek: "$scheduledTime" },
                          dayOfWeekNumber + 1,
                        ],
                      },

                      {
                        $gte: ["$scheduledTime", "$$startDate"],
                      },
                      {
                        $lte: ["$scheduledTime", "$$endDate"],
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
        {
          $addFields: {
            orderHave: {
              $size: "$orderHave",
            },
            leftBooking: {
              $subtract: [
                "$numberOfRepairers",
                {
                  $size: "$orderHave",
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

    body("durationInMin")
      .optional()
      .exists()
      .isNumeric()
      .withMessage("durationInMin should be number."),

    body("start")
      .optional()
      .exists()
      .toDate()
      .withMessage("start is invalid date.")
      .custom((value, { req }) => {
        if (!req.body?.end || !req.body?.durationInMin) return false;
        const end = req?.body?.end;
        const subtract = new Date(end).getTime() - new Date(value).getTime();

        return req.body?.durationInMin * 60 * 1000 < subtract;
      })
      .withMessage("Two date distance is smaller than durationInMin"),
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

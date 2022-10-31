import { Types } from "mongoose";
import { TimingSchema } from "../models";
/*
    "_id": "63551940fca295fa77c55b2d",
            "numberOfRepairers": 4,
            "durationInMin": 30,
            "dayOfWeekNumber": 3,
            "start": "2022-10-19T12:24:08.000Z",
            "startDateForm": "2022-10-19T12:24:00.000Z",
            "endDateForm": "2022-10-19T12:54:00.000Z",
            "orderHave": 0,
            "leftBooking": 4
 */

class TimingLogic {
  async storeBookingCheckInTime(
    storeId: string,
    date: Date
  ): Promise<
    | {
        _id: string;
        numberOfRepairers: number;
        startDateForm: Date;
        endDateForm: Date;
        orderHave: number;
        leftBooking: number;
        store: string;
        durationInMin: number;
        dayOfWeekNumber: number;
      }
    | undefined
  > {
    try {
      const dayOfWeekNumber = new Date(date).getDay();

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
          $match: {
            $expr: {
              $and: [
                {
                  $lte: ["$startDateForm", new Date(date)],
                },
                {
                  $gte: ["$endDateForm", new Date(date)],
                },
              ],
            },
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
        {
          $project: {
            startDateFrom: 1,
            endDateFrom: 1,
            orderHave: 1,
            leftBooking: 1,
            numberOfRepairers: 1,
            durationInMin: 1,
            dayOfWeekNumber: 1,
            store: 1,
          },
        },
      ]);
      return getAllData?.[0] || {};
    } catch (error) {
      throw error;
    }
  }
  /*
    "_id": "63551940fca295fa77c55b2d",
            "numberOfRepairers": 4,
            "durationInMin": 30,
            "dayOfWeekNumber": 3,
            "store": "633e661162ad6ca32d956bcf",
            "startDateForm": "2022-10-19T12:24:00.000Z",
            "endDateForm": "2022-10-19T12:54:00.000Z",
            "orderHave": 0,
            "leftBooking": 4
 */
}

export default TimingLogic;

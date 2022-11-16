import { NextFunction, Response } from "express";
import { StoreModel } from "../models/store.model";
// import { nextTick } from "process";/
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";

export default class StoreDashboardController {
  async monthlyStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      // const currentDateRoot = new Date(
      //     new Date().getFullYear(),
      //     new Date().getMonth(),

      //   );
      const month = new Date().getMonth();
      const currentDateHigh = new Date(
        new Date().getFullYear(),
        month + 1,
        0,
        23,
        59,
        59
      );

      const storeMonthlyJoin = await StoreModel.aggregate([
        {
          $addFields: {
            startDay: new Date(currentDateHigh),
            endDay: {
              $dateSubtract: {
                startDate: new Date(currentDateHigh),
                unit: "month",
                amount: 12,
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
          $group: {
            _id: {
              $month: "$createdAt",
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            monthNumber: "$_id",
            count: 1,
            _id: 0,
          },
        },
        {
          $group: {
            _id: null,
            stores: { $push: "$$ROOT" },
          },
        },
        {
          $addFields: {
            monthsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          },
        },
        {
          $project: {
            _id: 0,

            count: 1,
            store: {
              $map: {
                input: "$monthsArray",
                as: "monthNumber",
                in: {
                  $cond: [
                    {
                      $gte: [
                        {
                          $size: {
                            $filter: {
                              input: "$stores",
                              as: "store",
                              cond: {
                                $eq: ["$$store.monthNumber", "$$monthNumber"],
                              },
                            },
                          },
                        },
                        1,
                      ],
                    },
                    {
                      $arrayElemAt: [
                        {
                          $map: {
                            input: {
                              $filter: {
                                input: "$stores",
                                as: "store",
                                cond: {
                                  $eq: ["$$store.monthNumber", "$$monthNumber"],
                                },
                              },
                            },
                            as: "storeData",
                            in: { $trunc: "$$storeData.count" },
                          },
                        },
                        0,
                      ],
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
        // MANAGER COUNT
        {
          $lookup: {
            from: "users",
            as: "users",
            pipeline: [
              // MANAGER PIPELINE
              {
                $match: {
                  role: "MANAGER",
                },
              },

              {
                $addFields: {
                  startDay: new Date(currentDateHigh),
                  endDay: {
                    $dateSubtract: {
                      startDate: new Date(currentDateHigh),
                      unit: "month",
                      amount: 12,
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
              //
              {
                $group: {
                  _id: {
                    $month: "$createdAt",
                  },
                  count: { $sum: 1 },
                },
              },
              {
                $project: {
                  monthNumber: "$_id",
                  count: 1,
                  _id: 0,
                },
              },
              {
                $group: {
                  _id: null,
                  managers: { $push: "$$ROOT" },
                },
              },
              {
                $addFields: {
                  monthsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                },
              },
              {
                $project: {
                  _id: 0,

                  count: 1,
                  manager: {
                    $map: {
                      input: "$monthsArray",
                      as: "monthNumber",
                      in: {
                        $cond: [
                          {
                            $gte: [
                              {
                                $size: {
                                  $filter: {
                                    input: "$managers",
                                    as: "manager",
                                    cond: {
                                      $eq: [
                                        "$$manager.monthNumber",
                                        "$$monthNumber",
                                      ],
                                    },
                                  },
                                },
                              },
                              1,
                            ],
                          },
                          {
                            $arrayElemAt: [
                              {
                                $map: {
                                  input: {
                                    $filter: {
                                      input: "$managers",
                                      as: "manager",
                                      cond: {
                                        $eq: [
                                          "$$manager.monthNumber",
                                          "$$monthNumber",
                                        ],
                                      },
                                    },
                                  },
                                  as: "managerData",
                                  in: { $trunc: "$$managerData.count" },
                                },
                              },
                              0,
                            ],
                          },
                          0,
                        ],
                      },
                    },
                  },
                },
              },
              //   MANAGER PIPELINE END
            ],
          },
        },
        {
          $unwind: {
            path: "$users",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            store: 1,
            manager: "$users.manager",
          },
        },
      ]);

      //   ========================>>> if stores are empty <<<<<<<< ============

      const managerData = storeMonthlyJoin?.length
        ? storeMonthlyJoin
        : await UserModel.aggregate([
            {
              $match: {
                role: "MANAGER",
              },
            },
            {
              $addFields: {
                startDay: new Date(currentDateHigh),
                endDay: {
                  $dateSubtract: {
                    startDate: new Date(currentDateHigh),
                    unit: "month",
                    amount: 12,
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
            //
            {
              $group: {
                _id: {
                  $month: "$createdAt",
                },
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                monthNumber: "$_id",
                count: 1,
                _id: 0,
              },
            },
            {
              $group: {
                _id: null,
                managers: { $push: "$$ROOT" },
              },
            },
            {
              $addFields: {
                monthsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              },
            },
            {
              $project: {
                _id: 0,

                count: 1,
                manager: {
                  $map: {
                    input: "$monthsArray",
                    as: "monthNumber",
                    in: {
                      $cond: [
                        {
                          $gte: [
                            {
                              $size: {
                                $filter: {
                                  input: "$managers",
                                  as: "manager",
                                  cond: {
                                    $eq: [
                                      "$$manager.monthNumber",
                                      "$$monthNumber",
                                    ],
                                  },
                                },
                              },
                            },
                            1,
                          ],
                        },
                        {
                          $arrayElemAt: [
                            {
                              $map: {
                                input: {
                                  $filter: {
                                    input: "$managers",
                                    as: "manager",
                                    cond: {
                                      $eq: [
                                        "$$manager.monthNumber",
                                        "$$monthNumber",
                                      ],
                                    },
                                  },
                                },
                                as: "managerData",
                                in: { $trunc: "$$managerData.count" },
                              },
                            },
                            0,
                          ],
                        },
                        0,
                      ],
                    },
                  },
                },
              },
            },
          ]);

      res.json({
        status: "SUCCESS",
        message: "Store data get successfully.",
        data: managerData,
      });
    } catch (error) {
      next(error);
    }
  }
}

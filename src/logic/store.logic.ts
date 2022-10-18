import { Types } from "mongoose";
import paginationHelper from "../helper/pagination.helper";
import { StoreModel } from "../models/store.model";
import { UserModel } from "../models/user.model";
import MediaLogic from "./media.logic";

class StoreLogic extends MediaLogic {
  private _storeId: string | undefined;
  constructor(Id?: string) {
    super();
    this._storeId = Id;
  }
  /**
   * get all stores managers
   */
  public async getAllStoresManagers({
    Id,
    chunk,
    limit,
  }: {
    Id?: string;
    chunk?: number;
    limit?: number;
  }): Promise<any> {
    const managersData = await paginationHelper({
      model: UserModel,
      query: {
        store: Id || this._storeId,
        role: "MANAGER",
      },
      chunk,
      limit,
      select: "-encrypted_password -salt -refreshTokens -verificationInfo",
    });
    return managersData;
  }

  async getAllStoreByStoreIn({
    date,
    services,
  }: {
    date: Date;
    services: any[];
  }) {
    const getDayOfWeek = new Date(date).getDay();
    const objectFormatSetArray = services?.map(
      (item) => new Types.ObjectId(item)
    );
    try {
      const getStoreData = await StoreModel.aggregate([
        {
          $lookup: {
            from: "serviceprices",
            localField: "_id",
            foreignField: "store",
            as: "storeService",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$_id", objectFormatSetArray],
                  },
                },
              },
            ],
          },
        },
        {
          $match: {
            $expr: {
              $cond: [
                {
                  $eq: [
                    { $size: "$storeService" },
                    objectFormatSetArray.length,
                  ],
                },
                true,
                false,
              ],
            },
          },
        },

        {
          $lookup: {
            from: "timings",
            localField: "_id",
            foreignField: "store",
            as: "timing",
            let: { currentDayOfWeek: getDayOfWeek },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$$currentDayOfWeek", "$dayOfWeekNumber"],
                  },
                },
              },
            ],
          },
        },
        {
          $addFields: {
            bookingDay: {
              $dayOfMonth: new Date(date),
            },
            bookingMonth: {
              $month: new Date(date),
            },
            bookingYear: {
              $year: new Date(date),
            },
          },
        },
        {
          $lookup: {
            from: "holidays",
            localField: "_id",
            foreignField: "store",
            as: "holidays",
            let: {
              day: "$bookingDay",
              month: "$bookingMonth",
              year: "$bookingYear",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: [
                          {
                            $dayOfMonth: "$date",
                          },
                          "$$day",
                        ],
                      },
                      {
                        $eq: [
                          {
                            $month: "$date",
                          },
                          "$$month",
                        ],
                      },
                      {
                        $eq: [
                          {
                            $year: "$date",
                          },
                          "$$year",
                        ],
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
              $gte: [{ $size: "$holidays" }, 1],
            },
          },
        },
      ]);
      return getStoreData;
    } catch (error) {
      throw error;
    }
  }
}

export default StoreLogic;

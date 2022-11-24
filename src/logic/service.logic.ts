import { Types } from "mongoose";
import { ServicePriceModel } from "../models";

export default class ServiceLogic {
  /**
   * Services logic
   *
   * @param  Props{ servicePriceId: string[]}
   * @return Promise<{mrpPrice:number,salePrice:number}>
   * 'mrpPrice' : It is sum of
   * 'salePrice' : It is the sum of the sale price
   */
  getPriceBYServiceId({
    servicePriceId,
  }: {
    servicePriceId: string[];
  }): Promise<{
    mrpPrice: number;
    salePrice: number;
    allService: any[];
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const getServices = await ServicePriceModel.aggregate([
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $in: [
                      "$_id",
                      servicePriceId?.map((item) => new Types.ObjectId(item)),
                    ],
                  },
                ],
              },
            },
          },
          {
            $addFields: {
              servicePrices: servicePriceId,
            },
          },
          {
            $group: {
              _id: null,
              allData: { $push: "$$ROOT" },
              servicePrices: { $first: "$servicePrices" },
            },
          },
          {
            $addFields: {
              servicePrices: {
                $map: {
                  input: "$servicePrices",
                  as: "service",
                  in: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$allData",
                          as: "serviceId",
                          cond: {
                            $eq: [
                              "$$serviceId._id",
                              { $toObjectId: "$$service" },
                            ],
                          },
                        },
                      },
                      0,
                    ],
                  },
                },
              },
            },
          },

          {
            $unwind: {
              path: "$servicePrices",
              preserveNullAndEmptyArrays: false,
            },
          },
          {
            $lookup: {
              from: "services",
              localField: "servicePrices.service",
              foreignField: "_id",
              as: "servicePrices.service",
              pipeline: [
                {
                  $project: {
                    title: 1,
                    description: 1,
                    image: 1,
                  },
                },
              ],
            },
          },
          {
            $unwind: {
              path: "$servicePrices.service",
              preserveNullAndEmptyArrays: false,
            },
          },

          {
            $project: {
              service: "$servicePrices.service",
              mrp: "$servicePrices.mrp",
              salePrice: "$servicePrices.salePrice",
              isInStock: "$servicePrices.isInStock",
              store: "$servicePrices.store",
              type: "$servicePrices.type",
              isMostPopular: "$servicePrices.isMostPopular",
            },
          },
        ]);
        if (!getServices.length)
          throw new Error("No service found for this model.");

        const servicePrice = getServices?.reduce(
          (acc, element) => {
            acc.mrpPrice = acc.mrpPrice + element?.mrp || 0;
            acc.salePrice = acc.salePrice + element?.salePrice || 0;
            return acc;
          },
          {
            mrpPrice: 0,
            salePrice: 0,
          }
        );

        return resolve({
          ...servicePrice,
          allService: getServices,
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

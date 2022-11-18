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
            $group: {
              _id: null,
              mrp: { $sum: "$servicePrices.mrp" },
              salePrice: { $sum: "$servicePrices.salePrice" },
            },
          },
        ]);
        if (!getServices.length)
          throw new Error("No service found for this model.");

        return resolve({
          mrpPrice: getServices?.[0]?.mrp || 0,
          salePrice: getServices?.[0]?.salePrice || 0,
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

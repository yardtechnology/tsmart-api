import { Types } from "mongoose";
import { ServicePriceModel } from "../models";

class ServiceLogic {
  /**
   * Services logic
   *
   * @param  Props{modelId?: string, serviceIds: string[]}
   * @return Promise<{mrpPrice:number,salePrice:number}>
   * 'mrpPrice' : It is sum of
   * 'salePrice' : It is the sum of the sale price
   */
  getPriceBYServiceId({
    modelId,
    serviceIds,
  }: {
    serviceIds: string[];
    modelId: string;
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
                      "$service",
                      serviceIds.map((item) => new Types.ObjectId(item)),
                    ],
                  },
                  {
                    $eq: ["$model", new Types.ObjectId(modelId)],
                  },
                ],
              },
            },
          },
          {
            $group: {
              _id: "$service",
              mrp: { $sum: "$mrp" },
              salePrice: { $sum: "$salePrice" },
            },
          },
        ]);
        if (!getServices.length)
          throw new Error("No service found for this model.");

        return resolve({
          mrpPrice: getServices?.[0]?.mrp || 0,
          salePrice: getServices?.[1]?.salePrice || 0,
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default ServiceLogic;

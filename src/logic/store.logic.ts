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
      ]);
      return getStoreData;
    } catch (error) {
      throw error;
    }
  }
}

export default StoreLogic;

import paginationHelper, {
  PaginationResult,
} from "../helper/pagination.helper";
import { HolidayModel } from "../models/holiday.model";
import HolidayType from "../types/holiday";

class HolidayLogic {
  /**
   * add to Holiday
   * @param Props { date:string,storeId:string,title: string, description: string }
   * @returns Promise<HolidayType>
   */
  public add(Props: {
    date: string;
    storeId: string;
    title: string;
    description: string;
  }): Promise<HolidayType> {
    return new Promise<HolidayType>(async (resolve, reject) => {
      try {
        const HolidayData: HolidayType | null = await new HolidayModel({
          date: Props.date,
          storeId: Props.storeId,
          title: Props.title,
          description: Props.description,
        }).save();
        resolve(HolidayData);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * add to Holiday
   * @param Props { HolidayId: string, date:string,storeId:string,title: string, description: string }
   * @returns Promise<HolidayType>
   */
  public update(Props: {
    HolidayId: string;
    date: string;
    storeId: string;
    title?: string;
    description?: string;
  }): Promise<HolidayType | null> {
    return new Promise<HolidayType | null>(async (resolve, reject) => {
      try {
        const HolidayData: HolidayType | null =
          await HolidayModel.findByIdAndUpdate(Props?.HolidayId, {
            date: Props.date,
            store: Props?.storeId,
            title: Props.title,
            description: Props.description,
          });
        resolve(HolidayData);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * remove from Holiday
   * @param {string} HolidayId
   * @returns Promise<HolidayType>
   */
  public remove(HolidayId: string): Promise<HolidayType> {
    return new Promise<HolidayType>(async (resolve, reject) => {
      try {
        const Holiday = await HolidayModel.findByIdAndDelete(HolidayId);
        if (!Holiday) throw new Error("Holiday not found");
        resolve(Holiday);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * get one users Holiday
   */
  public getAll({
    limit,
    chunk,
  }: {
    limit?: number;
    chunk?: number;
  }): Promise<PaginationResult<HolidayType>> {
    return new Promise(async (resolve, reject) => {
      try {
        const Holiday = await paginationHelper<HolidayType>({
          model: HolidayModel,
          query: {},
          limit,
          chunk,
          sort: { createdAt: -1 },
        });
        if (!Holiday) throw new Error("Holiday not found");
        resolve(Holiday);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default HolidayLogic;

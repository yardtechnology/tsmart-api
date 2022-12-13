import { Model } from "mongoose";
type PAGINATION_FIND_TYPE = {
  model: Model<any>;
  query: any;
  chunk: any;
  limit: any;
  sort?: any;
  populate?: any;
  select?: any;
};
type PAGINATION_AGGREGATION_TYPE = {
  model: Model<any>;
  query: any[];
  position?: number;
  chunk?: any;
  limit?: any;
  sort?: any;
};

export type PaginationResult<T> = {
  data: T[];
  isLastChunk: boolean;
};

export async function aggregationData<T>({
  model,
  query,
  position,
  sort,
  limit,
  chunk,
}: PAGINATION_AGGREGATION_TYPE): Promise<PaginationResult<T>> {
  try {
    const limitSkipArgs: any[] = [];
    sort && limitSkipArgs.push({ $sort: sort });
    if (limit && chunk && typeof position === "number") {
      const skip =
        chunk || limit ? Number(limit) * (Number(chunk) - 1) : undefined;
      const limitData = chunk || limit ? Number(limit) + 1 : undefined;
      typeof skip === "number" &&
        limitSkipArgs.push({
          $skip: skip,
        });
      typeof limit === "number" &&
        limitSkipArgs.push({
          $limit: limitData,
        });

      query.splice(position, 0, limitSkipArgs);
      const compArgs = query.flat();

      const dataGet = await model.aggregate(compArgs);

      const isLastChunk = Boolean(dataGet.length === Number(limitData));
      if (isLastChunk) dataGet.pop();
      return {
        data: dataGet,
        isLastChunk: !isLastChunk,
      };
    } else {
      const dataGet = await model.aggregate([...query, ...limitSkipArgs]);
      return {
        data: dataGet,
        isLastChunk: false,
      };
    }
  } catch (error) {
    throw error;
  }
}

export default <T>({
  model,
  query,
  chunk,
  limit,
  sort,
  populate,
  select,
}: PAGINATION_FIND_TYPE): Promise<PaginationResult<T>> =>
  new Promise(async (resolve, reject) => {
    try {
      const requiredData: T[] = await model
        .find(query)
        .sort(sort)
        .skip(Number(chunk || 0) * Number(limit))
        .limit(Number(limit) + 1)
        .populate(populate)
        .select(select);
      const totalLength = requiredData.length;
      if (totalLength > Number(limit)) requiredData.pop();
      resolve({
        data: requiredData,
        isLastChunk: !(totalLength > Number(limit)),
      });
    } catch (error) {
      reject(error);
    }
  });

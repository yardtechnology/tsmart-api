import { Model } from "mongoose";
type Pagination = {
  model: Model<any>;
  query: any;
  chunk: any;
  limit: any;
  sort?: any;
  populate?: any;
  select?: any;
};

export type PaginationResult<T> = {
  data: T[];
  isLastChunk: boolean;
};

export default <T>({
  model,
  query,
  chunk,
  limit,
  sort,
  populate,
  select,
}: Pagination): Promise<PaginationResult<T>> =>
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

import { EvaluationPriceSchema, SalePriceModel } from "../models";

class EvaluationLogic {
  /**
   * Device evaluation fn
   * @param  Props{evaluationPriceIds?: string[], modelId: string, colorId: string, memoryId: string}
   * @return Promise<{deductedPrice:number,estimatePrice:number, evaluatePrice:number}>
   * 'finalPrice' : it is the final price of the device
   * 'evaluatePrice' : it is the price, which amount deduct from the original price from the device
   */
  deviceEvaluation({
    evaluationPriceIds,
    modelId,
    colorId,
    memoryId,
  }: {
    evaluationPriceIds?: string[];
    modelId: string;
    colorId: string;
    memoryId: string;
  }): Promise<{
    estimatePrice: number;
    evaluatePrice: number;
    deductedPrice: number;
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const evaluationPriceFind = evaluationPriceIds?.length
          ? await EvaluationPriceSchema.find({
              _id: { $in: evaluationPriceIds },
            })
          : [];
        if (evaluationPriceIds?.length && !evaluationPriceFind.length)
          throw new Error("Evaluation price id are error.");
        const deductedPrice = evaluationPriceFind.reduce((ac, ele) => {
          return ac + ele.price;
        }, 0);
        const sellPriceFind = await SalePriceModel.findOne({
          model: modelId,
          color: colorId,
          memory: memoryId,
        }).select("price");
        if (!sellPriceFind)
          throw new Error("Sale price of this model is not found.");
        const evaluatePrice = sellPriceFind?.price - deductedPrice;

        return resolve({
          deductedPrice: deductedPrice,
          estimatePrice: sellPriceFind.price,
          evaluatePrice,
          // evaluationPriceFind,
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  sellSummery({
    evaluationPriceIds,
    sellPriceId,
  }: {
    evaluationPriceIds?: string[];
    sellPriceId: string;
  }): Promise<{
    estimatePrice: number;
    evaluatePrice: number;
    deductedPrice: number;
    evaluationPriceFind: any[];
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const evaluationPriceFind = evaluationPriceIds?.length
          ? await EvaluationPriceSchema.find({
              _id: { $in: evaluationPriceIds },
            })
          : [];
        if (evaluationPriceIds?.length && !evaluationPriceFind.length)
          throw new Error("Evaluation price id are error.");
        const deductedPrice = evaluationPriceFind.reduce((ac, ele) => {
          return ac + ele.price;
        }, 0);
        const sellPriceFind = await SalePriceModel.findById(sellPriceId).select(
          "price"
        );
        if (!sellPriceFind)
          throw new Error("Sale price of this model is not found.");
        const evaluatePrice = sellPriceFind?.price - deductedPrice;

        return resolve({
          deductedPrice: deductedPrice,
          estimatePrice: sellPriceFind.price,
          evaluatePrice,
          evaluationPriceFind,
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default EvaluationLogic;

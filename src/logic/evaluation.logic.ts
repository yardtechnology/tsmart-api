import { EvaluationPriceSchema, SalePriceModel } from "../models";

class EvaluationLogic {
  /**
   * Device evaluation fn
   * @param  Props{evaluationPriceIds?: string[], modelId: string, colorId: string, memoryId: string}
   * @return Promise<{finalPrice:number,evaluatePrice:number}>
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
  }): Promise<{ finalPrice: number; evaluatePrice: number }> {
    return new Promise<{ finalPrice: number; evaluatePrice: number }>(
      async (resolve, reject) => {
        try {
          const evaluationPriceFind = evaluationPriceIds?.length
            ? await EvaluationPriceSchema.find({
                _id: { $in: evaluationPriceIds },
              }).select("price")
            : [];
          if (evaluationPriceIds?.length && !evaluationPriceFind.length)
            throw new Error("Evaluation price id are error.");
          const evaluatePrice = evaluationPriceFind.reduce((ac, ele) => {
            return ac + ele.price;
          }, 0);
          const sellPriceFind = await SalePriceModel.findOne({
            model: modelId,
            color: colorId,
            memory: memoryId,
          }).select("price");
          if (!sellPriceFind)
            throw new Error("Sale price of this model is not found.");
          const finalPrice = sellPriceFind?.price - evaluatePrice;

          return resolve({
            finalPrice,
            evaluatePrice,
          });
        } catch (error) {
          return reject(error);
        }
      }
    );
  }
}

export default EvaluationLogic;

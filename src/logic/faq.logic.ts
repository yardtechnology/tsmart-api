import paginationHelper, {
  PaginationResult,
} from "../helper/pagination.helper";
import { FAQModel } from "../models/faq.model";
import FAQType from "../types/faq";

class FAQLogic {
  /**
   * add to FAQ
   * @param Props { question: string, answer: string }
   * @returns Promise<FAQType>
   */
  public add(Props: { question: string; answer: string }): Promise<FAQType> {
    return new Promise<FAQType>(async (resolve, reject) => {
      try {
        const FAQData: FAQType | null = await new FAQModel({
          question: Props.question,
          answer: Props.answer,
        }).save();
        resolve(FAQData);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * add to FAQ
   * @param Props { FAQId: string, question: string, answer: string }
   * @returns Promise<FAQType>
   */
  public update(Props: {
    FAQId: string;
    question?: string;
    answer?: string;
  }): Promise<FAQType | null> {
    return new Promise<FAQType | null>(async (resolve, reject) => {
      try {
        const FAQData: FAQType | null = await FAQModel.findByIdAndUpdate(
          Props?.FAQId,
          {
            question: Props.question,
            answer: Props.answer,
          }
        );
        resolve(FAQData);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * remove from FAQ
   * @param {string} FAQId
   * @returns Promise<FAQType>
   */
  public remove(FAQId: string): Promise<FAQType> {
    return new Promise<FAQType>(async (resolve, reject) => {
      try {
        const FAQ = await FAQModel.findByIdAndDelete(FAQId);
        if (!FAQ) throw new Error("FAQ not found");
        resolve(FAQ);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * get one users FAQ
   */
  public getAll({
    limit,
    chunk,
  }: {
    limit?: number;
    chunk?: number;
  }): Promise<PaginationResult<FAQType>> {
    return new Promise(async (resolve, reject) => {
      try {
        const FAQ = await paginationHelper<FAQType>({
          model: FAQModel,
          query: {},
          limit,
          chunk,
          sort: { createdAt: -1 },
        });
        if (!FAQ) throw new Error("FAQ not found");
        resolve(FAQ);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default FAQLogic;

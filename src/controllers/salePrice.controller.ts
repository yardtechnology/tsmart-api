import { NextFunction, Response } from "express";
import { body, param, query } from "express-validator";
import { NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import EvaluationLogic from "../logic/evaluation.logic";
import { SalePriceModel } from "../models";
import { AuthRequest } from "../types/core";

class SalePriceController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);
      const { price, modelId, memoryId, colorId } = req.body;
      const createAndUpdateSalePrice = await SalePriceModel.create({
        model: modelId,
        price,
        memory: memoryId,
        color: colorId,
      });
      if (!createAndUpdateSalePrice)
        throw new NotFound(
          `Something went wrong, data not saved. Please try again`
        );
      res.json({
        status: "SUCCESS",
        message: "SalePrice created successfully.",
        data: createAndUpdateSalePrice,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);
      const { modelId } = req.params;

      const { limit, chunk, colorId, memoryId, salePriceId } = req.query;

      const query: any = {
        model: modelId,
      };
      salePriceId && (query["_id"] = salePriceId);
      colorId && (query["color"] = colorId);
      memoryId && (query["memory"] = memoryId);

      const getAllData = await paginationHelper({
        model: SalePriceModel,
        query,
        chunk: chunk ? Number(chunk) : undefined,
        limit: limit ? Number(limit) : undefined,
        select: "",
        populate: [
          {
            path: "color",
          },
          {
            path: "memory",
          },
          {
            path: "model",
          },
        ],
        sort: {
          createdAt: -1,
        },
      });
      res.json({
        status: "SUCCESS",
        message:
          getAllData?.data?.length === 1
            ? `SalePrice found successfully`
            : "All SalePrices found successfully.",
        data: salePriceId ? getAllData?.data?.[0] : getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { _id } = req.params;
      fieldValidateError(req);
      const deleteSalePrice = await SalePriceModel.findByIdAndDelete(_id);
      if (!deleteSalePrice)
        throw new NotFound("No data found for delete request.");
      res.json({
        status: "SUCCESS",
        message: "SalePrice deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
  async saleSummery(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { evaluationPriceIds, sellPriceId } = req.body;
      fieldValidateError(req);
      const saleSummery = await new EvaluationLogic().sellSummery({
        evaluationPriceIds,
        sellPriceId,
      });
      res.json({
        status: "SUCCESS",
        message: "SalePrice summery get successfully.",
        data: saleSummery,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const SalePriceControllerValidation = {
  createAndUpdate: [
    body("modelId")
      .not()
      .isEmpty()
      .withMessage("modelId is required.")
      .isMongoId()
      .withMessage("modelId must be a valid MongoDB ObjectId."),
    body("memoryId")
      .isMongoId()
      .withMessage("memoryId must be a valid MongoDB ObjectId."),
    body("colorId")
      .isMongoId()
      .withMessage("colorId must be a valid MongoDB ObjectId."),
    body("price")
      .optional()
      .exists()
      .isNumeric()
      .withMessage("price must be number"),
  ],
  delete: [
    param("_id")
      .not()
      .isEmpty()
      .withMessage("_id is required.")
      .isMongoId()
      .withMessage("_id most be mongoose id"),
  ],
  getAll: [
    query("colorId")
      .optional()
      .exists()
      .isMongoId()
      .withMessage("colorId most be mongoose id."),
    query("memoryId")
      .optional()
      .exists()
      .isMongoId()
      .withMessage("memoryId most be mongoose id."),
    query("salePriceId")
      .optional()
      .exists()
      .isMongoId()
      .withMessage("salePriceId most be mongoose id."),
    param("modelId")
      .not()
      .isEmpty()
      .withMessage("modelId must be required")
      .isMongoId()
      .withMessage("salePriceId most be mongoose id."),
  ],
  saleSummery: [
    body("evaluationPriceIds.*")
      .optional()
      .exists()
      .isMongoId()
      .withMessage("evaluationPriceIds most be mongooseId."),
    body("sellPriceId")
      .not()
      .isEmpty()
      .withMessage("sellPriceId is required.")
      .isMongoId()
      .withMessage("sellPriceId most be mongoose id."),
  ],
};

export default SalePriceController;

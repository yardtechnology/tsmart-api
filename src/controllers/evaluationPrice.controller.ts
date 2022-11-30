import { NextFunction, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { BadRequest, InternalServerError, NotFound } from "http-errors";
import paginationHelper from "../helper/pagination.helper";
import { EvaluationPriceSchema } from "../models";
import { AuthRequest } from "../types/core";

class EvaluationPriceController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new BadRequest(
          errors
            .array()
            .map((errors) => errors.msg)
            .join()
            .replace(/[,]/g, " and ")
        );
      }
      const { price, evaluationId, modelId } = req.body;

      const evaluationCreate = await EvaluationPriceSchema.create({
        price: +price,
        evaluation: evaluationId,
        model: modelId,
      });
      if (!evaluationCreate)
        throw new InternalServerError(
          "Something went wrong, Evaluation price  is not created."
        );
      res.json({
        status: "SUCCESS",
        message: "Evaluation price created successfully.",
        data: evaluationCreate,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { evaluationPriceId } = req.params;
      const { evaluationId, modelId, price } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new BadRequest(
          errors
            .array()
            .map((errors) => errors.msg)
            .join()
            .replace(/[,]/g, " and ")
        );
      }

      const arg: any = {};
      evaluationId && (arg.evaluation = evaluationId);
      modelId && (arg.model = modelId);
      price >= 0 && (arg.price = price);

      const updateEvaluationPrice =
        await EvaluationPriceSchema.findByIdAndUpdate(evaluationPriceId, arg, {
          runValidators: true,
        });
      if (!updateEvaluationPrice)
        throw new InternalServerError(
          "Something went wrong, Evaluation price is not updated."
        );

      res.json({
        status: "SUCCESS",
        message: "Evaluation price updated successfully",
        data: updateEvaluationPrice,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { limit, chunk, modelId, evaluationId, evaluationPriceId } =
        req.query;
      const query: any = {};
      modelId && (query.model = modelId);
      evaluationId && (query.evaluation = evaluationId);
      evaluationPriceId && (query._id = evaluationPriceId);
      const getAllData = await paginationHelper({
        model: EvaluationPriceSchema,
        query,
        chunk: chunk ? Number(chunk) : undefined,
        limit: limit ? Number(limit) : undefined,
        populate: [
          {
            path: "evaluation",
            select: "image title description",
          },
          {
            path: "model",
            select: "-imagePATH -device",
          },
        ],
        select: "",
        sort: {
          createdAt: -1,
        },
      });
      res.status(200).json({
        status: "SUCCESS",
        message: evaluationPriceId
          ? "Evaluation price found successfully."
          : "All evaluation price found successfully.",
        data: evaluationPriceId ? getAllData?.data?.[0] : getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteData(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { evaluationPriceId } = req.params;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new BadRequest(
          errors
            .array()
            .map((errors) => errors.msg)
            .join()
            .replace(/[,]/g, " and ")
        );
      }
      const evaluationPriceDataDeleted =
        await EvaluationPriceSchema.findByIdAndDelete(evaluationPriceId);
      if (!evaluationPriceDataDeleted)
        throw new NotFound("Evaluation price not found.");

      res.json({
        status: "SUCCESS",
        message: "Evaluation price deleted successfully.",
        data: evaluationPriceDataDeleted,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const EvaluationPriceControllerValidation = {
  create: [
    body("price")
      .not()
      .isEmpty()
      .withMessage("price is required.")
      .isInt()
      .withMessage("Price must be number."),
    body("evaluationId")
      .not()
      .isEmpty()
      .withMessage("evaluationId is required."),
    body("modelId").not().isEmpty().withMessage("moduleId is required."),
  ],
  delete: [
    param("evaluationPriceId")
      .not()
      .isEmpty()
      .withMessage("evaluationPriceId is required."),
  ],
  update: [
    param("evaluationPriceId")
      .not()
      .isEmpty()
      .withMessage("evaluationPriceId is required."),
    body("price").optional().isNumeric().withMessage("price must be number."),
    body("evaluationId")
      .optional()
      .isMongoId()
      .withMessage("Need mongoose id."),
    body("modelId").optional().isMongoId().withMessage("Need mongoose id."),
  ],
};

export default EvaluationPriceController;

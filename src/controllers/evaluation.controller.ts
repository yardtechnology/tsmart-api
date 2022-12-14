import { NextFunction, Response } from "express";
import { body, param } from "express-validator";
import { InternalServerError, NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import EvaluationLogic from "../logic/evaluation.logic";
import MediaLogic from "../logic/media.logic";
import { EvaluationPriceSchema, EvaluationSchema } from "../models";
import { AuthRequest } from "../types/core";

class EvaluationController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    let imageData: any | undefined;
    try {
      fieldValidateError(req);
      const { title, description } = req.body;
      const imageFile = req?.files?.image;
      const filePath = `Evaluation`;

      imageData =
        imageFile && !Array.isArray(imageFile)
          ? await new MediaLogic().uploadMedia(imageFile, filePath)
          : undefined;
      const createDevice = await EvaluationSchema.create({
        title,
        description,
        image: imageData?.url,
        imagePATH: imageData?.path,
      });
      if (!createDevice)
        throw new InternalServerError(
          "Something went wrong, Evaluation is not created."
        );
      res.json({
        status: "SUCCESS",
        message: "Evaluation created successfully.",
        data: createDevice,
      });
    } catch (error) {
      if (imageData?.path) {
        new MediaLogic().deleteMedia(imageData?.path);
      }
      next(error);
    }
  }
  async update(req: AuthRequest, res: Response, next: NextFunction) {
    let imageData: any | undefined;
    try {
      const { evaluationId } = req.params;
      const { title, description } = req.body;

      fieldValidateError(req);

      const imageFile = req?.files?.image;
      const filePath = `Evaluation`;

      imageData =
        imageFile && !Array.isArray(imageFile)
          ? await new MediaLogic().uploadMedia(imageFile, filePath)
          : undefined;
      const arg: any = {};
      title && (arg.title = title);
      description && (arg.description = description);
      if (imageData) {
        arg.image = imageData?.url;
        arg.imagePATH = imageData?.path;
      }

      const updateDeviceData = await EvaluationSchema.findByIdAndUpdate(
        evaluationId,
        arg,
        {
          runValidators: true,
        }
      );
      if (!updateDeviceData)
        throw new InternalServerError(
          "Something went wrong, Evaluation is not updated."
        );
      if (arg?.imagePATH && updateDeviceData?.imagePATH) {
        new MediaLogic().deleteMedia(updateDeviceData?.imagePATH);
      }
      res.json({
        status: "SUCCESS",
        message: "Evaluation updated successfully",
        data: updateDeviceData,
      });
    } catch (error) {
      if (imageData?.path) {
        new MediaLogic().deleteMedia(imageData?.path);
      }

      next(error);
    }
  }
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { limit, chunk } = req.query;
      const getAllData = await paginationHelper({
        model: EvaluationSchema,
        query: {},
        chunk: chunk ? Number(chunk) : undefined,
        limit: limit ? Number(limit) : undefined,
        select: "",
        sort: {
          createdAt: -1,
        },
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "All evaluation found successfully.s",
        data: getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { evaluationId } = req.params;
      fieldValidateError(req);
      const deleteEvaluation = await EvaluationSchema.findByIdAndDelete(
        evaluationId
      );
      if (!deleteEvaluation) throw new NotFound("Evaluation not found.");
      //   delete device image
      deleteEvaluation?.imagePATH &&
        new MediaLogic().deleteMedia(deleteEvaluation?.imagePATH);
      await EvaluationPriceSchema.deleteMany({
        evaluation: evaluationId,
      });
      res.json({
        status: "SUCCESS",
        message: "Evaluation deleted successfully",
        data: deleteEvaluation,
      });
    } catch (error) {
      next(error);
    }
  }
  async evaluationPrice(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { evaluationIds, modelId, colorId, memoryId } = req.body;
      const arrayCheck = Array.isArray(evaluationIds)
        ? evaluationIds
        : [evaluationIds];
      const evaluationData = new EvaluationLogic().deviceEvaluation({
        evaluationPriceIds: arrayCheck,
        modelId,
        colorId,
        memoryId,
      });
      res.json({
        status: "SUCCESS",
        message: "Price updated successfully",
        data: evaluationData,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const EvaluationControllerValidation = {
  create: [
    body("title").not().isEmpty().withMessage("title is required."),
    body("description")
      .not()
      .isEmpty()
      .withMessage("description is required.")
      .isLength({ max: 300 })
      .withMessage("description must be at most 300 characters long"),
  ],
  delete: [
    param("evaluationId")
      .not()
      .isEmpty()
      .withMessage("evaluationId is required."),
  ],
  update: [
    param("evaluationId")
      .not()
      .isEmpty()
      .withMessage("evaluationId is required."),
    body("title")
      .optional()
      .isLength({ min: 1 })
      .withMessage("title must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("title must be at most 250 character."),
    body("description")
      .optional()
      .isLength({ min: 1 })
      .withMessage("description must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("description must be at most 250 character."),
  ],
};

export default EvaluationController;

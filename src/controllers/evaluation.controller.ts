import { NextFunction, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { BadRequest, InternalServerError, NotFound } from "http-errors";
import paginationHelper from "../helper/pagination.helper";
import MediaLogic from "../logic/media.logic";
import { EvaluationSchema } from "../models";
import { AuthRequest } from "../types/core";

class EvaluationController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    let imageData: any | undefined;
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
  async deleteData(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { evaluationId } = req.params;
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
      const deleteEvaluation = await EvaluationSchema.findByIdAndDelete(
        evaluationId
      );
      if (!deleteEvaluation) throw new NotFound("Evaluation not found.");
      //   delete device image
      deleteEvaluation?.imagePATH &&
        new MediaLogic().deleteMedia(deleteEvaluation?.imagePATH);

      res.json({
        status: "SUCCESS",
        message: "Evaluation deleted successfully",
        data: deleteEvaluation,
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

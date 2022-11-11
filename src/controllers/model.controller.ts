import { NextFunction, Response } from "express";
import { body, param, query } from "express-validator";
import { NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import MediaLogic from "../logic/media.logic";
import { ModelModel } from "../models/model.model";
import { AuthRequest } from "../types/core";
import ModelType from "../types/model";

class ModelController extends MediaLogic {
  // create model
  public async createAndUpdate(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      fieldValidateError(req);
      const { type } = req.body;
      // upload model picture
      const imageFile = req.files?.image;
      const filePath = `${req.currentUser?._id}`;
      const imageData: any | undefined =
        imageFile && !Array.isArray(imageFile)
          ? await super.uploadMedia(imageFile, filePath)
          : undefined;

      // save model data to database
      const modelData: ModelType = await ModelModel.findOneAndUpdate(
        {
          title: req.body?.title,
        },
        {
          description: req.body?.description,
          image: imageData?.url,
          imagePath: imageData?.path,
          device: req.body?.deviceId,
          make: req.body?.makeId,
          $addToSet: { type: type },
        },
        {
          new: true,
          runValidators: true,
          upsert: true,
        }
      );
      if (!modelData)
        throw new NotFound(
          `You are already added on ${type}, You can not add again here.`
        );

      // send response to client
      res.json({
        status: "SUCCESS",
        message: "Model added successfully",
        data: modelData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  async removeServiceType(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { modelId } = req.params;
      const { type } = req.body;
      fieldValidateError(req);
      const removeServiceType = await ModelModel.findOneAndUpdate(
        { _id: modelId, type },
        {
          $pull: {
            type: type.toUpperCase(),
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!removeServiceType)
        throw new NotFound("No data found for remove type");
      if (!removeServiceType?.type?.length) {
        const deleteMake = await ModelModel.findByIdAndDelete(modelId);
      }
      res.json({
        status: "SUCCESS",
        message: "Remove type successfully.",
        data: removeServiceType,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      // const getAllData = await ModelModel.find();
      // for (const iterator of getAllData) {
      //   const updateData = await ModelModel.findByIdAndUpdate(iterator._id, {
      //     title: iterator.title?.toUpperCase(),
      //   });
      // }

      // res.json({ data: "data" });

      const { limit, chunk, modelId, type } = req.query;
      fieldValidateError(req);
      const query: any = {};
      modelId && (query["_id"] = modelId);
      type && (query["type"] = type);
      const getAllData = await paginationHelper({
        model: ModelModel,
        query,
        chunk: chunk ? Number(chunk) : undefined,
        limit: limit ? Number(limit) : undefined,
        select: "",
        populate: [
          {
            path: "device",
            select: "-imagePATH",
          },
          {
            path: "make",
            select: "-imagePATH -devices",
          },
        ],
        sort: {
          createdAt: -1,
        },
      });
      res.status(200).json({
        status: "SUCCESS",
        message: modelId
          ? "model found successfully."
          : "All model found successfully.",
        data: modelId ? getAllData?.data?.[0] : getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
}

// finds validators for the user creation request
export const ModelControllerValidation = {
  createAndUpdate: [
    body("title")
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long")
      .isLength({ max: 300 })
      .withMessage("Title must be at most 300 characters long")
      .trim()
      .toUpperCase(),
    body("description")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long")
      .isLength({ max: 51 })
      .withMessage("Description must be at most 51 characters long")
      .trim(),

    body("deviceId")
      .optional()
      .isMongoId()
      .withMessage("deviceId must be a mongos id."),
    body("makeId")
      .optional()
      .isMongoId()
      .withMessage("makeId must be a mongos id."),
    body("type")
      .optional()
      .exists()
      .withMessage("type is not formatted.")
      .exists()
      .toUpperCase()
      .custom((value) =>
        Boolean(["SERVICE", "SELL"].includes(value?.toString()?.toUpperCase()))
      )
      .withMessage("type most be SERVICE or SELL."),
  ],

  removeServiceType: [
    param("modelId")
      .not()
      .isEmpty()
      .withMessage("modelId is required.")
      .isMongoId()
      .withMessage("modelId most be mongoose id"),
    body("type")
      .not()
      .isEmpty()
      .withMessage("type must be required.")
      .exists()
      .toUpperCase()
      .custom((value) =>
        Boolean(["SERVICE", "SELL"].includes(value?.toString()?.toUpperCase()))
      )
      .withMessage("type most be SERVICE or SELL."),
  ],
  getAll: [
    query("modelId")
      .optional()
      .exists()
      .isMongoId()
      .withMessage("modelId most be mongoose id."),
    query("type")
      .optional()
      .exists()
      .custom((value) =>
        Boolean(["SERVICE", "SELL"].includes(value?.toString()?.toUpperCase()))
      )
      .withMessage("type most be SERVICE or SELL."),
  ],
};

export default ModelController;

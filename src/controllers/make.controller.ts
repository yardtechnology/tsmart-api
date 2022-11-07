import { NextFunction, Response } from "express";
import { body, param } from "express-validator";
import { NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import MediaLogic from "../logic/media.logic";
import { MakeSchema } from "../models";
import { AuthRequest } from "../types/core";

class MakeController {
  async createAndUpdate(req: AuthRequest, res: Response, next: NextFunction) {
    let imageData: any | undefined;
    try {
      fieldValidateError(req);
      const { title, deviceId, type } = req.body;
      const imageFile = req?.files?.image;
      const filePath = `Make`;

      imageData =
        imageFile && !Array.isArray(imageFile)
          ? await new MediaLogic().uploadMedia(imageFile, filePath)
          : undefined;

      const createDevice = await MakeSchema.findOneAndUpdate(
        {
          title,
          type: { $ne: type.toUpperCase() },
        },
        {
          image: imageData?.url,
          imagePATH: imageData?.path,
          devices: deviceId ? [deviceId] : undefined,

          $addToSet: { type: type.toUpperCase() },
        },
        { new: true, runValidators: true, upsert: true }
      );

      if (!createDevice)
        throw new NotFound(
          `You are already added on ${type}, You can not add again here.`
        );
      res.json({
        status: "SUCCESS",
        message: "Make created successfully.",
        data: createDevice,
      });
    } catch (error) {
      if (imageData?.path) {
        new MediaLogic().deleteMedia(imageData?.path);
      }
      next(error);
    }
  }

  async removeServiceType(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { makeId } = req.params;
      const { type } = req.body;
      const removeServiceType = await MakeSchema.findOneAndUpdate(
        { _id: makeId, type },
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
        const deleteMake = await MakeSchema.findByIdAndDelete(makeId);
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
      const { limit, chunk, makeId, type } = req.query;

      const query: any = {};
      makeId && (query["_id"] = makeId);
      type && (query["type"] = type);
      const getAllData = await paginationHelper({
        model: MakeSchema,
        query,
        chunk: chunk ? Number(chunk) : undefined,
        limit: limit ? Number(limit) : undefined,
        select: "",
        populate: [
          {
            path: "devices",
            select: "-imagePATH",
          },
        ],
        sort: {
          createdAt: -1,
        },
      });
      res.status(200).json({
        status: "SUCCESS",
        message: makeId
          ? "make found successfully."
          : "All make found successfully.",
        data: makeId ? getAllData?.data?.[0] : getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const MakeControllerValidation = {
  createAndUpdate: [
    body("title").not().isEmpty().withMessage("title is required."),
    body("deviceId")
      .optional()
      .exists()
      .isMongoId()
      .withMessage("deviceId most be mongoose id."),
    body("type")
      .optional()
      .exists()
      .custom((value) =>
        Boolean(["SERVICE", "SELL"].includes(value?.toString()?.toUpperCase()))
      )
      .withMessage("serviceType most be SERVICE or SELL."),
  ],
  removeServiceType: [
    param("makeId")
      .not()
      .isEmpty()
      .withMessage("makeId is required.")
      .isMongoId()
      .withMessage("makeId most be mongoose id"),
    body("type")
      .not()
      .isEmpty()
      .withMessage("type must be required.")
      .exists()
      .custom((value) =>
        Boolean(["SERVICE", "SELL"].includes(value?.toString()?.toUpperCase()))
      )
      .withMessage("serviceType most be SERVICE or SELL."),
  ],
  getAll: [
    param("makeId")
      .not()
      .isEmpty()
      .withMessage("makeId is required.")
      .isMongoId()
      .withMessage("makeId most be mongoose id"),
    body("type")
      .optional()
      .exists()
      .custom((value) =>
        Boolean(["SERVICE", "SELL"].includes(value?.toString()?.toUpperCase()))
      )
      .withMessage("serviceType most be SERVICE or SELL."),
  ],
};

export default MakeController;

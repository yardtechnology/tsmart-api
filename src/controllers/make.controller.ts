import { NextFunction, Response } from "express";
import { body, param, query } from "express-validator";
import { NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import MediaLogic from "../logic/media.logic";
import { DevicesSchema, MakeSchema } from "../models";
import { AuthRequest } from "../types/core";

class MakeController {
  async createAndUpdate(req: AuthRequest, res: Response, next: NextFunction) {
    let imageData: any | undefined;
    try {
      fieldValidateError(req);
      const { title, deviceId, types } = req.body;
      const imageFile = req?.files?.image;
      const filePath = `Make`;

      const typesArrayCheck = types
        ? Array.isArray(types)
          ? types
          : [types]
        : [];

      imageData =
        imageFile && !Array.isArray(imageFile)
          ? await new MediaLogic().uploadMedia(imageFile, filePath)
          : undefined;
      const pushDataObject: any = {};
      // types && (pushDataObject.type = { $each: typesArrayCheck });
      deviceId && (pushDataObject.devices = deviceId);

      const createDevice = await MakeSchema.findOneAndUpdate(
        {
          title,
        },
        {
          image: imageData?.url,
          imagePATH: imageData?.path,
          type: typesArrayCheck,

          $addToSet: pushDataObject,
        },
        { new: true, runValidators: true, upsert: true }
      );

      if (!createDevice)
        throw new NotFound(
          `You are already added on ${types.join(
            ","
          )}, You can not add again here.`
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
      const { types } = req.body;
      fieldValidateError(req);
      const typesArrayCheck = types
        ? Array.isArray(types)
          ? types
          : [types]
        : [];
      const removeServiceType = await MakeSchema.findOneAndUpdate(
        { _id: makeId, type: { $in: typesArrayCheck } },
        {
          $pull: {
            type: { $in: typesArrayCheck },
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
      const {
        limit,
        chunk,
        makeId,
        type,
        deviceIds,
        searchTitle,
        excludeMakeDeviceId,
      } = req.query;
      const deviceIdArrayCheck = deviceIds
        ? Array.isArray(deviceIds)
          ? deviceIds
          : [deviceIds]
        : undefined;
      fieldValidateError(req);
      const query: any = {};
      makeId && (query["_id"] = makeId);
      type && (query["type"] = type);
      deviceIdArrayCheck && (query["devices"] = { $in: deviceIdArrayCheck });
      const deviceMake = excludeMakeDeviceId
        ? await DevicesSchema.findById(excludeMakeDeviceId)
        : undefined;
      if (searchTitle)
        query["$or"] = [{ title: { $regex: searchTitle, $options: "i" } }];
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
      res.json({
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
  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { makeId } = req.params;
      fieldValidateError(req);
      const deleteMake = await MakeSchema.findByIdAndDelete(makeId);
      if (!deleteMake) throw new Error("Make not found for delete.");
      res.json({
        status: "SUCCESS",
        message: "Make deleted successfully",
        data: deleteMake,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const MakeControllerValidation = {
  createAndUpdate: [
    body("title")
      .not()
      .isEmpty()
      .withMessage("title is required.")
      .trim()
      .toUpperCase(),
    body("deviceId")
      .optional()
      .exists()
      .isMongoId()
      .withMessage("deviceId most be mongoose id."),
    body("types.*")
      .optional()
      .exists()
      .toUpperCase()
      .custom((value) =>
        Boolean(!value.length || ["SERVICE", "SELL"].includes(value))
      )

      .withMessage("types most be array which content SERVICE or SELL both."),
  ],
  removeServiceType: [
    param("makeId")
      .not()
      .isEmpty()
      .withMessage("makeId is required.")
      .isMongoId()
      .withMessage("makeId most be mongoose id"),
    body("type.*")
      .not()
      .isEmpty()
      .withMessage("type must be required.")
      .exists()
      .toUpperCase()
      .custom((value) =>
        Boolean(["SERVICE", "SELL"].includes(value?.toString()?.toUpperCase()))
      )
      .withMessage("serviceType most be SERVICE or SELL or both."),
  ],
  getAll: [
    query("makeId")
      .optional()
      .isMongoId()
      .withMessage("makeId most be mongoose id"),
    query("deviceIds.*")
      .optional()
      .isMongoId()
      .withMessage("deviceIds must be mongoes id"),
    query("deviceIds")
      .optional()
      .isMongoId()
      .withMessage("deviceIds must be mongoes id"),
    query("searchTitle")
      .optional()
      .isString()
      .toUpperCase()
      .withMessage("searchTitle must be a string"),
    query("type")
      .optional()
      .exists()
      .custom((value) =>
        Boolean(["SERVICE", "SELL"].includes(value?.toString()?.toUpperCase()))
      )
      .withMessage("serviceType most be SERVICE or SELL."),
  ],
  delete: [
    param("makeId")
      .not()
      .isEmpty()
      .withMessage("makeId is required.")
      .isMongoId()
      .withMessage("makeId most be mongoose id"),
  ],
};

export default MakeController;

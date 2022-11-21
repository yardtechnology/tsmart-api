import { NextFunction, Response } from "express";
import { body, param, query } from "express-validator";
import { NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import MediaLogic from "../logic/media.logic";
import { DevicesSchema } from "../models";
import { AuthRequest } from "../types/core";

class DeviceController {
  async createAndUpdate(req: AuthRequest, res: Response, next: NextFunction) {
    let imageData: any | undefined;
    try {
      fieldValidateError(req);
      const { title, types } = req.body;
      const imageFile = req?.files?.image;
      const filePath = `Device`;

      const typesArrayCheck = types
        ? Array.isArray(types)
          ? types
          : [types]
        : [];

      imageData =
        imageFile && !Array.isArray(imageFile)
          ? await new MediaLogic().uploadMedia(imageFile, filePath)
          : undefined;
      const createDevice = await DevicesSchema.findOneAndUpdate(
        {
          title,
        },
        {
          image: imageData?.url || undefined,
          imagePATH: imageData?.path || undefined,
          $addToSet: { type: { $each: typesArrayCheck } },
        },
        {
          new: true,
          runValidators: true,
          upsert: true,
        }
      );
      if (!createDevice)
        throw new NotFound(
          `You are already added on ${typesArrayCheck?.join(
            ","
          )}, You can not add again here.`
        );
      res.json({
        status: "SUCCESS",
        message: "Device created successfully.",
        data: createDevice,
      });
    } catch (error) {
      if (imageData?.path) new MediaLogic().deleteMedia(imageData?.path);

      next(error);
    }
  }

  async removeServiceType(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { deviceId } = req.params;
      const { types } = req.body;
      fieldValidateError(req);

      const typesArrayCheck = types
        ? Array.isArray(types)
          ? types
          : [types]
        : [];

      const removeDeviceType = await DevicesSchema.findOneAndUpdate(
        { _id: deviceId, type: { $in: typesArrayCheck } },
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
      if (!removeDeviceType)
        throw new NotFound("No data found for remove type");
      if (!removeDeviceType?.type?.length) {
        const deleteDevice = await DevicesSchema.findByIdAndDelete(deviceId);
      }
      res.json({
        status: "SUCCESS",
        message: "Remove type successfully.",
        data: removeDeviceType,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { limit, chunk, deviceId, type } = req.query;

      const query: any = {};
      deviceId && (query["_id"] = deviceId);
      type && (query["type"] = type);

      const getAllData = await paginationHelper({
        model: DevicesSchema,
        query,
        chunk: chunk ? Number(chunk) : undefined,
        limit: limit ? Number(limit) : undefined,
        select: "",
        sort: {
          createdAt: -1,
        },
      });
      res.json({
        status: "SUCCESS",
        message: deviceId
          ? `Device found successfully`
          : "All devices found successfully.s",
        data: deviceId ? getAllData?.data?.[0] : getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { deviceId } = req.params;
      fieldValidateError(req);
      const deleteDevice = await DevicesSchema.findByIdAndDelete(deviceId);
      if (!deleteDevice) throw new Error("Device not found for delete.");
      res.json({
        status: "SUCCESS",
        message: "Device deleted successfully",
        data: deleteDevice,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const DeviceControllerValidation = {
  createAndUpdate: [
    body("title")
      .not()
      .isEmpty()
      .withMessage("title is required.")
      .toUpperCase()
      .trim(),

    body("types.*")
      .optional()
      .exists()
      .toUpperCase()
      .custom((value) => Boolean(["SERVICE", "SELL"].includes(value)))

      .withMessage("types most be array which content SERVICE or SELL both."),
  ],
  removeServiceType: [
    param("deviceId")
      .not()
      .isEmpty()
      .withMessage("deviceId is required.")
      .isMongoId()
      .withMessage("deviceId most be mongoose id"),
    body("type.*")
      .not()
      .isEmpty()
      .withMessage("type must be required.")
      .exists()
      .custom((value) =>
        Boolean(["SERVICE", "SELL"].includes(value?.toString()?.toUpperCase()))
      )
      .withMessage("type most be SERVICE or SELL or both."),
  ],
  getAll: [
    query("deviceId")
      .optional()
      .exists()
      .isMongoId()
      .withMessage("deviceId most be mongoose id."),
    query("type")
      .optional()
      .exists()
      .custom((value) =>
        Boolean(["SERVICE", "SELL"].includes(value?.toString()?.toUpperCase()))
      )
      .withMessage("type most be SERVICE or SELL."),
  ],
  delete: [
    param("deviceId")
      .not()
      .isEmpty()
      .withMessage("deviceId is required.")
      .isMongoId()
      .withMessage("deviceId most be mongoose id"),
  ],
};

export default DeviceController;

import { NextFunction, Response } from "express";
import { body, param, validationResult } from "express-validator";
import paginationHelper from "../helper/pagination.helper";
import MediaLogic from "../logic/media.logic";
import { DevicesSchema } from "../models";
import { DEVICE_TYPE } from "../types";
import { AuthRequest } from "../types/core";
import { BadRequest, InternalServerError } from "http-errors";

class DeviceController {
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
      const { title } = req.body;
      const imageFile = req?.files?.image;
      const filePath = `Device`;

      imageData =
        imageFile && !Array.isArray(imageFile)
          ? await new MediaLogic().uploadMedia(imageFile, filePath)
          : undefined;
      const createDevice = await DevicesSchema.create({
        title,
        image: imageData?.url,
        imagePATH: imageData?.path,
      });
      if (!createDevice)
        throw new InternalServerError(
          "Something went wrong, Device is not created."
        );
      res.json({
        status: "SUCCESS",
        message: "Device created successfully.",
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
      const { deviceId } = req.params;
      const { title } = req.body;

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
      const filePath = `Device`;

      imageData =
        imageFile && !Array.isArray(imageFile)
          ? await new MediaLogic().uploadMedia(imageFile, filePath)
          : undefined;
      const arg: any = {};
      title && (arg.title = title);
      if (imageData) {
        arg.image = imageData?.url;
        arg.imagePATH = imageData?.path;
      }

      const updateDeviceData = await DevicesSchema.findByIdAndUpdate(
        deviceId,
        arg,
        {
          runValidators: true,
        }
      );
      if (!updateDeviceData)
        throw new InternalServerError(
          "Something went wrong, Device is not updated."
        );
      if (arg?.imagePATH && updateDeviceData?.imagePATH) {
        new MediaLogic().deleteMedia(updateDeviceData?.imagePATH);
      }
      res.json({
        status: "SUCCESS",
        message: "Device updated successfully",
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
        model: DevicesSchema,
        query: {},
        chunk: chunk ? Number(chunk) : undefined,
        limit: limit ? Number(limit) : undefined,
        select: "",
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "All devices found successfully.s",
        data: getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteData(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { deviceId } = req.params;
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
      const deleteDevice = await DevicesSchema.findByIdAndDelete(deviceId);
      //   delete device image
      deleteDevice?.imagePATH &&
        new MediaLogic().deleteMedia(deleteDevice?.imagePATH);

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
  create: [body("title").not().isEmpty().withMessage("title is required.")],
  delete: [
    param("deviceId").not().isEmpty().withMessage("deviceId is required."),
  ],
  update: [
    param("deviceId").not().isEmpty().withMessage("deviceId is required."),
  ],
};

export default DeviceController;

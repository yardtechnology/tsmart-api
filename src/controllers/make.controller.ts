import { NextFunction, Response } from "express";
import { body, param } from "express-validator";
import { InternalServerError, NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import MediaLogic from "../logic/media.logic";
import { MakeSchema } from "../models";
import { AuthRequest } from "../types/core";

class MakeController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    let imageData: any | undefined;
    try {
      fieldValidateError(req);
      const { title, deviceId } = req.body;
      const imageFile = req?.files?.image;
      const filePath = `Make`;

      imageData =
        imageFile && !Array.isArray(imageFile)
          ? await new MediaLogic().uploadMedia(imageFile, filePath)
          : undefined;
      const createDevice = await MakeSchema.create({
        title,
        image: imageData?.url,
        imagePATH: imageData?.path,
        devices: deviceId ? [deviceId] : [],
      });
      if (!createDevice)
        throw new InternalServerError(
          "Something went wrong, Make is not created."
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
  async update(req: AuthRequest, res: Response, next: NextFunction) {
    let imageData: any | undefined;
    try {
      const { makeId } = req.params;
      const { title, deviceId } = req.body;

      fieldValidateError(req);

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
      deviceId &&
        (arg["$addToSet"] = {
          devices: deviceId,
        });

      const updateDeviceData = await MakeSchema.findByIdAndUpdate(makeId, arg, {
        runValidators: true,
      });
      if (!updateDeviceData)
        throw new InternalServerError(
          "Something went wrong, Device is not updated."
        );
      if (arg?.imagePATH && updateDeviceData?.imagePATH) {
        new MediaLogic().deleteMedia(updateDeviceData?.imagePATH);
      }
      res.json({
        status: "SUCCESS",
        message: "Make updated successfully",
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
      const { limit, chunk, makeId } = req.query;

      const query: any = {};
      makeId && (query["_id"] = makeId);
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
  async deleteData(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { makeId } = req.params;
      fieldValidateError(req);
      const deleteDevice = await MakeSchema.findByIdAndDelete(makeId);
      //   delete device image
      deleteDevice?.imagePATH &&
        new MediaLogic().deleteMedia(deleteDevice?.imagePATH);
      if (!deleteDevice) throw new NotFound("No make found for delete.");

      res.json({
        status: "SUCCESS",
        message: "Make deleted successfully",
        data: deleteDevice,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const MakeControllerValidation = {
  create: [
    body("title").not().isEmpty().withMessage("title is required."),
    body("deviceId").not().isEmpty().withMessage("deviceId is required."),
  ],
  delete: [
    param("makeId").not().isEmpty().withMessage("deviceId is required."),
  ],
  update: [
    param("makeId").not().isEmpty().withMessage("deviceId is required."),
  ],
};

export default MakeController;

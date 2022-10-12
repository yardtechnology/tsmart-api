import { NextFunction, Response } from "express";
import { body, validationResult } from "express-validator";
import paginationHelper from "../helper/pagination.helper";
import MediaLogic from "../logic/media.logic";
import { DevicesSchema } from "../models";
import { DEVICE_TYPE } from "../types";
import { AuthRequest } from "../types/core";
import { BadRequest } from "http-errors";

class DeviceController {
  create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error(
          errors
            .array()
            .map((errors) => errors.msg)
            .join()
            .replace(/[,]/g, " and ")
        );
      }
    } catch (error) {
      next(error);
    }
  }
}
export const DeviceControllerValidation = {
  create: [body("title", "title is required.")],
};

export default DeviceController;

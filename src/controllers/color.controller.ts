import { NextFunction, Response } from "express";
import { body, param, query } from "express-validator";
import { InternalServerError, NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import { ColorSchema } from "../models";
import { AuthRequest } from "../types/core";

class ColorController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);
      // const { color, hashCode } = req.body;

      const createColor = await ColorSchema.create(req.body);
      if (!createColor)
        throw new InternalServerError(
          "Something went wrong, Color is not created."
        );
      res.json({
        status: "SUCCESS",
        message: "Color created successfully.",
        data: createColor,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { colorId } = req.params;
      const { color, hashCode } = req.body;

      fieldValidateError(req);

      const arg: any = {};
      color && (arg.color = color);
      hashCode && (arg.hashCode = hashCode);

      const updateColor = await ColorSchema.findByIdAndUpdate(colorId, arg, {
        runValidators: true,
      });
      if (!updateColor)
        throw new InternalServerError(
          "Something went wrong, Color is not updated."
        );
      res.json({
        status: "SUCCESS",
        message: "Color updated successfully",
        data: updateColor,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { limit, chunk, colorId } = req.query;
      const query: any = {};
      colorId && (query._id = colorId);
      const getAllData = await paginationHelper({
        model: ColorSchema,
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
        message: "All color found successfully.s",
        data: colorId ? getAllData?.data?.[0] : getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { colorId } = req.params;
      fieldValidateError(req);
      const deleteColor = await ColorSchema.findByIdAndDelete(colorId);
      if (!deleteColor) throw new NotFound("Color not found.");
      //   delete color image

      res.json({
        status: "SUCCESS",
        message: "Color deleted successfully",
        data: deleteColor,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const ColorControllerValidation = {
  create: [
    body("color").not().isEmpty().withMessage("color is required."),
    body("hashCode").not().isEmpty().withMessage("hashCode is required."),
  ],
  delete: [
    param("colorId")
      .not()
      .isEmpty()
      .withMessage("colorId is required.")
      .isMongoId()
      .withMessage("colorId most be mongoose id."),
  ],
  getAll: [
    query("colorId").not().isEmpty().withMessage("colorId is required."),
  ],
  update: [
    param("colorId")
      .not()
      .isEmpty()
      .withMessage("colorId is required.")
      .isMongoId()
      .withMessage("colorId most be mongoose Id."),
    body("color")
      .optional()
      .isLength({ min: 1 })
      .withMessage("color must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("color must be at most 250 character."),
    body("hasCode")
      .optional()
      .isLength({ min: 1 })
      .withMessage("hasCode must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("hasCode must be at most 250 character."),
  ],
};

export default ColorController;

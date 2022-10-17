import { NextFunction, Response } from "express";
import { body, param, query } from "express-validator";
import { InternalServerError } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import { CouponSchema } from "../models";
import { AuthRequest } from "../types/core";

class CouponController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);

      //   const { code, discountPercent, startDate, endDate } = req.body;

      const createCoupon = await CouponSchema.create({
        ...req.body,
      });
      if (!createCoupon)
        throw new InternalServerError(
          "Something went wrong, Coupon is not created."
        );
      res.json({
        status: "SUCCESS",
        message: "Device created successfully.",
        data: createCoupon,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { couponId } = req.params;
      const { discountPercent, startDate, endDate } = req.body;

      fieldValidateError(req);

      const updateCouponData = await CouponSchema.findByIdAndUpdate(
        couponId,
        {
          discountPercent,
          startDate,
          endDate,
        },
        {
          runValidators: true,
          new: true,
        }
      );
      if (!updateCouponData)
        throw new InternalServerError(
          "Something went wrong, Coupon is not updated."
        );

      res.json({
        status: "SUCCESS",
        message: "Coupon updated successfully",
        data: updateCouponData,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { limit, chunk, code } = req.query;
      const { startDate, endDate } = req.body;

      const query: any = {};
      code && (query["code"] = code);
      startDate &&
        endDate &&
        (query["$and"] = [
          {
            startDate: { $gte: new Date(startDate) },
          },
          {
            endDate: {
              $lte: new Date(endDate),
            },
          },
        ]);

      const getAllData = await paginationHelper({
        model: CouponSchema,
        query,
        chunk: chunk ? Number(chunk) : undefined,
        limit: limit ? Number(limit) : undefined,
        select: "",
        sort: {
          createdAt: -1,
        },
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "All Coupon found successfully.s",
        data: getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteData(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { couponId } = req.params;
      fieldValidateError(req);

      const deleteDevice = await CouponSchema.findByIdAndDelete(couponId);

      res.json({
        status: "SUCCESS",
        message: "Coupon deleted successfully",
        data: deleteDevice,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const CouponControllerValidation = {
  create: [
    body("code")
      .not()
      .isEmpty()
      .withMessage("code is required.")
      .isLength({ min: 3 })
      .withMessage("code must be at least 3 character.")
      .isLength({ max: 10 })
      .withMessage("code must be at most 10 character."),
    body("discountPercent")
      .not()
      .isEmpty()
      .withMessage("discountPercent is required.")
      .isNumeric()
      .withMessage("discountPercent must be number."),
    body("startDate")
      .not()
      .isEmpty()
      .withMessage("startDate is required.")
      .toDate()
      .withMessage("startDate must be date."),
    body("endDate")
      .not()
      .isEmpty()
      .withMessage("endDate is required.")
      .toDate()
      .withMessage("endDate must be date.")
      .custom((value, { req }) => {
        return (
          new Date(req.body.startDate).getTime() < new Date(value).getTime()
        );
      })
      .withMessage("start date should have to smaller then end date."),
  ],
  delete: [
    param("couponId").not().isEmpty().withMessage("couponId is required."),
  ],
  update: [
    param("couponId").not().isEmpty().withMessage("couponId is required."),
    body("discountPercent")
      .optional()
      .isNumeric()
      .withMessage("discountPercent must be number."),
    body("startDate")
      .optional()
      .exists()
      .toDate()
      .withMessage("startDate must be date."),
    body("endDate")
      .optional()
      .exists({ checkFalsy: true })

      .toDate()
      .withMessage("endDate must be date.")
      .custom((value, { req }) => {
        return req.body.startDate
          ? new Date(req.body.startDate).getTime() < new Date(value).getTime()
          : true;
      })
      .withMessage("start date should have to smaller then end date."),
  ],
  getAll: [
    query("code")
      .optional()
      .exists()
      .isLength({ min: 3 })
      .withMessage("code must be at least 3 character.")
      .isLength({ max: 10 })
      .withMessage("code must be at most 10 character."),
    body("startDate")
      .optional()
      .exists()
      .custom((value, { req }) => {
        return Boolean(req?.body?.endDate && value);
      })
      .withMessage("Both startDate and endDate are required."),
  ],
};

export default CouponController;

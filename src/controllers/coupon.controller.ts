import { NextFunction, Response } from "express";
import { body, param } from "express-validator";
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
      const { limit, chunk } = req.query;
      const getAllData = await paginationHelper({
        model: CouponSchema,
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
  create: [body("title").not().isEmpty().withMessage("title is required.")],
  delete: [
    param("deviceId").not().isEmpty().withMessage("deviceId is required."),
  ],
  update: [
    param("deviceId").not().isEmpty().withMessage("deviceId is required."),
  ],
};

export default CouponController;

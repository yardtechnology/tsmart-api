import { NextFunction, Response } from "express";
import { body, param, query } from "express-validator";
import { InternalServerError } from "http-errors";
import { Types } from "mongoose";
import { fieldValidateError } from "../helper";
import paginationHelper, { aggregationData } from "../helper/pagination.helper";
import { CouponSchema } from "../models";
import { COUPON_TYPE } from "../types";
import { AuthRequest } from "../types/core";

class CouponController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);

      //   const { code, discountPercent, startDate, endDate, maxCashBack } = req.body;

      const createCoupon = await CouponSchema.create({
        ...req.body,
      });
      if (!createCoupon)
        throw new InternalServerError(
          "Something went wrong, Coupon is not created."
        );
      res.json({
        status: "SUCCESS",
        message: "Config created successfully.",
        data: createCoupon,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { couponId } = req.params;
      const {
        discountPercent,
        startDate,
        endDate,
        maxUses,
        title,
        description,
      } = req.body;

      fieldValidateError(req);

      const updateCouponData = await CouponSchema.findByIdAndUpdate(
        couponId,
        {
          discountPercent,
          startDate,
          endDate,
          maxUses,
          title,
          description,
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
  async couponUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { couponId } = req.params;
      const { limit, chunk } = req.query;
      fieldValidateError(req);
      const aggregationQuery = [
        {
          $match: {
            _id: new Types.ObjectId(couponId),
          },
        },
        {
          $unwind: {
            path: "$users",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "users",
            foreignField: "_id",
            as: "user",
            pipeline: [
              {
                $project: {
                  displayName: 1,
                  phoneNumber: 1,
                  country: 1,
                  avatar: 1,
                  email: 1,
                  gender: 1,
                  dateOfBirth: 1,
                  createdAt: 1,
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            displayName: "$user.displayName",
            phoneNumber: "$user.phoneNumber",
            country: "$user.country",
            avatar: "$user.avatar",
            email: "$user.email",
            gender: "$user.gender",
            dateOfBirth: "$user.dateOfBirth",
            createdAt: "$user.createdAt",
          },
        },
      ];

      const couponUsers = await aggregationData<COUPON_TYPE>({
        model: CouponSchema,
        query: aggregationQuery,
        position: 4,
        sort: { createdAt: -1 },
        limit: limit ? Number(limit) : undefined,
        chunk: chunk ? Number(chunk) : undefined,
      });

      // CouponSchema.aggregate(

      // );
      res.json({
        status: "SUCCESS",
        message: "Coupon users get successfully",
        data: couponUsers,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { limit, chunk, code, couponId, isActive } = req.query;
      const { startDate, endDate } = req.body;

      const query: any = {};
      code && (query["code"] = code);
      couponId && (query["_id"] = couponId);
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
      isActive &&
        (query["$and"] = [
          {
            startDate: { $lte: new Date() },
          },
          {
            endDate: { $gte: new Date() },
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
        data: code || couponId ? getAllData?.data?.[0] : getAllData,
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
    body("maxCashBack")
      .not()
      .isEmpty()
      .withMessage("maxCashBack is required.")
      .isNumeric()
      .withMessage("maxCashBack must be number."),
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
    body("maxUses")
      .optional()
      .isNumeric()
      .withMessage("maxUses must be number."),
    body("title")
      .not()
      .exists()
      .withMessage("title is required")
      .isLength({ min: 3 })
      .withMessage("title must be at least 3 characters long")
      .isLength({ max: 20 })
      .withMessage("title must be at most 20 characters long"),
    body("description")
      .not()
      .exists()
      .withMessage("description is required")
      .isLength({ min: 3 })
      .withMessage("description must be at least 3 characters long")
      .isLength({ max: 150 })
      .withMessage("description must be at most 150 characters long"),
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
    body("maxUses")
      .optional()
      .isNumeric()
      .withMessage("maxUses must be number."),
    body("title")
      .optional()
      .exists()
      .isLength({ min: 3 })
      .withMessage("title must be at least 3 characters long")
      .isLength({ max: 20 })
      .withMessage("title must be at most 20 characters long"),
    body("description")
      .optional()
      .exists()
      .isLength({ min: 3 })
      .withMessage("description must be at least 3 characters long")
      .isLength({ max: 150 })
      .withMessage("description must be at most 150 characters long"),
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
  couponUser: [
    param("couponId")
      .not()
      .isEmpty()
      .withMessage("couponId is required.")
      .isMongoId()
      .withMessage("couponId must be a valid mongoId."),

    query("limit").optional().isNumeric().withMessage("limit must be number."),
    query("chunk").optional().isNumeric().withMessage("limit must be number."),
  ],
};

export default CouponController;

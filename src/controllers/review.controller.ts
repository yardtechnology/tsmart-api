import { NextFunction, Response } from "express";
import { body, oneOf, param } from "express-validator";
import { Conflict, NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import { ReviewSchema } from "../models";
import { StoreModel } from "../models/store.model";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";
import { ProductModel } from "./../models/product.model";

class ReviewController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);
      const {
        comment,
        ratings,
        productId,
        storeId,
        technicianId,
        orderId,
        isAdmin,
      } = req.body;
      const user = req?.currentUser?._id;
      let queryArg: any = {};

      //if rating for technician
      if (technicianId) {
        await UserModel.findByIdAndUpdate(technicianId, {
          $inc: {
            "reviews.total": 1,
            "reviews.stars": Number(ratings),
          },
        });
        queryArg = {
          user,
          technician: { $ne: technicianId },
        };
      }
      //if rating for product
      if (productId) {
        await ProductModel.findByIdAndUpdate(technicianId, {
          $inc: {
            "reviews.total": 1,
            "reviews.stars": Number(ratings),
          },
        });
        queryArg = {
          user,
          product: { $ne: productId },
        };
      }
      //if rating for store
      if (storeId) {
        await StoreModel.findByIdAndUpdate(storeId, {
          $inc: {
            "reviews.total": 1,
            "reviews.stars": Number(ratings),
          },
        });
        queryArg = {
          user,
          order: { $ne: orderId },
        };
      }

      const reviewDevice = await ReviewSchema.findOneAndUpdate(
        {
          ...queryArg,
        },
        {
          comment,
          ratings: +ratings,
          product: productId,
          user,
          store: storeId,
          technician: technicianId,
          isAdmin,
          order: orderId,
          user,
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
        }
      );
      if (!reviewDevice) throw new Conflict("Your review already recorded.");
      res.json({
        status: "SUCCESS",
        message: "Review is created successfully.",
        data: reviewDevice,
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
        reviewId,
        storeId,
        productId,
        userId,
        technicianId,
        orderId,
        isAdmin,
      } = req.query;

      const query: any = {};
      reviewId && (query["_id"] = reviewId);
      storeId && (query["store"] = storeId);
      productId && (query["product"] = productId);
      userId && (query["user"] = userId);
      technicianId && (query["technician"] = technicianId);
      orderId && (query["order"] = orderId);
      isAdmin && (query["isAdmin"] = true);
      const getAllData = await paginationHelper({
        model: ReviewSchema,
        query,
        chunk: chunk ? Number(chunk) : undefined,
        limit: limit ? Number(limit) : undefined,
        select: "",
        populate: [
          {
            path: "user",
            select: "displayName email gender role avatar",
          },
          {
            path: "technician",
            select: "displayName email gender role avatar",
          },
          {
            path: "store",
            select: "displayName email imageURL",
          },
          {
            path: "product",
            select:
              "title shortDescription description mrp images displayImage salePrice",
          },
          {
            path: "order",
          },
        ],
        sort: {
          createdAt: -1,
        },
      });
      res.status(200).json({
        status: "SUCCESS",
        message: reviewId
          ? "Review found successfully."
          : "All Review found successfully.",
        data: reviewId ? getAllData?.data?.[0] : getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteData(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { reviewId } = req.params;
      fieldValidateError(req);
      const deleteReview = await ReviewSchema.findByIdAndDelete(reviewId);
      //   delete device image
      if (!deleteReview) throw new NotFound("Evaluation not found.");
      //if rating for technician
      if (deleteReview?.technician) {
        await UserModel.findByIdAndUpdate(deleteReview?.technician, {
          $inc: {
            "reviews.total": 1,
            "reviews.stars": Number(deleteReview?.ratings),
          },
        });
      }
      //if rating for product
      if (deleteReview?.product) {
        await ProductModel.findByIdAndUpdate(deleteReview?.product, {
          $inc: {
            "reviews.total": 1,
            "reviews.stars": Number(deleteReview?.ratings),
          },
        });
      }
      //if rating for store
      if (deleteReview?.store) {
        await ProductModel.findByIdAndUpdate(deleteReview?.store, {
          $inc: {
            "reviews.total": 1,
            "reviews.stars": Number(deleteReview?.ratings),
          },
        });
      }
      res.json({
        status: "SUCCESS",
        message: "Review deleted successfully",
        data: deleteReview,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const ReviewControllerValidation = {
  create: [
    body("comment")
      .not()
      .isEmpty()
      .withMessage("comment is required.")
      .isLength({ min: 3 })
      .withMessage("comment must be at least 3 character.")
      .isLength({ max: 700 })
      .withMessage("comment must be at most 700 characters long"),
    body("ratings")
      .not()
      .isEmpty()
      .withMessage("rating is required.")
      .isNumeric()
      .withMessage("Rating must be Number.")
      .exists()
      .custom((value, { req }) => value > 0 && value <= 5)
      .withMessage("rating must be grater than 0 and less than 6."),
    oneOf(
      [
        body("productId")
          .isMongoId()
          .withMessage("product id should be mongoose id."),
        body("storeId")
          .isMongoId()
          .withMessage("storeId should be mongoose id."),
        body("technicianId")
          .isMongoId()
          .withMessage("technicianId should be mongoose id."),
        body("isAdmin").isBoolean().withMessage("isAdmin should be boolean"),
      ],
      "productId or technicianId or storeId one id is required."
    ),
    body("orderId")
      .not()
      .isEmpty()
      .withMessage("orderId should be required.")
      .isMongoId()
      .withMessage("orderId must be mongoose id."),
  ],
  delete: [
    param("reviewId")
      .not()
      .isEmpty()
      .withMessage("reviewId is required.")
      .isMongoId()
      .withMessage("reviewId must be mongoose id."),
  ],
};

export default ReviewController;

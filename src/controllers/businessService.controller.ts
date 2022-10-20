import { NextFunction, Response } from "express";
import { body, param, query } from "express-validator";
import { BadRequest, InternalServerError, NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import { BusinessServiceSchema } from "../models";
import { AuthRequest } from "../types/core";

class BusinessServiceController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);

      const businessServiceCreate = await BusinessServiceSchema.create({
        ...req.body,
      });
      if (!businessServiceCreate)
        throw new InternalServerError(
          "Something went wrong, Business service is not created."
        );
      res.json({
        status: "SUCCESS",
        message: "Business service created successfully.",
        data: businessServiceCreate,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);
      const { limit, chunk, businessServiceId } = req.query;

      const query: any = {};
      businessServiceId && (query["_id"] = businessServiceId);
      const getAllData = await paginationHelper({
        model: BusinessServiceSchema,
        query,
        chunk: chunk ? Number(chunk) : undefined,
        limit: limit ? Number(limit) : undefined,
        select: "",
        populate: "",
        sort: {
          createdAt: -1,
        },
      });
      res.status(200).json({
        status: "SUCCESS",
        message: businessServiceId
          ? "Business service found successfully."
          : "All Business service found successfully.",
        data: businessServiceId ? getAllData?.data?.[0] : getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteData(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { businessServiceId } = req.params;
      if (!businessServiceId)
        throw new BadRequest("businessServiceId is required.");
      fieldValidateError(req);
      const deleteBusinessService =
        await BusinessServiceSchema.findByIdAndDelete(businessServiceId);
      //   delete device image

      if (!deleteBusinessService)
        throw new NotFound("No make found for delete.");

      res.json({
        status: "SUCCESS",
        message: "Business service deleted successfully",
        data: deleteBusinessService,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const BusinessServiceControllerValidation = {
  create: [
    body("name")
      .not()
      .isEmpty()
      .withMessage("name is required.")
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 characters long")
      .isLength({ max: 60 })
      .withMessage("name must be at most 60 characters long"),

    body("phoneNumber")
      .not()
      .isEmpty()
      .withMessage("phoneNumber is required.")
      .isLength({ min: 3 })
      .withMessage("phoneNumber must be at least 3 characters long")
      .isLength({ max: 20 })
      .withMessage("phoneNumber must be at most 20 characters long"),

    body("email")
      .not()
      .isEmpty()
      .withMessage("email is required.")
      .isEmail()
      .withMessage("Email is not valid."),

    body("countryCode").not().isEmpty().withMessage("countryCode is required."),

    body("companyName")
      .not()
      .isEmpty()
      .withMessage("companyName is required.")
      .isLength({ min: 3 })
      .withMessage("companyName must be at least 3 characters long")
      .isLength({ max: 100 })
      .withMessage("companyName must be at most 100 characters long"),

    body("companyRegNumber")
      .not()
      .isEmpty()
      .withMessage("companyRegNumber is required.")
      .isLength({ min: 3 })
      .withMessage("companyRegNumber must be at least 3 characters long")
      .isLength({ max: 250 })
      .withMessage("companyRegNumber must be at most 250 characters long"),

    body("message")
      .not()
      .isEmpty()
      .withMessage("message is required.")
      .isLength({ min: 3 })
      .withMessage("message must be at least 3 characters long")
      .isLength({ max: 450 })
      .withMessage("message must be at most 450 characters long"),
  ],
  getAll: [
    query("businessServiceId")
      .optional()
      .isMongoId()
      .withMessage("businessServiceId must be mongoose id."),
  ],
  delete: [
    param("businessServiceId")
      .not()
      .isEmpty()
      .withMessage("businessServiceId is required.")
      .isMongoId()
      .withMessage("businessServiceId must be mongoose id."),
  ],
};

export default BusinessServiceController;

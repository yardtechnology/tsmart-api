import { NextFunction, Response } from "express";
import { body, param, query } from "express-validator";
import { InternalServerError, NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import { ServicePropertyValueSchema } from "../models";
import { AuthRequest } from "../types/core";

class ServicePropertyValueController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);
      const { allServices } = req.body;

      const createServicePropertyValue =
        await ServicePropertyValueSchema.insertMany(allServices);
      if (!createServicePropertyValue)
        throw new InternalServerError(
          "Something went wrong, Service property value is not created."
        );
      res.json({
        status: "SUCCESS",
        message: "Service property value is created successfully.",
        data: createServicePropertyValue,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllAccordingServicePrice(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { limit, chunk, servicePropertyValueId } = req.query;
      const { servicePrice, serviceProperty } = req.params;
      fieldValidateError(req);
      const query: any = { servicePrice, serviceProperty };
      servicePropertyValueId && (query["_id"] = servicePropertyValueId);

      const getAllData = await paginationHelper({
        model: ServicePropertyValueSchema,
        query,
        chunk: chunk ? Number(chunk) : undefined,
        limit: limit ? Number(limit) : undefined,
        select: "",
        populate: [
          {
            path: "serviceProperty",
          },
        ],
        sort: {
          createdAt: -1,
        },
      });
      res.json({
        status: "SUCCESS",
        message: servicePropertyValueId
          ? "Service property value found successfully."
          : "All Service property value found successfully.",
        data: servicePropertyValueId ? getAllData?.data?.[0] : getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { servicePropertyValueId } = req.params;
      const { value } = req.body;
      fieldValidateError(req);
      const updateServicePropertyValue =
        await ServicePropertyValueSchema.findByIdAndUpdate(
          servicePropertyValueId,
          {
            value,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      if (!updateServicePropertyValue)
        throw new NotFound("No data found for update.");
      res.json({
        success: {
          message: "Service property value updated successfully.",
          data: updateServicePropertyValue,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  //
  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { servicePropertyValueId } = req.params;
      fieldValidateError(req);
      const deleteServicePropertyValue =
        await ServicePropertyValueSchema.findByIdAndDelete(
          servicePropertyValueId
        );
      //   delete device image
      if (!deleteServicePropertyValue)
        throw new NotFound("Service property value not found.");

      res.json({
        status: "SUCCESS",
        message: "Service property value deleted successfully",
        data: deleteServicePropertyValue,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { serviceId, chunk, limit, modelId } = req.query;
      const query: any = {};
      serviceId && (query["service"] = serviceId);
      modelId && (query["service"] = modelId);
      const allServiceProperty = await ServicePropertyValueSchema.aggregate([
        {
          $group: {
            _id: {
              model: "$model",
              serviceProperty: "$serviceProperty",
            },
            serviceProperty: { $first: "$serviceProperty" },
          },
        },
        {
          $lookup: {
            from: "serviceproperties",
            localField: "serviceProperty",
            foreignField: "_id",
            as: "serviceProperty",
          },
        },
        {
          $unwind: {
            path: "$serviceProperty",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);
      res.json({
        status: "SUCCESS",
        message: "Service property found successfully",
        data: allServiceProperty,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const ServicePropertyValueControllerValidation = {
  create: [
    body("allServices.*.value")
      .not()
      .isEmpty()
      .withMessage("value is required.")
      .isLength({ min: 3 })
      .withMessage("value must be at least 3 character.")
      .isLength({ max: 700 })
      .withMessage("value must be at most 700 characters long"),
    body("allServices.*.servicePrice")
      .not()
      .isEmpty()
      .withMessage("servicePrice is required.")
      .isMongoId()
      .withMessage("servicePrice must be mongoose Id."),
    body("allServices.*.serviceProperty")
      .not()
      .isEmpty()
      .withMessage("serviceProperty is required.")
      .isMongoId()
      .withMessage("serviceProperty must be mongoesId."),
    body("allServices.*.model")
      .not()
      .isEmpty()
      .withMessage("model is required.")
      .isMongoId()
      .withMessage("model must be mongoesId."),
  ],
  getAllAccordingServicePrice: [
    param("servicePrice")
      .not()
      .isEmpty()
      .withMessage("servicePrice is required.")
      .isMongoId()
      .withMessage("servicePrice must be mongoesId."),
    param("serviceProperty")
      .not()
      .isEmpty()
      .withMessage("servicePropertyId is required.")
      .exists()
      .isMongoId()
      .withMessage("servicePropertyId must be mongoesId."),
    query("servicePropertyValueId")
      .optional()
      .exists()
      .isMongoId()
      .withMessage("servicePropertyValueId must be mongoose id."),
  ],
  update: [
    param("servicePropertyValueId")
      .not()
      .isEmpty()
      .withMessage("servicePropertyValueId is required.")
      .isMongoId()
      .withMessage("servicePropertyValueId must be mongoose id."),
    body("value")
      .not()
      .isEmpty()
      .withMessage("value is required.")
      .isLength({ min: 3 })
      .withMessage("value must be at least 3 character.")
      .isLength({ max: 700 })
      .withMessage("value must be at most 700 characters long"),
  ],
  delete: [
    param("servicePropertyValueId")
      .not()
      .isEmpty()
      .withMessage("servicePropertyValueId is required.")
      .isMongoId()
      .withMessage("servicePropertyValueId must be mongoose id."),
  ],
  getAll: [
    query("serviceId")
      .optional()
      .isMongoId()
      .withMessage("serviceId must be mongoes id."),
  ],
};

export default ServicePropertyValueController;

import { NextFunction, Response } from "express";
import { body, param, query } from "express-validator";
import { InternalServerError, NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import { ServicePropertySchema } from "../models";
import { AuthRequest } from "../types/core";

class ServicePropertyController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);
      const { title, serviceId, type, description } = req.body;
      //   const user = req?.currentUser?._id;

      const createServiceProperty = await ServicePropertySchema.create({
        title,
        description,
        service: serviceId,
        type,
      });
      if (!createServiceProperty)
        throw new InternalServerError(
          "Something went wrong, Service property is not created."
        );
      res.json({
        status: "SUCCESS",
        message: "Service property is created successfully.",
        data: createServiceProperty,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { limit, chunk, servicePropertyId } = req.query;
      const { service } = req.params;
      fieldValidateError(req);
      const query: any = { service };
      servicePropertyId && (query["_id"] = servicePropertyId);

      const getAllData = await paginationHelper({
        model: ServicePropertySchema,
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
        message: servicePropertyId
          ? "Service property found successfully."
          : "All Service property found successfully.",
        data: servicePropertyId ? getAllData?.data?.[0] : getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { servicePropertyId } = req.params;
      const { title, description } = req.body;
      fieldValidateError(req);
      const updateServiceProperty =
        await ServicePropertySchema.findByIdAndUpdate(
          servicePropertyId,
          {
            title,
            description,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      if (!updateServiceProperty)
        throw new NotFound("No data found for update.");
      res.json({
        success: {
          message: "Service property updated successfully.",
          data: updateServiceProperty,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  //
  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { servicePropertyId } = req.params;
      fieldValidateError(req);
      const deleteServiceProperty =
        await ServicePropertySchema.findByIdAndDelete(servicePropertyId);
      //   delete device image
      if (!deleteServiceProperty)
        throw new NotFound("Service property not found.");

      res.json({
        status: "SUCCESS",
        message: "Service property deleted successfully",
        data: deleteServiceProperty,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const ServicePropertyControllerValidation = {
  create: [
    body("title")
      .not()
      .isEmpty()
      .withMessage("title is required.")
      .isLength({ min: 3 })
      .withMessage("title must be at least 3 character.")
      .isLength({ max: 700 })
      .withMessage("title must be at most 700 characters long"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("description is required.")
      .isLength({ min: 3 })
      .withMessage("description must be at least 3 character.")
      .isLength({ max: 700 })
      .withMessage("description must be at most 700 characters long"),
    body("type")
      .not()
      .isEmpty()
      .withMessage("type is required.")
      .custom((value, { req }) =>
        ["boolean", "string"].some((item) => item === value)
      )
      .withMessage("type must be boolean or string."),
    body("serviceId")
      .not()
      .isEmpty()
      .withMessage("serviceId is required.")
      .isMongoId()
      .withMessage("serviceId must be mongoesId."),
  ],
  getAll: [
    param("service")
      .not()
      .isEmpty()
      .withMessage("serviceId is required.")
      .isMongoId()
      .withMessage("serviceId must be mongoesId."),
    query("servicePropertyId")
      .optional()
      .exists()
      .isMongoId()
      .withMessage("servicePropertyId must be mongoesId."),
  ],
  update: [
    param("servicePropertyId")
      .not()
      .isEmpty()
      .withMessage("servicePropertyId is required.")
      .isMongoId()
      .withMessage("servicePropertyId must be mongoose id."),
    body("title")
      .not()
      .isEmpty()
      .withMessage("title is required.")
      .isLength({ min: 3 })
      .withMessage("title must be at least 3 character.")
      .isLength({ max: 700 })
      .withMessage("title must be at most 700 characters long"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("description is required.")
      .isLength({ min: 3 })
      .withMessage("description must be at least 3 character.")
      .isLength({ max: 700 })
      .withMessage("description must be at most 700 characters long"),
  ],
  delete: [
    param("servicePropertyId")
      .not()
      .isEmpty()
      .withMessage("servicePropertyId is required.")
      .isMongoId()
      .withMessage("servicePropertyId must be mongoose id."),
  ],
};

export default ServicePropertyController;

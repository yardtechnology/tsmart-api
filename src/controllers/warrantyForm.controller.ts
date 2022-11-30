import { NextFunction, Response } from "express";
import { body, param, query } from "express-validator";
import { InternalServerError, NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import { WarrantySchema } from "../models";
import { AuthRequest } from "../types/core";

class WarrantyController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);
      const { email, phoneNumber, name, makeModel, claimInformation } =
        req.body;
      const createWarranty = await WarrantySchema.create({
        email,
        phoneNumber,
        name,
        makeModel,
        claimInformation,
      });
      if (!createWarranty)
        throw new InternalServerError(
          "Something went wrong, Warranty is not created."
        );
      res.json({
        status: "SUCCESS",
        message: "Warranty created successfully.",
        data: createWarranty,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { limit, chunk, warrantyId } = req.query;
      fieldValidateError(req);

      const query: any = {};
      warrantyId && (query["_id"] = warrantyId);
      const getAllData = await paginationHelper({
        model: WarrantySchema,
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
        message: warrantyId
          ? "Warranty found successfully."
          : "All Warranty found successfully.",
        data: warrantyId ? getAllData?.data?.[0] : getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { warrantyId } = req.params;
      fieldValidateError(req);
      const deleteWarranty = await WarrantySchema.findByIdAndDelete(warrantyId);

      if (!deleteWarranty) throw new NotFound("No Warranty found for delete.");

      res.json({
        status: "SUCCESS",
        message: "Warranty deleted successfully",
        data: deleteWarranty,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const WarrantyControllerValidation = {
  create: [
    body("email")
      .not()
      .isEmpty()
      .withMessage("email is required.")
      .isEmail()
      .withMessage("email is not formatted."),
    body("phoneNumber").not().isEmpty().withMessage("phoneNumber is required."),
    body("name")
      .not()
      .isEmpty()
      .withMessage("name is required.")
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 characters long")
      .isLength({ max: 420 })
      .withMessage("name must be at most 420 characters long"),
    body("makeModel").not().isEmpty().withMessage("makeModel is required."),
    body("claimInformation")
      .not()
      .isEmpty()
      .withMessage("claimInformation is required.")
      .isLength({ min: 3 })
      .withMessage("claimInformation must be at least 3 characters long")
      .isLength({ max: 420 })
      .withMessage("claimInformation must be at most 420 characters long"),
  ],
  getAll: [
    query("warrantyId")
      .optional()
      .isMongoId()
      .withMessage("warrantyId should be mongoose id."),
  ],
  delete: [
    param("warrantyId")
      .not()
      .isEmpty()
      .withMessage("warrantyId is required.")
      .isMongoId()
      .withMessage("warrantyId must be mongoose Id."),
  ],
};

export default WarrantyController;

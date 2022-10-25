import { NextFunction, Response } from "express";
import { body, param, query } from "express-validator";
import { InternalServerError, NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import { SupportSchema } from "../models";
import { AuthRequest } from "../types/core";

class SupportController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);
      const { email, phoneNumber, countryCode, subject, message } = req.body;
      const createSupport = await SupportSchema.create({
        email,
        phoneNumber,
        countryCode,
        subject,
        message,
      });
      if (!createSupport)
        throw new InternalServerError(
          "Something went wrong, Support is not created."
        );
      res.json({
        status: "SUCCESS",
        message: "Support created successfully.",
        data: createSupport,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { limit, chunk, supportId } = req.query;
      fieldValidateError(req);

      const query: any = {};
      supportId && (query["_id"] = supportId);
      const getAllData = await paginationHelper({
        model: SupportSchema,
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
        message: supportId
          ? "Support found successfully."
          : "All support found successfully.",
        data: supportId ? getAllData?.data?.[0] : getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { supportId } = req.params;
      fieldValidateError(req);
      const deleteSupport = await SupportSchema.findByIdAndDelete(supportId);

      if (!deleteSupport) throw new NotFound("No Support found for delete.");

      res.json({
        status: "SUCCESS",
        message: "Support deleted successfully",
        data: deleteSupport,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const SupportControllerValidation = {
  create: [
    body("email")
      .not()
      .isEmpty()
      .withMessage("email is required.")
      .isEmail()
      .withMessage("email is not formatted."),
    body("phoneNumber").not().isEmpty().withMessage("phoneNumber is required."),
    body("countryCode").not().isEmpty().withMessage("countryCode is required."),
    body("subject").not().isEmpty().withMessage("subject is required."),
    body("message")
      .not()
      .isEmpty()
      .withMessage("message is required.")
      .isLength({ min: 3 })
      .withMessage("message must be at least 3 characters long")
      .isLength({ max: 420 })
      .withMessage("message must be at most 420 characters long"),
    body("subject")
      .not()
      .isEmpty()
      .withMessage("subject is required.")
      .isLength({ min: 3 })
      .withMessage("subject must be at least 3 characters long")
      .isLength({ max: 100 })
      .withMessage("subject must be at most 100 characters long"),
  ],
  getAll: [
    query("supportId")
      .optional()
      .isMongoId()
      .withMessage("supportId should be mongoose id."),
  ],
  delete: [
    param("supportId")
      .not()
      .isEmpty()
      .withMessage("supportId is required.")
      .isMongoId()
      .withMessage("supportId must be mongoose Id."),
  ],
};

export default SupportController;

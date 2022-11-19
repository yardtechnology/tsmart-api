import { NextFunction, Response } from "express";
import { body, param, query } from "express-validator";
import { InternalServerError, NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import { ContactUsSchema } from "../models";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";

class ContactUsController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);
      const { subject, message, storeId: store } = req.body;
      const userId = req.currentUser?._id;
      const userData = await UserModel.findById(userId);
      const createContactUs = await ContactUsSchema.create({
        email: userData?.email,
        name: userData?.displayName,
        phoneNumber: userData?.phoneNumber,
        countryCode: userData?.country?.code,
        subject,
        message,
        store,
      });
      if (!createContactUs)
        throw new InternalServerError(
          "Something went wrong, ContactUs is not created."
        );
      res.json({
        status: "SUCCESS",
        message: "ContactUs created successfully.",
        data: createContactUs,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { limit, chunk, contactUsId } = req.query;
      fieldValidateError(req);

      const query: any = {};
      contactUsId && (query["_id"] = contactUsId);
      const getAllData = await paginationHelper({
        model: ContactUsSchema,
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
        message: contactUsId
          ? "ContactUs found successfully."
          : "All ContactUs found successfully.",
        data: contactUsId ? getAllData?.data?.[0] : getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { contactUsId } = req.params;
      fieldValidateError(req);
      const deleteContactUs = await ContactUsSchema.findByIdAndDelete(
        contactUsId
      );

      if (!deleteContactUs)
        throw new NotFound("No ContactUs found for delete.");

      res.json({
        status: "SUCCESS",
        message: "ContactUs deleted successfully",
        data: deleteContactUs,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const ContactUsControllerValidation = {
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
    body("name")
      .not()
      .isEmpty()
      .withMessage("name is required.")
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 characters long")
      .isLength({ max: 100 })
      .withMessage("name must be at most 100 characters long"),
    body("storeId")
      .optional()
      .isMongoId()
      .withMessage("storeId is must be mongos id."),
  ],
  getAll: [
    query("contactUsId")
      .optional()
      .isMongoId()
      .withMessage("ContactUsId should be mongoose id."),
  ],
  delete: [
    param("contactUsId")
      .not()
      .isEmpty()
      .withMessage("ContactUsId is required.")
      .isMongoId()
      .withMessage("ContactUsId must be mongoose Id."),
  ],
};

export default ContactUsController;

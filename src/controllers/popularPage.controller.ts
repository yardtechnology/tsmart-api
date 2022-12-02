import { NextFunction, Response } from "express";
import { body } from "express-validator";
import { fieldValidateError } from "../helper";
import { PopularPageSchema } from "../models";
import { AuthRequest } from "../types/core";

class PopularPageController {
  async createAndUpdate(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);
      const { url, title } = req.body;
      const updatePopularPage = await PopularPageSchema.findOneAndUpdate(
        { url, title },

        { $inc: { count: 1 } },

        {
          upsert: true,
          new: true,
          runValidators: true,
        }
      );
      res.json({
        status: "SUCCESS",
        message: "Popular page created successfully.",
        data: updatePopularPage,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const PopularPageControllerValidation = {
  createAndUpdate: [
    body("url").not().isEmpty().withMessage("url is required."),
  ],
};

export default PopularPageController;

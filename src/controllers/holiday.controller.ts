import { NextFunction, Response } from "express";
import { body, validationResult } from "express-validator";
import { fieldValidateError } from "../helper";
import HolidayLogic from "../logic/holiday.logic";
import { AuthRequest } from "../types/core";

class Holiday extends HolidayLogic {
  // add to faq
  public async createHolidayController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      fieldValidateError(req);
      const { date, title, description } = req.body;
      await super.add({
        date,
        title,
        description,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Holiday Added Successfully",
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }
  // update to faq
  public async updateHolidayController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      const errors = validationResult(req);
      fieldValidateError(req);
      const { date, title, description } = req.body;
      await super.update({
        HolidayId: req.params?.HolidayId,
        date,
        title,
        description,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Holiday updated Successfully",
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  /**
   * remove from faq
   * @param req
   * @param res
   * @param next
   */
  public async deleteHolidayController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { HolidayId } = req.params;
      const faq = await super.remove(HolidayId);
      res.status(200).json({
        status: "SUCCESS",
        message: "Holiday deleted successfully",
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  /**
   * get all faq
   * @param req
   * @param res
   * @param next
   */
  public async getAllHolidayController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      let faq = await super.getAll({
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Holiday retrieved successfully",
        data: faq,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  public validateCreateHoliday = [
    body("date").not().isEmpty().withMessage("Date is required"),
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long")
      .isLength({ max: 101 })
      .withMessage("Title must be at most 101 characters long"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Description is required")
      .isLength({ min: 3 })
      .withMessage("Description must be at least 3 characters long"),
  ];
  public validateUpdateHoliday = [
    body("title")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long")
      .isLength({ max: 101 })
      .withMessage("Title must be at most 101 characters long"),
    body("description")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Description must be at least 3 characters long"),
  ];
}

export default Holiday;

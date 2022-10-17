import { NextFunction, Response } from "express";
import { body, validationResult } from "express-validator";
import FAQLogic from "../logic/faq.logic";
import { AuthRequest } from "../types/core";

class FAQ extends FAQLogic {
  // add to faq
  public async createFAQController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error(
          errors
            .array()
            .map((errors) => errors.msg)
            .join()
            .replace(/[,]/g, " and ")
        );
      }
      const { question, answer } = req.body;
      await super.add({
        question,
        answer,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "FAQ Added Successfully",
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }
  // update to faq
  public async updateFAQController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error(
          errors
            .array()
            .map((errors) => errors.msg)
            .join()
            .replace(/[,]/g, " and ")
        );
      }
      const { question, answer } = req.body;
      await super.update({
        FAQId: req.params?.faqId,
        question,
        answer,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "FAQ updated Successfully",
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
  public async deleteFAQController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { FAQId } = req.params;
      const faq = await super.remove(FAQId);
      res.status(200).json({
        status: "SUCCESS",
        message: "FAQ deleted successfully",
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
  public async getAllFAQController(
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
        message: "FAQ retrieved successfully",
        data: faq,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  public validateCreateFAQ = [
    body("question")
      .not()
      .isEmpty()
      .withMessage("Question is required")
      .isLength({ min: 3 })
      .withMessage("Question must be at least 3 characters long")
      .isLength({ max: 101 })
      .withMessage("Question must be at most 101 characters long"),
    body("answer")
      .not()
      .isEmpty()
      .withMessage("Answer is required")
      .isLength({ min: 3 })
      .withMessage("Answer must be at least 3 characters long"),
  ];
  public validateUpdateFAQ = [
    body("question")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Question must be at least 3 characters long")
      .isLength({ max: 101 })
      .withMessage("Question must be at most 101 characters long"),
    body("answer")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Answer must be at least 3 characters long"),
  ];
}

export default FAQ;

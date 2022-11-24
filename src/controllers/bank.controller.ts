import { NextFunction, Response } from "express";
import { body } from "express-validator";
import { fieldValidateError } from "../helper";
import { BankModel } from "../models/bank.model";
import BankType from "../types/bank";
import { AuthRequest } from "../types/core";

class Bank {
  // create bank
  public async createBank(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      fieldValidateError(req);

      // save bank data to database

      const bankData = await BankModel.findOneAndUpdate(
        { user: req.currentUser?._id },
        {
          fullName: req.body?.fullName,
          accountNumber: req.body?.accountNumber,
          SORDCode: req.body?.SORDCode,
          bankName: req.body?.bankName,
        },
        {
          upsert: true,
          runValidators: true,
          new: true,
        }
      );

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Bank added successfully",
        data: bankData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // get bank
  public async getBank(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      fieldValidateError(req);

      const bankData: BankType | null = await BankModel.findOne({
        user: req.currentUser?._id,
      });

      if (!bankData) throw new Error("Bank not found");

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Bank found successfully",
        data: bankData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // get bank
  public async deleteBank(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      fieldValidateError(req);

      // save bank data to database
      const bankData: BankType | null = await BankModel.findOneAndDelete({
        user: req.currentUser?._id,
      });

      if (!bankData) throw new Error("Bank not found");

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Bank deleted successfully",
        data: bankData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // finds validators for the bank creation request
  public validateUpdateBankFields = [
    body("fullName")
      .optional()
      .exists()
      .isLength({ min: 3 })
      .withMessage("[fullName]:Full name must be at least 3 characters long")
      .isLength({ max: 25 })
      .withMessage("[fullName]:Full name must be at most 25 characters long"),
    body("accountNumber")
      .optional()
      .exists()
      .isLength({ min: 8 })
      .withMessage("accountNumber most be 8 digit.")
      .isLength({ max: 8 })
      .withMessage("accountNumber most be 8 digit."),
    body("SORDCode")
      .optional()
      .exists()
      .isLength({ min: 6 })
      .withMessage("SORDCode most be 6 digit.")
      .isLength({ max: 6 })
      .withMessage("SORDCode most be 6 digit."),
    body("bankName")
      .optional()
      .exists()
      .isLength({ min: 1 })
      .withMessage("[bankName]:Full name must be at least 1 characters long")
      .isLength({ max: 125 })
      .withMessage("[bankName]:Full name must be at most 125 characters long"),
  ];
}

export default Bank;

import { NextFunction, Response } from "express";
import { body, validationResult } from "express-validator";
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

      // save bank data to database
      let bankData = await BankModel.findOne(
        { user: req.currentUser?._id },
        {
          fullName: req.body?.fullName,
          accountNumber: req.body?.accountNumber,
          sortCode: req.body?.sortCode,
          user: req.currentUser?._id,
        }
      );
      //if bank detail not exist, create it
      if (!bankData) {
        bankData = await new BankModel({
          fullName: req.body?.fullName,
          accountNumber: req.body?.accountNumber,
          sortCode: req.body?.sortCode,
          user: req.currentUser?._id,
        }).save();
      }

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
      .isLength({ min: 3 })
      .withMessage("[fullName]:Full name must be at least 3 characters long")
      .isLength({ max: 25 })
      .withMessage("[fullName]:Full name must be at most 25 characters long"),
  ];
}

export default Bank;

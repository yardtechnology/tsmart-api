import { NextFunction, Response } from "express";
import { body } from "express-validator";
import { fieldValidateError } from "../helper";
import StripeLogic from "../logic/stripe.logic";
import { AuthRequest } from "../types/core";

class Payment extends StripeLogic {
  // create product
  public async createPaymentController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      fieldValidateError(req);
      const { email, id } = req.body?.token;
      const { amount, currency } = req.body;
      const data: any = await super.paymentSession({
        amount,
        source: id,
        email,
        currency,
        name: "Lalit sekhar behera",
        address: {
          line1: "TC 9/4 Old MES colony",
          // postal_code: "452331",
          // city: "Indore",
          // state: "Madhya Pradesh",
          country: "United Kingdom",
        },
      });
      res.json({
        status: "SUCCESS",
        message: "Charged Successfully",
        data,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // field validators for the payment request
  public validatePaymentFields = [
    body("amount").not().isEmpty().isInt().withMessage("amount is required"),
    body("currency").not().isEmpty().withMessage("currency is required"),
    body("token.email")
      .not()
      .isEmpty()
      .withMessage("[token.email]:email is required"),
    body("token.id").not().isEmpty().withMessage("[token.id]:id is required"),
  ];
}

export default Payment;

import { NextFunction, Response } from "express";
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
      const { email, id } = req.body?.token;
      const { amount, currency } = req.body;
      const data: any = await super.paymentSession({
        amount,
        source: id,
        email,
        currency,
      });
      console.log({ data });
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
}

export default Payment;

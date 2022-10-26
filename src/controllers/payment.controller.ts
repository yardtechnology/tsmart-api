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
      const data: any = await super.paymentSession({
        amount: 100,
        email: "lalit@gmail.com",
      });
      console.log({ data });
      res.json({
        clientSecret: data.client_secret,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }
}

export default Payment;

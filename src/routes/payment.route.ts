import { Router } from "express";
import PaymentController from "../controllers/payment.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class Payment extends AuthenticateMiddleware {
  public router: Router;
  private orderController: PaymentController;

  constructor() {
    super();
    this.router = Router();
    this.orderController = new PaymentController();
    this.createPaymentRoute();
  }

  // place store service order
  private createPaymentRoute(): void {
    this.router.post(
      "/payment",
      super.isAuthenticated,
      this.orderController.validatePaymentFields,
      this.orderController.createPaymentController
    );
  }
}

export default Payment;
// change

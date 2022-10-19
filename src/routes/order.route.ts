import { Router } from "express";
import OrderController from "../controllers/order.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class Order extends AuthenticateMiddleware {
  public router: Router;
  private orderController: OrderController;

  constructor() {
    super();
    this.router = Router();
    this.orderController = new OrderController();
    this.createOrderRoute();
  }

  // place store service order
  private createOrderRoute(): void {
    this.router.post(
      "/order/repair/store",
      super.isAuthenticated,
      this.orderController.validateOrderPlaceFields,
      this.orderController.placeOrderController
    );
  }
}

export default Order;

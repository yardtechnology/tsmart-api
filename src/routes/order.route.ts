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
    this.createMailInOrderRoute();
    this.createCallOutOrderRoute();
    this.getOrderDetailsRoute();
    this.updateOrderStatusRoute();
  }

  // place store service order
  private createOrderRoute(): void {
    this.router.post(
      "/order/repair/in-store",
      super.isAuthenticated,
      this.orderController.validateOrderPlaceFields,
      this.orderController.placeInStoreOrderController
    );
  }
  // place mail in service order
  private createMailInOrderRoute(): void {
    this.router.post(
      "/order/repair/mail-in",
      super.isAuthenticated,
      this.orderController.validateMailInOrderPlaceFields,
      this.orderController.placeMailInOrderController
    );
  }
  // place mail in service order
  private createCallOutOrderRoute(): void {
    this.router.post(
      "/order/repair/call-out",
      super.isAuthenticated,
      this.orderController.validateCallOutOrderPlaceFields,
      this.orderController.placeCallOutOrderController
    );
  }
  // get order details
  private getOrderDetailsRoute(): void {
    this.router.get(
      "/orders/:orderId",
      super.isAuthenticated,
      this.orderController.validateGetOrderDetails,
      this.orderController.getOrderDetailsController
    );
  }

  //order status and ETA update
  private updateOrderStatusRoute(): void {
    this.router.put(
      "/orders/:orderId/status",
      super.isAuthenticated,
      this.orderController.validateUpdateOrderStatus,
      this.orderController.updateOrderStatusController
    );
  }

  //TODO: add a route for adding extra fees
}

export default Order;

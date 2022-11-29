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
    this.createProductOrderRoute();
    this.createCartOrderRoute();
    this.getOrderDetailsRoute();
    this.updateOrderStatusRoute();
    this.createOrderPaymentRoute();
    this.reactNativePaymentIntentsControllerRoute();
    this.makeOrderPaidRoute();
    this.createSellOrderRoute();
    this.getOrderSummaryRoute();
    this.addExtraChargesRoute();
    this.getJobRequest();
    this.acceptJobRequest();
    this.getAllOrders();
    this.orderCancelationRoute();
    this.getOrderInvoiceRoute();
  }

  //get all orders
  private getAllOrders(): void {
    this.router.get(
      "/orders",
      this.isAuthenticated,
      this.orderController.getAllOrdersController
    );
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
  // place mail in service order
  private createSellOrderRoute(): void {
    this.router.post(
      "/order/sell",
      super.isAuthenticated,
      this.orderController.validateSellOrderPlaceFields,
      this.orderController.placeSellOrderController
    );
  }
  // place mail in service order
  private createProductOrderRoute(): void {
    this.router.post(
      "/order/product",
      super.isAuthenticated,
      this.orderController.validateProductOrderPlaceFields,
      this.orderController.placeProductOrderController
    );
  }
  // place mail in service order
  private createCartOrderRoute(): void {
    this.router.post(
      "/order/cart",
      super.isAuthenticated,
      this.orderController.validateCartOrderPlaceFields,
      this.orderController.placeCartOrderController
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
  // get order invoice
  private getOrderInvoiceRoute(): void {
    this.router.put(
      "/orders/:orderId/invoice",
      super.isAuthenticated,
      this.orderController.validateGetOrderInvoice,
      this.orderController.getOrderInvoiceController
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

  //order payment
  private createOrderPaymentRoute(): void {
    this.router.post(
      "/orders/bill/payment",
      super.isAuthenticated,
      this.orderController.validateOrderPaymentFields,
      this.orderController.payOrderAmount
    );
  }
  //react-native payment initiate
  private reactNativePaymentIntentsControllerRoute(): void {
    this.router.post(
      "/orders/bill/payment-initiate",
      super.isAuthenticated,
      this.orderController.reactNativePaymentIntentsController
    );
  }
  //make order paid
  private makeOrderPaidRoute(): void {
    this.router.post(
      "/orders/bill/payment-paid",
      super.isAuthenticated,
      this.orderController.makeOrderPaidController
    );
  }

  //get order summary
  private getOrderSummaryRoute(): void {
    this.router.get(
      "/order/summary",
      super.isAuthenticated,
      this.orderController.productOrderSummery
    );
  }

  // add  extra fees
  private addExtraChargesRoute(): void {
    this.router.get(
      "/orders/:orderId/extra-fees",
      super.isAuthenticated,
      this.orderController.validateAddExtraChargesFields,
      this.orderController.addExtraChargesController
    );
  }

  //get job requests
  private getJobRequest(): void {
    this.router.get(
      "/technician/job-requests",
      this.isAuthenticated,
      this.orderController.getJobRequestController
    );
  }
  //accept job requests
  private acceptJobRequest(): void {
    this.router.put(
      "/orders/:orderId/job-accept",
      this.isAuthenticated,
      this.orderController.validateAcceptJobRequestFields,
      this.orderController.acceptJobRequestController
    );
  }
  //order cancelation
  private orderCancelationRoute(): void {
    this.router.put(
      "/orders/:orderId/cancel",
      this.isAuthenticated,
      this.orderController.orderCancelationController
    );
  }
}

export default Order;

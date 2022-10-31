import { NextFunction, Response } from "express";
import { body, param } from "express-validator";
import { fieldValidateError } from "../helper";
import BillingLogic from "../logic/billing.logic";
import OrderLogic from "../logic/order.logic";
import { AuthRequest } from "../types/core";
import { OrderStatus } from "../types/order";
import MailController from "./mail.controller";

class Order extends OrderLogic {
  /** make order */
  public async placeInStoreOrderController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      //place Walk in Repairing Order [STORE]
      const orderData = await super.placeInStoreServiceOrder({
        storeId: req.body?.storeId,
        userId: req.currentUser?._id as string,
        serviceTime: req.body?.serviceTime,
        serviceIds: req.body?.serviceIds,
      });
      await new BillingLogic().createBill(orderData?._id, {
        status: "PAID",
      });

      res.status(200).json({
        status: "SUCCESS",
        message: "Order placed successfully",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }
  /** make mail in order */
  public async placeMailInOrderController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      //place Walk in Repairing Order [STORE]
      const orderData = await super.placeMailInServiceOrder({
        userId: req.currentUser?._id as string,
        addressId: req.body?.addressId,
        serviceIds: req.body?.serviceIds,
      });
      await new BillingLogic().createBill(orderData?._id, {
        status: "PAID",
      });

      res.status(200).json({
        status: "SUCCESS",
        message: "Order placed successfully",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }
  /** make call out order */
  public async placeCallOutOrderController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      //place Walk in Repairing Order [STORE]
      const orderData = await super.placeCallOutOrder({
        userId: req.currentUser?._id as string,
        latitude: req.body?.latitude,
        longitude: req.body?.longitude,
        street: req.body?.street,
        serviceIds: req.body?.serviceIds,
      });
      await new BillingLogic().createBill(orderData?._id, {
        status: "PAID",
      });

      res.status(200).json({
        status: "SUCCESS",
        message: "Order placed successfully",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }

  /** get order details*/
  public async getOrderDetailsController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);

      const orderData = await super.getOrderDetails(req.params.orderId);
      await new BillingLogic().createBill(orderData?._id, {
        status: "PAID",
      });

      res.status(200).json({
        status: "SUCCESS",
        message: "Order details found successfully",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * order status and ETA update
   */
  public async updateOrderStatusController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      const orderData = await super.updateOrderStatus({
        orderId: req.params.orderId,
        status: req.body.status as OrderStatus,
        eta: new Date(req.body.eta as string),
      });
      //send mail to user to notify about order status
      new MailController().sendMail({
        to: orderData.user.email,
        subject: "Order status updated",
        text: `
        Hi ${orderData.user.displayName},
        ${
          (req.body.status || orderData?.status?.replace(/_/g, " ")) &&
          `Your order ${orderData.id} has been updated to ${
            req.body.status || orderData?.status?.replace(/_/g, " ")
          }.`
        }
        ${
          orderData?.ETA &&
          `We will deliver your order by ${new Date(
            orderData?.ETA
          ).toLocaleString()}.`
        }
        Thanks,`,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Order status updated",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }

  public validateOrderPlaceFields = [
    body("storeId")
      .not()
      .isEmpty()
      .withMessage("Store Id is required")
      .isMongoId()
      .withMessage("Not a valid Store Id"),
    body("serviceTime").not().isEmpty().withMessage("Service time is required"),
    body("serviceIds.*")
      .isMongoId()
      .withMessage("serviceIds must be a valid service id"),
  ];
  public validateMailInOrderPlaceFields = [
    body("addressId")
      .not()
      .isEmpty()
      .withMessage("AddressId is required")
      .isMongoId()
      .withMessage("Not a valid Address Id"),
    body("serviceIds.*")
      .isMongoId()
      .withMessage("serviceIds must be a valid service id"),
  ];
  public validateCallOutOrderPlaceFields = [
    body("latitude").not().isEmpty().withMessage("latitude is required"),
    body("longitude").not().isEmpty().withMessage("longitude is required"),
    body("serviceIds.*")
      .isMongoId()
      .withMessage("serviceIds must be a valid service id"),
  ];

  public validateGetOrderDetails = [
    param("orderId").isMongoId().withMessage("Not a valid order id"),
  ];
  public validateUpdateOrderStatus = [
    param("orderId").isMongoId().withMessage("Not a valid order id"),
    body("status")
      .isIn([
        "INITIATED",
        "COMPLETED",
        "CANCELLED",
        "CONFIRMED",
        "PACKED",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "RECEIVED",
        "PAID",
        "TECHNICIAN_ASSIGNED",
        "TECHNICIAN_REACHED",
        "REPAIRED",
        "ADD_ON_SERVICE",
      ])
      .withMessage("not a valid status"),
    body("eta")
      .optional()
      .custom((value) => !isNaN(new Date(value).getMonth()))
      .withMessage("not a valid date"),
  ];
}

export default Order;

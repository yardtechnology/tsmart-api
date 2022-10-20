import { NextFunction, Response } from "express";
import { body, param } from "express-validator";
import { fieldValidateError } from "../helper";
import OrderLogic from "../logic/order.logic";
import { AuthRequest } from "../types/core";

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

      res.status(200).json({
        status: "SUCCESS",
        message: "Order details found successfully",
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
}

export default Order;

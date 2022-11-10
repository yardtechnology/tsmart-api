import { NextFunction, Response } from "express";
import { query } from "express-validator";
import { fieldValidateError } from "../helper";
import { OrderModel } from "../models/order.model";
import { ProductModel } from "../models/product.model";
import { StoreModel } from "../models/store.model";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";

class DashboardController {
  async orderStatusAndServiceType(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { status, serviceType, type } = req.query;
      const arrayStatusCheck = status
        ? Array.isArray(status)
          ? status
          : [status]
        : undefined;
      const arrayServiceTypeCheck = serviceType
        ? Array.isArray(serviceType)
          ? serviceType
          : [serviceType]
        : undefined;

      const query: any = {};
      arrayStatusCheck && (query["status"] = { $in: arrayStatusCheck });
      arrayServiceTypeCheck &&
        (query["serviceType"] = { $in: arrayServiceTypeCheck });
      type && (query["type"] = type);
      const orderStatusCount = await OrderModel.find({ ...query }).count();
      res.json({
        status: "SUCCESS",
        message: "Order count fetched successfully",
        data: orderStatusCount,
      });
    } catch (error) {
      next(error);
    }
  }

  async totalUserCount(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { role } = req.query;
      const arg: any = {};
      role && (arg["role"] = role);
      fieldValidateError(req);
      const totalUserCount = await UserModel.find(arg).count();
      res.json({
        status: "SUCCESS",
        message: "Users found successfully.",
        data: totalUserCount,
      });
    } catch (error) {
      next(error);
    }
  }
  async repairOrderCount(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { orderStatus } = req.query;
      fieldValidateError(req);
      const orderTypeArg: any = {};
      orderStatus === "REPAIRED" && (orderTypeArg["status"] = "COMPLETED");
      const orderData = await OrderModel.find({
        serviceType: { $exists: true },
        ...orderTypeArg,
      }).count();
      res.json({
        status: "SUCCESS",
        message: "Repair order count fetched successfully.",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }
  async refurbishedProductCount(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { type = "REFURBISHED" } = req.query;
      fieldValidateError(req);
      const refurbishOrderCount = await ProductModel.find({
        type,
      }).count();

      res.json({
        status: "SUCCESS",
        message: `${
          type === "REFURBISHED" ? "Refurbished" : "Accessory"
        } product count fetched successfully.`,
        data: refurbishOrderCount,
      });
    } catch (error) {
      next(error);
    }
  }
  async revenue(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const revenueCalculation = await OrderModel.aggregate([
        {
          $group: {
            _id: null,
            buyRevenue: {
              $sum: {
                $cond: [{ $eq: ["$type", "BUY"] }, "$price", 0],
              },
            },
            sellRevenue: {
              $sum: {
                $ifNull: ["$price", 0],
              },
            },
            repairRevenue: {
              $sum: {
                $cond: [{ $eq: ["$type", "REPAIR"] }, "$price", 0],
              },
            },
          },
        },
      ]);
      const resultData = {
        ...revenueCalculation?.[0],
        _id: undefined,
      };

      res.json({
        status: "SUCCESS",
        message: "Revenue calculation fetched successfully.",
        data: resultData,
      });
    } catch (error) {
      next(error);
    }
  }
  async storeCount(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const storeCount = await StoreModel.find({ type: "STORE" }).count();
      res.json({
        status: "SUCCESS",
        data: storeCount,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const DashboardControllerValidation = {
  orderStatusAndServiceType: [
    query("status")
      .optional()
      .exists()
      .custom((value) => {
        const arrayCheck = Array.isArray(value) ? value : [value];
        const allDataArray = [
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
        ];
        const filterData = arrayCheck.filter((item) =>
          allDataArray.find((item2) => item === item2)
        );
        return Boolean(filterData.length);
      })
      .withMessage(
        "Status must be among of these INITIATED,COMPLETED, CANCELLED, CONFIRMED, PACKED, SHIPPED, OUT_FOR_DELIVERY,DELIVERED, RECEIVED, PAID, TECHNICIAN_ASSIGNED, TECHNICIAN_REACHED, REPAIRED, ADD_ON_SERVICE "
      ),
    query("serviceType")
      .optional()
      .exists()
      .custom((value) => {
        const arrayCheck = Array.isArray(value) ? value : [value];
        const allDataArray = ["IN_STOR", "MAIL_IN", "CALL_OUT"];
        const filterData = arrayCheck.filter((item) =>
          allDataArray.find((item2) => item === item2)
        );
        return Boolean(filterData.length);
      })
      .withMessage(
        "ServiceType must be among of these  IN_STOR or MAIL_IN or CALL_OUT."
      ),
    query("type")
      .optional()
      .exists()
      .custom((value) => {
        const arrayCheck = Array.isArray(value) ? value : [value];
        const allDataArray = ["SELL", "BUY"];
        const filterData = arrayCheck.filter((item) =>
          allDataArray.find((item2) => item === item2)
        );
        return Boolean(filterData.length);
      })
      .withMessage("type must be among of these  SELL or BUY."),
  ],
  repairOrderCount: [
    query("orderStatus")
      .optional()
      .exists()
      .custom((value) =>
        Boolean(
          ["REPAIRED", "PENDING"].includes(value?.toString()?.toUpperCase())
        )
      )
      .withMessage("orderStatus most be REPAIRED or PENDING."),
  ],
  refurbishedProductCount: [
    query("type")
      .optional()
      .exists()

      .custom((value) =>
        Boolean(["REFURBISHED", "ACCESSORY"].find((item) => item === value))
      )
      .withMessage("type most be REFURBISHED or ACCESSORY."),
  ],
  totalUserCount: [
    query("role")
      .optional()
      .exists()

      .custom((value) =>
        Boolean(
          ["USER", "MANAGER", "ADMIN", "TECHNICIAN"].find(
            (item) => item === value
          )
        )
      )

      .withMessage("type most be USER or MANAGER or ADMIN or TECHNICIAN."),
  ],
};

export default DashboardController;

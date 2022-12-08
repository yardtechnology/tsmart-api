import { NextFunction, Response } from "express";
import { Types } from "mongoose";
import { OrderModel } from "../models/order.model";
import { ProductModel } from "../models/product.model";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";

class RefurbishedDashboardController {
  async refurbishedByCategory(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const role = req?.currentUser?.role;
      let managerFilter: any[] = [{ $eq: ["$type", "REFURBISHED"] }];
      if (role === "MANAGER") {
        const findUser = await UserModel.findById(req?.currentUser?._id);
        managerFilter.push([
          {
            $eq: ["$store", new Types.ObjectId(findUser?.store?.toString())],
          },
        ]);
      }

      const allProduct = await ProductModel.aggregate([
        {
          $match: {
            $expr: {
              $and: managerFilter,
            },
          },
        },

        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            count: 1,
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: {
            path: "$category",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            category: "$category.name",
            count: 1,
          },
        },
      ]);
      res.json({
        data: allProduct,
        status: "SUCCESS",
        message: "Product category fetch successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
  async topBrands(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const allProduct = await ProductModel.aggregate([
        {
          $match: {
            type: "REFURBISHED",
          },
        },
        {
          $group: {
            _id: "$make",
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            count: 1,
          },
        },
        {
          $lookup: {
            from: "makes",
            localField: "_id",
            foreignField: "_id",
            as: "make",
            pipeline: [
              {
                $project: {
                  title: 1,
                  image: 1,
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: "$make",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);
      res.json({
        status: "SUCCESS",
        message: "Product category fetch successfully.",
        data: allProduct,
      });
    } catch (error) {
      next(error);
    }
  }
  async card(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const currentYearLowDate = new Date(new Date().getFullYear(), 0);
      const currentYearHighDate = new Date(
        new Date().getFullYear(),
        11,
        31,
        23,
        59,
        59
      );

      const role = req?.currentUser?.role;
      let managerQuery = {};
      const managerFilter: any[] = [];
      if (role === "MANAGER") {
        const findUser = await UserModel.findById(req?.currentUser?._id);
        managerQuery = { store: findUser?.store };
        findUser?.store &&
          managerFilter.push({
            $eq: ["$store", new Types.ObjectId(findUser?.store?.toString())],
          });
      }

      const totalRefurbished = await ProductModel.find({
        type: "REFURBISHED",
        ...managerQuery,
      }).count();
      const totalRefurbishedDatabase = await ProductModel.find({
        type: "REFURBISHED",
      }).count();
      console.log(managerFilter);
      const todayRefurbished = await ProductModel.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ["$type", "REFURBISHED"],
                },
                {
                  $gte: ["$createdAt", new Date(currentYearLowDate)],
                },
                {
                  $lte: ["$createdAt", new Date(currentYearHighDate)],
                },
                ...managerFilter,
              ],
            },
          },
        },
        {
          $count: "total",
        },
      ]);
      res.json({
        status: "SUCCESS",
        message: "Refurbished card data found successfully.",
        data: {
          totalRefurbished,
          todayRefurbished: todayRefurbished?.[0]?.total || 0,
          totalRefurbishedDatabase,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async managerMonthly(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const currentDateRoot = new Date(
        new Date().getFullYear(),
        new Date().getMonth()
      );
      const mS = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      const orderData = await OrderModel.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ["$type", "REPAIR"],
                },
                {
                  $eq: ["$serviceType", "IN_STOR"],
                },
              ],
            },
          },
        },
        {
          $addFields: {
            endDate: new Date(currentDateRoot),
            startDate: {
              $dateSubtract: {
                startDate: new Date(currentDateRoot),
                unit: "year",
                amount: 1,
              },
            },
          },
        },
        {
          $match: {
            $expr: {
              $and: [
                {
                  $gte: ["$createdAt", "$startDate"],
                },
                {
                  $lte: ["$createdAt", "$endDate"],
                },
              ],
            },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $addFields: {
            monthNumber: {
              $month: "$createdAt",
            },
          },
        },
        {
          $group: {
            _id: null,
            [`${mS[1]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 1] }, 1, 0] },
            },
            [`${mS[2]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 2] }, 1, 0] },
            },
            [`${mS[3]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 3] }, 1, 0] },
            },
            [`${mS[4]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 4] }, 1, 0] },
            },
            [`${mS[5]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 5] }, 1, 0] },
            },
            [`${mS[6]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 6] }, 1, 0] },
            },
            [`${mS[7]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 7] }, 1, 0] },
            },
            [`${mS[8]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 8] }, 1, 0] },
            },
            [`${mS[9]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 9] }, 1, 0] },
            },
            [`${mS[10]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 10] }, 1, 0] },
            },
            [`${mS[11]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 11] }, 1, 0] },
            },
            [`${mS[12]}`]: {
              $sum: { $cond: [{ $eq: ["$monthNumber", 12] }, 1, 0] },
            },
          },
        },
      ]);
      res.json({
        status: "SUCCESS",
        message: "Month wise repair in store found successfully.",
        data: orderData?.[0],
      });
    } catch (error) {
      next(error);
    }
  }
}

export default RefurbishedDashboardController;

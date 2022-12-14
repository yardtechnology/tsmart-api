import { NextFunction, Response } from "express";
import { Types } from "mongoose";
import { paginationHelper } from "../helper";
import { PopularPageSchema, VisitorSchema } from "../models";
import { OrderModel } from "../models/order.model";
import { ProductModel } from "../models/product.model";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";
class DashboardDashboardController {
  async card(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const role = req?.currentUser?.role;
      let managerFilter: any[] = [];
      if (role === "MANAGER") {
        const findUser = await UserModel.findById(req?.currentUser?._id);
        managerFilter = [
          {
            $match: {
              storeID: new Types.ObjectId(findUser?.store?.toString()),
            },
          },
        ];
      }

      const orderCount = await OrderModel.aggregate([
        ...managerFilter,
        {
          $group: {
            _id: null,
            repairs: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$type", "REPAIR"],
                  },
                  1,
                  0,
                ],
              },
            },
            refurbished: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$type", "REFURBISH"],
                  },
                  1,
                  0,
                ],
              },
            },
            accessory: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$type", "ACCESSORY"],
                  },
                  1,
                  0,
                ],
              },
            },
            brought: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$type", "SELL"],
                  },
                  1,
                  0,
                ],
              },
            },
            totalRevenue: { $sum: "$price" },
            totalCompleteOrder: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$status", "COMPLETED"],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ]);
      const userCount = await UserModel.aggregate([
        {
          $match: {
            $expr: {
              $in: ["$role", ["USER", "TECHNICIAN"]],
            },
          },
        },
        {
          $group: {
            _id: null,
            customerCount: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$role", "USER"],
                  },
                  1,
                  0,
                ],
              },
            },
            technicianCount: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$role", "TECHNICIAN"],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
        {
          $lookup: {
            from: "stores",
            as: "storeCount",
            pipeline: [{ $project: { _id: 1 } }],
          },
        },
        {
          $addFields: {
            storeCount: { $size: "$storeCount" },
          },
        },
      ]);
      res.json({
        status: "SUCCESS",
        message: "Order card count box get successfully.",
        data: { ...orderCount?.[0], ...userCount?.[0] },
      });
    } catch (error) {
      next(error);
    }
  }
  async topTechnician(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const topTechnician = await paginationHelper({
        model: UserModel,
        query: { role: "TECHNICIAN" },
        limit: req.query.limit,
        chunk: req.query.chunk,
        sort: { "reviews.stars": -1 },
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Top Technician get successfully",
        data: topTechnician,
      });
    } catch (error) {
      next(error);
    }
  }

  async stock(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const role = req?.currentUser?.role;
      let managerFilter: any[] = [];
      let productStuck: any[] = [];
      if (role === "MANAGER") {
        const findUser = await UserModel.findById(req?.currentUser?._id);
        managerFilter = [
          {
            $match: {
              store: new Types.ObjectId(findUser?.store?.toString()),
            },
          },
        ];
        productStuck = [
          {
            $match: { store: new Types.ObjectId(findUser?.store?.toString()) },
          },
        ];
      }
      !productStuck?.length &&
        productStuck.push({
          $project: {
            product: 1,
            stock: 1,
            store: 1,
          },
        });
      const productCount = await ProductModel.aggregate([
        ...managerFilter,
        {
          $lookup: {
            from: "productstocks",
            localField: "_id",
            foreignField: "product",
            as: "storeStock",
            pipeline: productStuck,
          },
        },
        {
          $addFields: {
            storeStock: {
              $cond: [
                {
                  $gte: [{ $size: "$storeStock" }, 1],
                },
                {
                  $reduce: {
                    input: "$storeStock",
                    initialValue: 0,
                    in: {
                      $add: ["$$value", "$$this.stock"],
                    },
                  },
                },
                0,
              ],
            },
          },
        },
        {
          $addFields: {
            stock: { $add: ["$stock", "$storeStock"] },
          },
        },
        {
          $group: {
            _id: null,
            refurbishedCount: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$type", "REFURBISHED"],
                  },
                  "$stock",
                  0,
                ],
              },
            },
            accessoryCount: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$type", "ACCESSORY"],
                  },
                  "$stock",
                  0,
                ],
              },
            },
          },
        },
      ]);
      res.status(200).json({
        status: "SUCCESS",
        message: "Product count get successfully",
        data: productCount?.[0],
      });
    } catch (error) {
      next(error);
    }
  }
  async visitors(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const getVisitorCount = await VisitorSchema.findOne({});
      res.json({
        status: "SUCCESS",
        message: "Visitor data found successfully.",
        data: getVisitorCount,
      });
    } catch (error) {
      next(error);
    }
  }
  async popularPage(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const popularPage = await paginationHelper({
        model: PopularPageSchema,
        query: {},
        limit: req.query.limit,
        chunk: req.query.chunk,
        sort: { count: -1 },
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Popular page get successfully",
        data: popularPage,
      });
    } catch (error) {
      next(error);
    }
  }
  async monthWiseOrder(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const currentDateRoot = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      );
      const role = req?.currentUser?.role;
      const managerFilter: any[] = [
        {
          $in: ["$type", ["ACCESSORY", "REFURBISH"]],
        },
      ];
      if (role === "MANAGER") {
        const findUser = await UserModel.findById(req?.currentUser?._id);
        managerFilter.push({
          $eq: ["$storeID", new Types.ObjectId(findUser?.store?.toString())],
        });
      }

      const orderData = await OrderModel.aggregate([
        ...managerFilter,
        {
          $match: {
            $expr: {
              $and: managerFilter,
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
      ]);
      res.json({
        status: "SUCCESS",
        message: "Order data found successfully.",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }

  async repairReport(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const currentDateRoot = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      );
      const role = req?.currentUser?.role;
      const managerFilter: any[] = [
        {
          $eq: ["$type", "REPAIR"],
        },
      ];
      if (role === "MANAGER") {
        const findUser = await UserModel.findById(req?.currentUser?._id);
        managerFilter.push({
          $eq: ["$storeID", new Types.ObjectId(findUser?.store?.toString())],
        });
      }

      const orderData = await OrderModel.aggregate([
        {
          $match: {
            $expr: {
              $and: managerFilter,
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
        { $sort: { createdAt: -1 } },
        {
          $addFields: {
            monthNumber: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$monthNumber",
            inStore: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$serviceType", "IN_STOR"],
                  },
                  1,
                  0,
                ],
              },
            },
            mailIn: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$serviceType", "MAIL_IN"],
                  },
                  1,
                  0,
                ],
              },
            },
            callIn: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$serviceType", "CALL_OUT"],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ]);

      res.json({
        status: "SUCCESS",
        message: "Repair graph data found successfully.",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default DashboardDashboardController;

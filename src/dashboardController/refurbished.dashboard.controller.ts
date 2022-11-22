import { NextFunction, Response } from "express";
import { ProductModel } from "../models/product.model";
import { AuthRequest } from "../types/core";

class RefurbishedDashboardController {
  async refurbishedByCategory(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const allProduct = await ProductModel.aggregate([
        {
          $match: {
            type: "REFURBISHED",
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

      const totalRefurbished = await ProductModel.find({
        type: "REFURBISHED",
      }).count();
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
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default RefurbishedDashboardController;

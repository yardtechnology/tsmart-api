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
      const bulk = ProductModel.collection.initializeOrderedBulkOp();
      bulk.find({
        // type:"REFURBISHED"
      });
      //   bulk.find({
      //     type: "REFURBISHED",
      //   });
      const allData = await bulk.execute();
      res.json({
        status: "SUCCESS",
        message: "Refurbished card data fetch successfully.",
        data: allData,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default RefurbishedDashboardController;

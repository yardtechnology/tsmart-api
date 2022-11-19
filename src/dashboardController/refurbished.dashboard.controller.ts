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
}

export default RefurbishedDashboardController;

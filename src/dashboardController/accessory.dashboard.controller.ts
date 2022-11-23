import { NextFunction, Response } from "express";
import { CategoryModel } from "../models/category.model";
import { AuthRequest } from "../types/core";

class AccessoryDashboardController {
  async circularGraph(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const categoryAccessory = await CategoryModel.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "category",
            as: "product",
            pipeline: [
              {
                $match: {
                  type: "ACCESSORY",
                },
              },
            ],
          },
        },
      ]);

      res.json({
        status: "SUCCESS",
        message: "Accessory graph data found successfully.",
        data: categoryAccessory,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AccessoryDashboardController;

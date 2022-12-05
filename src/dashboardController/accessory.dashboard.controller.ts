import { NextFunction, Response } from "express";
import { Types } from "mongoose";
import paginationHelper, { aggregationData } from "../helper/pagination.helper";
import { CategoryModel } from "../models/category.model";
import { ProductModel } from "../models/product.model";
import { UserModel } from "../models/user.model";
import CategoryType from "../types/category";
import { AuthRequest } from "../types/core";

class AccessoryDashboardController {
  async circularGraph(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { limit, chunk } = req.query;
      const role = req?.currentUser?.role;
      let managerFilter: any[] = [];
      if (role === "MANAGER") {
        const findUser = await UserModel.findById(req?.currentUser?._id);
        managerFilter = [
          {
            $eq: ["$store", new Types.ObjectId(findUser?.store?.toString())],
          },
        ];
      }

      //  req?.currentUser?._id
      const aggregationQuery = [
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "category",
            as: "product",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$type", "ACCESSORY"],
                      },
                      ...managerFilter,
                    ],
                  },
                },
              },
            ],
          },
        },
        {
          $addFields: {
            product: { $size: "$product" },
          },
        },
        {
          $project: {
            name: 1,
            product: 1,
          },
        },
        {
          $sort: {
            product: -1,
          },
        },
      ];
      const categoryAccessory = await aggregationData<CategoryType>({
        model: CategoryModel,
        query: aggregationQuery,
        position: aggregationQuery.length,
        limit: limit ? Number(limit) : undefined,
        chunk: chunk ? Number(chunk) : undefined,
        sort: { product: 1 },
      });

      const totalData = categoryAccessory?.data?.reduce(
        (acc: number, item: any) => item?.product + acc,
        0
      );
      const categoryWithPercentage = categoryAccessory?.data?.map(
        (item: any) => ({
          ...item,
          percentage: Math.round((item?.product * 100) / totalData),
        })
      );

      res.json({
        status: "SUCCESS",
        message: "Accessory graph data found successfully.",
        data: { categoryWithPercentage, totalData },
      });
    } catch (error) {
      next(error);
    }
  }
  async card(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const currentDateRoot = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      );
      const currentDateHigh = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        23,
        59,
        59
      );
      const role = req?.currentUser?.role;
      let managerQuery = {};
      if (role === "MANAGER") {
        const findUser = await UserModel.findById(req?.currentUser?._id);
        managerQuery = { store: findUser?.store };
      }
      const totalAccessories = await ProductModel.find({
        type: "ACCESSORY",
        ...managerQuery,
      }).count();
      const totalTodayAccessories = await ProductModel.find({
        type: "ACCESSORY",
        ...managerQuery,
        $and: [
          { createdAt: { $gte: new Date(currentDateRoot) } },
          {
            createdAt: new Date(currentDateHigh),
          },
        ],
      }).count();

      res.json({
        status: "SUCCESS",
        message: "Accessory card data found successfully.",
        data: { totalAccessories, totalTodayAccessories },
      });
    } catch (error) {
      next(error);
    }
  }
  async topAccessories(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { limit, chunk } = req.query;
      const role = req?.currentUser?.role;
      let managerQuery = {};
      if (role === "MANAGER") {
        const findUser = await UserModel.findById(req?.currentUser?._id);
        managerQuery = { store: findUser?.store };
      }

      const getAll = await paginationHelper({
        model: ProductModel,
        query: { type: "ACCESSORY", ...managerQuery },
        chunk: chunk ? Number(chunk) : undefined,
        limit: limit ? Number(limit) : undefined,
        select: "",
        populate: "",
        sort: {
          stock: -1,
        },
      });
      res.json({
        status: "SUCCESS",
        message: "Accessory card data found successfully.",
        data: getAll,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AccessoryDashboardController;

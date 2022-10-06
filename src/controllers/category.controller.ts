import { NextFunction, Response } from "express";
import { body, validationResult } from "express-validator";
import paginationHelper from "../helper/pagination.helper";
import MediaLogic from "../logic/media.logic";
import { CategoryModel } from "../models/category.model";
import CategoryType from "../types/category";
import { AuthRequest } from "../types/core";

class Category extends MediaLogic {
  // create address
  public async createCategory(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error(
          errors
            .array()
            .map((errors) => errors.msg)
            .join()
            .replace(/[,]/g, " and ")
        );
      }

      // upload user profile picture
      const imageFile = req.files?.image;
      const filePath = `${req.currentUser?._id}`;
      const imageData: any | undefined =
        imageFile && !Array.isArray(imageFile)
          ? await super.uploadMedia(imageFile, filePath)
          : undefined;

      // save user data to database
      const categoryData: CategoryType = await new CategoryModel({
        name: req.body?.name,
        description: req.body?.description,
        image: imageData?.url,
        imagePath: imageData?.path,
        parentCategory: req.body?.parentCategory,
        isActive: req.body?.isActive,
      }).save();

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Category added successfully",
        data: categoryData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // update address
  public async updateCategory(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error(
          errors
            .array()
            .map((errors) => errors.msg)
            .join()
            .replace(/[,]/g, " and ")
        );
      }

      // upload user category image
      const imageFile = req.files?.image;
      const filePath = `${req.currentUser?._id}`;
      const imageData: any | undefined =
        imageFile && !Array.isArray(imageFile)
          ? await super.uploadMedia(imageFile, filePath)
          : undefined;

      // save user data to database
      const categoryData: CategoryType | null =
        await CategoryModel.findByIdAndUpdate(req.params.categoryId, {
          name: req.body?.name,
          description: req.body?.description,
          image: imageData?.url,
          imagePath: imageData?.path,
          isFeatured: req.body?.isFeatured,
          parentCategory: req.body?.parentCategory,
          isActive: req.body?.isActive,
        });

      if (!categoryData) throw new Error("Category not found");

      // delete previous avatar
      imageData?.path &&
        categoryData?.imagePath &&
        super.deleteMedia(categoryData?.imagePath);

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Category updated successfully",
        data: categoryData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // get address
  public async getCategory(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // save user data to database
      const categoryData: CategoryType | null = await CategoryModel.findById(
        req.params.categoryId
      )
        .populate("parentCategory")
        .select("-imagePath");

      if (!categoryData) throw new Error("Category not found");

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Category found successfully",
        data: categoryData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  //   get all category
  public async getAllCategory(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // save user data to database
      const query = {
        parentCategory: req.query.parentCategory,
      };

      !req.query.parentCategory && delete query.parentCategory;

      const categoryData = await paginationHelper({
        model: CategoryModel,
        query: query,
        select: "-imagePath",
        sort: { createdAt: -1 },
        populate: "parentCategory",
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
      });

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "All category found successfully",
        data: categoryData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // get address
  public async deleteCategory(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // save user data to database
      const categoryData: CategoryType | null =
        await CategoryModel.findByIdAndDelete(req.params.categoryId);

      if (!categoryData) throw new Error("Category not found");

      // delete previous avatar
      categoryData?.imagePath && super.deleteMedia(categoryData?.imagePath);

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Category deleted successfully",
        data: categoryData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  //TODO: GET ALL PRODUCTS BY CATEGORY

  //get all featured category
  public async getAllFeaturedCategory(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // save user data to database
      const allFeaturedCategory = await CategoryModel.find({
        isFeatured: true,
      });

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "All featured category found successfully",
        data: allFeaturedCategory,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // finds validators for the user creation request
  public validateCreateCategoryFields = [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .isLength({ max: 20 })
      .withMessage("Name must be at most 20 characters long"),
    body("description")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long")
      .isLength({ max: 51 })
      .withMessage("Description must be at most 51 characters long"),
    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("isActive must be a boolean"),
  ];
}

export default Category;

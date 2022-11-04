import { NextFunction, Response } from "express";
import { body, validationResult } from "express-validator";
import paginationHelper from "../helper/pagination.helper";
import BannerLogic from "../logic/banner.logic";
import { BannerModel } from "../models/banner.model";
import { AuthRequest } from "../types/core";

class Banner extends BannerLogic {
  // create Banner
  public async createBannerController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
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

      const bannerData = await super.createBanner({
        title: req.body.title,
        description: req.body.description,
        imageFile: req.files?.image,
        link: req.body.link,
        data: {
          screen: req.body.dataScreen || req.body.data?.screen,
          id: req.body.dataId || req.body.data?.id,
        },
        type: req.body.type,
        themeColor: req.body.themeColor,
        textColor: req.body.textColor,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Banner created successfully",
        data: bannerData,
      });
    } catch (error) {
      next(error);
    }
  }

  //update banner
  public async updateBannerController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
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

      const bannerData = await super.updateBanner({
        id: req.params.bannerId,
        title: req.body.title,
        description: req.body.description,
        imageFile: req.files?.image,
        data: {
          screen: req.body.dataScreen || req.body.data?.screen,
          id: req.body.dataId || req.body.data?.id,
        },
        link: req.body.link,
        type: req.body.type,
        themeColor: req.body.themeColor,
        textColor: req.body.textColor,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Banner updated successfully",
        data: bannerData,
      });
    } catch (error) {
      next(error);
    }
  }

  //get all banners
  public async getAllBannersController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const query = { type: req?.query?.type?.toString()?.toUpperCase() };
      !req?.query?.type && delete query.type;

      const banners = await paginationHelper({
        model: BannerModel,
        query,
        limit: req.query.limit,
        chunk: req.query.chunk,
        sort: { createdAt: -1 },
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Banners found successfully",
        data: banners,
      });
    } catch (error) {
      next(error);
    }
  }

  //delete banner
  public async deleteBannerController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const bannerData = await super.deleteBanner(req.params.bannerId);
      res.status(200).json({
        status: "SUCCESS",
        message: "Banner deleted successfully",
        data: bannerData,
      });
    } catch (error) {
      next(error);
    }
  }

  public validateCreateBannerFields = [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3, max: 25 })
      .withMessage("Title must be between 3 and 25 characters"),
    body("link")
      .optional()
      .isLength({ min: 3, max: 500 })
      .withMessage("Link must be between 3 and 500 characters"),
    body("description")
      .optional()
      .isLength({ min: 10, max: 250 })
      .withMessage("description must be between 10 and 250 characters"),
    body("type")
      .not()
      .isEmpty()
      .withMessage("Type is required")
      .isLength({ min: 3, max: 26 })
      .withMessage("Type must be between 3 and 26 characters")
      .toUpperCase(),
    body("themeColor")
      .optional()
      .isHexColor()
      .withMessage("Theme color must be a valid hex color"),
    body("textColor")
      .optional()
      .isHexColor()
      .withMessage("Text color must be a valid hex color"),
  ];
  public validateUpdateBannerFields = [
    body("title")
      .optional()
      .isLength({ min: 3, max: 25 })
      .withMessage("Title must be between 3 and 25 characters"),
    body("link")
      .optional()
      .isLength({ min: 3, max: 500 })
      .withMessage("Link must be between 3 and 500 characters"),
    body("description")
      .optional()
      .isLength({ min: 10, max: 250 })
      .withMessage("description must be between 10 and 250 characters"),
    body("type")
      .optional()
      .isLength({ min: 3, max: 26 })
      .withMessage("Type must be between 3 and 26 characters")
      .toUpperCase(),
    body("themeColor")
      .optional()
      .isHexColor()
      .withMessage("Theme color must be a valid hex color"),
    body("textColor")
      .optional()
      .isHexColor()
      .withMessage("Text color must be a valid hex color"),
  ];
}

export default Banner;

import { NextFunction, Response } from "express";
import { body } from "express-validator";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import NewsLogic from "../logic/news.logic";
import { NewsModel } from "../models/news.model";
import { AuthRequest } from "../types/core";

class News extends NewsLogic {
  // create News
  public async createNewsController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      const { title, description, author, article, tags, link } = req.body;

      const newsData = await super.createNews({
        title,
        description,
        author,
        article,
        tags,
        posterFile: req.files?.poster,
        link,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "News created successfully",
        data: newsData,
      });
    } catch (error) {
      next(error);
    }
  }

  //update news
  public async updateNewsController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      const { title, description, author, article, tags, link } = req.body;
      const newsData = await super.updateNews({
        newsId: req.params?.newsId,
        title,
        description,
        author,
        article,
        tags,
        posterFile: req.files?.poster,
        link,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "News updated successfully",
        data: newsData,
      });
    } catch (error) {
      next(error);
    }
  }

  //get all newss
  public async getAllNewsesController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const query = { type: req?.query?.type?.toString()?.toUpperCase() };
      !req?.query?.type && delete query.type;

      const newses = await paginationHelper({
        model: NewsModel,
        query,
        limit: req.query.limit,
        chunk: req.query.chunk,
        select: "-article",
        sort: { createdAt: -1 },
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Newses found successfully",
        data: newses,
      });
    } catch (error) {
      next(error);
    }
  }
  //get news by id
  public async getNewsByIdController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      const newsData = await super.getNews(req.params?.newsId as string);
      res.status(200).json({
        status: "SUCCESS",
        message: "News fetched successfully",
        data: newsData,
      });
    } catch (error) {
      next(error);
    }
  }

  //delete news
  public async deleteNewsController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      //TODO: DELETE news images
      const newsData = await super.deleteNews(req.params.newsId);
      res.status(200).json({
        status: "SUCCESS",
        message: "News deleted successfully",
        data: newsData,
      });
    } catch (error) {
      next(error);
    }
  }

  public validateCreateNewsFields = [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3, max: 25 })
      .withMessage("Title must be between 3 and 25 characters"),
    body("description")
      .optional()
      .isLength({ min: 4, max: 250 })
      .withMessage("description must be between 4 and 250 characters"),
    body("author")
      .optional()
      .isLength({ min: 3, max: 100 })
      .withMessage("author must be between 3 and 100 characters"),
    body("tags")
      .optional()
      .isArray()
      .withMessage("tags must be an array of strings"),
  ];
  public validateUpdateNewsFields = [
    body("title")
      .optional()
      .isLength({ min: 3, max: 25 })
      .withMessage("Title must be between 3 and 25 characters"),
    body("description")
      .optional()
      .isLength({ min: 4, max: 250 })
      .withMessage("description must be between 4 and 250 characters"),
    body("author")
      .optional()
      .isLength({ min: 3, max: 100 })
      .withMessage("author must be between 3 and 100 characters"),
    body("tags")
      .optional()
      .isArray()
      .withMessage("tags must be an array of strings"),
  ];
}

export default News;

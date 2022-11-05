import { NextFunction, Response } from "express";
import { body } from "express-validator";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import BlogLogic from "../logic/blog.logic";
import { BlogModel } from "../models/blog.model";
import { AuthRequest } from "../types/core";

class Blog extends BlogLogic {
  // create Blog
  public async createBlogController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      const { title, description, author, article, tags } = req.body;

      const blogData = await super.createBlog({
        title,
        description,
        author,
        article,
        tags,
        posterFile: req.body?.poster,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Blog created successfully",
        data: blogData,
      });
    } catch (error) {
      next(error);
    }
  }

  //update blog
  public async updateBlogController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      const { title, description, author, article, tags } = req.body;
      const blogData = await super.updateBlog({
        title,
        description,
        author,
        article,
        tags,
        posterFile: req.body?.poster,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Blog updated successfully",
        data: blogData,
      });
    } catch (error) {
      next(error);
    }
  }

  //get all blogs
  public async getAllBlogsController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const query = { type: req?.query?.type?.toString()?.toUpperCase() };
      !req?.query?.type && delete query.type;

      const blogs = await paginationHelper({
        model: BlogModel,
        query,
        limit: req.query.limit,
        chunk: req.query.chunk,
        select: "-article",
        sort: { createdAt: -1 },
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Blogs found successfully",
        data: blogs,
      });
    } catch (error) {
      next(error);
    }
  }

  //delete blog
  public async deleteBlogController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      //TODO: DELETE blog comments
      //TODO: DELETE blog images
      const blogData = await super.deleteBlog(req.params.blogId);
      res.status(200).json({
        status: "SUCCESS",
        message: "Blog deleted successfully",
        data: blogData,
      });
    } catch (error) {
      next(error);
    }
  }

  public validateCreateBlogFields = [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3, max: 25 })
      .withMessage("Title must be between 3 and 25 characters"),
    body("description")
      .optional()
      .isLength({ min: 11, max: 250 })
      .withMessage("description must be between 11 and 250 characters"),
    body("author")
      .optional()
      .isLength({ min: 11, max: 21 })
      .withMessage("author must be between 5 and 21 characters"),
  ];
  public validateUpdateBlogFields = [
    body("title")
      .optional()
      .isLength({ min: 3, max: 25 })
      .withMessage("Title must be between 3 and 25 characters"),
    body("description")
      .optional()
      .isLength({ min: 11, max: 250 })
      .withMessage("description must be between 11 and 250 characters"),
    body("author")
      .optional()
      .isLength({ min: 11, max: 21 })
      .withMessage("author must be between 5 and 21 characters"),
  ];
}

export default Blog;

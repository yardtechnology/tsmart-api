import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import paginationHelper from "../helper/pagination.helper";
import AboutUsLogic from "../logic/aboutUs.logic";
import { AboutUsModel } from "../models/aboutUs.model";
import { AuthRequest } from "../types/core";

class AboutUs extends AboutUsLogic {
  // create AboutUs
  public async createAboutUsController(
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

      const aboutUsData = await super.createAboutUs({
        title: req.body.title,
        description: req.body.description,
        imageFile: req.files?.image,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "AboutUs created successfully",
        data: aboutUsData,
      });
    } catch (error) {
      next(error);
    }
  }

  //update aboutUs
  public async updateAboutUsController(
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

      const aboutUsData = await super.updateAboutUs({
        id: req.params.aboutUsId,
        title: req.body.title,
        description: req.body.description,
        imageFile: req.files?.image,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "AboutUs updated successfully",
        data: aboutUsData,
      });
    } catch (error) {
      next(error);
    }
  }

  //get all aboutUss
  public async getAllAboutUssController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const query = { type: req?.query?.type?.toString()?.toUpperCase() };
      !req?.query?.type && delete query.type;

      const aboutUss = await paginationHelper({
        model: AboutUsModel,
        query,
        limit: req.query.limit,
        chunk: req.query.chunk,
        sort: { createdAt: 1 },
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "AboutUss found successfully",
        data: aboutUss,
      });
    } catch (error) {
      next(error);
    }
  }

  //delete aboutUs
  public async deleteAboutUsController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const aboutUsData = await super.deleteAboutUs(req.params.aboutUsId);
      res.status(200).json({
        status: "SUCCESS",
        message: "AboutUs deleted successfully",
        data: aboutUsData,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AboutUs;

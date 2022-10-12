import { NextFunction, Response } from "express";
import { body, validationResult } from "express-validator";
import paginationHelper from "../helper/pagination.helper";
import MediaLogic from "../logic/media.logic";
import { ModelModel } from "../models/model.model";
import { AuthRequest } from "../types/core";
import ModelType from "../types/model";

class Model extends MediaLogic {
  // create model
  public async createModel(
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

      // upload model picture
      const imageFile = req.files?.image;
      const filePath = `${req.currentUser?._id}`;
      const imageData: any | undefined =
        imageFile && !Array.isArray(imageFile)
          ? await super.uploadMedia(imageFile, filePath)
          : undefined;

      // save model data to database
      const modelData: ModelType = await new ModelModel({
        title: req.body?.title,
        description: req.body?.description,
        image: imageData?.url,
        imagePath: imageData?.path,
        device: req.body?.deviceId ? [req.body?.deviceId] : [],
        make: req.body?.makeId ? [req.body?.makeId] : [],
      }).save();

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Model added successfully",
        data: modelData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // update model
  public async updateModel(
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

      // upload model image
      const imageFile = req.files?.image;
      const filePath = `${req.currentUser?._id}`;
      const imageData: any | undefined =
        imageFile && !Array.isArray(imageFile)
          ? await super.uploadMedia(imageFile, filePath)
          : undefined;

      // save model data to database
      const modelData: ModelType | null = await ModelModel.findByIdAndUpdate(
        req.params.modelId,
        {
          title: req.body?.title,
          description: req.body?.description,
          image: imageData?.url,
          imagePath: imageData?.path,
        }
      );

      if (!modelData) throw new Error("Model not found");

      // delete previous model image
      imageData?.path &&
        modelData?.imagePATH &&
        super.deleteMedia(modelData?.imagePATH);

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Model updated successfully",
        data: modelData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // get model
  public async getModel(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // save model data to database
      const modelData: ModelType | null = await ModelModel.findById(
        req.params.modelId
      )
        .populate("parentModel")
        .select("-imagePath");

      if (!modelData) throw new Error("Model not found");

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Model found successfully",
        data: modelData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  //   get all model
  public async getAllModel(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // save user data to database
      const query = {
        parentModel: req.query.parentModel,
      };

      !req.query.parentModel && delete query.parentModel;

      const modelData = await paginationHelper({
        model: ModelModel,
        query: query,
        select: "-imagePATH",
        sort: { createdAt: -1 },
        populate: "device",
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
      });

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "All model found successfully",
        data: modelData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // get model
  public async deleteModel(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // save model data to database
      const modelData: ModelType | null = await ModelModel.findByIdAndDelete(
        req.params.modelId
      );

      if (!modelData) throw new Error("Model not found");

      // delete previous model image
      modelData?.imagePATH && super.deleteMedia(modelData?.imagePATH);

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Model deleted successfully",
        data: modelData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // finds validators for the user creation request
  public validateCreateModelFields = [
    body("title")
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long")
      .isLength({ max: 20 })
      .withMessage("Title must be at most 20 characters long"),
    body("description")
      .not()
      .isEmpty()
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long")
      .isLength({ max: 51 })
      .withMessage("Description must be at most 51 characters long"),
    body("makeId").not().isEmpty().withMessage("makeId is required"),
    body("deviceId").not().isEmpty().withMessage("deviceId is required"),
  ];
}

export default Model;

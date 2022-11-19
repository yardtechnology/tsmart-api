import { NextFunction, Response } from "express";
import { body, validationResult } from "express-validator";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import MediaLogic from "../logic/media.logic";
import { ServiceModel } from "../models/service.model";
import { AuthRequest } from "../types/core";
import ServiceType from "../types/service";

class Service extends MediaLogic {
  // create service
  public async createService(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      fieldValidateError(req);

      // upload service picture
      const imageFile = req.files?.image;
      const filePath = `${req.currentUser?._id}`;
      const imageData: any | undefined =
        imageFile && !Array.isArray(imageFile)
          ? await super.uploadMedia(imageFile, filePath)
          : undefined;

      // save service data to database
      const serviceData: ServiceType = await new ServiceModel({
        title: req.body?.title,
        description: req.body?.description,
        image: imageData?.url,
        imagePath: imageData?.path,
      }).save();

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Service added successfully",
        data: serviceData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // update service
  public async updateService(
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

      // upload service image
      const imageFile = req.files?.image;
      const filePath = `${req.currentUser?._id}`;
      const imageData: any | undefined =
        imageFile && !Array.isArray(imageFile)
          ? await super.uploadMedia(imageFile, filePath)
          : undefined;

      // save service data to database
      const serviceData: ServiceType | null =
        await ServiceModel.findByIdAndUpdate(req.params.serviceId, {
          title: req.body?.title,
          description: req.body?.description,
          image: imageData?.url,
          imagePath: imageData?.path,
        });

      if (!serviceData) throw new Error("Service not found");

      // delete previous service image
      imageData?.path &&
        serviceData?.imagePATH &&
        super.deleteMedia(serviceData?.imagePATH);

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Service updated successfully",
        data: serviceData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // get service
  public async getService(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // save service data to database
      const serviceData: ServiceType | null = await ServiceModel.findById(
        req.params.serviceId
      ).select("-imagePath");

      if (!serviceData) throw new Error("Service not found");

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Service found successfully",
        data: serviceData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  //   get all service
  public async getAllService(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const serviceData = await paginationHelper({
        model: ServiceModel,
        query: {},
        select: "-imagePATH",
        sort: { createdAt: -1 },
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
      });

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "All service found successfully",
        data: serviceData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // get service
  public async deleteService(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // save service data to database
      const serviceData: ServiceType | null =
        await ServiceModel.findByIdAndDelete(req.params.serviceId);

      if (!serviceData) throw new Error("Service not found");

      // delete previous service image
      serviceData?.imagePATH && super.deleteMedia(serviceData?.imagePATH);

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Service deleted successfully",
        data: serviceData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // finds validators for the user creation request
  public validateCreateServiceFields = [
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
      .isLength({ max: 101 })
      .withMessage("Description must be at most 101 characters long"),
  ];
}

export default Service;

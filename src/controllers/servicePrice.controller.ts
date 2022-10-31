import { NextFunction, Response } from "express";
import { body } from "express-validator";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import MediaLogic from "../logic/media.logic";
import { ServicePriceModel } from "../models/servicePrice.model";
import { AuthRequest } from "../types/core";
import ServicePriceType from "../types/servicePrice";

class ServicePrice extends MediaLogic {
  // create servicePrice
  public async createServicePrice(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      fieldValidateError(req);
      const {
        title,
        description,
        mrp,
        salePrice,
        storeId,
        serviceId,
        modelId,
        type,
        isMostPopular,
      } = req.body;
      // upload servicePrice picture
      const imageFile = req.files?.image;
      const filePath = `${req.currentUser?._id}`;
      const imageData: any | undefined =
        imageFile && !Array.isArray(imageFile)
          ? await super.uploadMedia(imageFile, filePath)
          : undefined;

      // save servicePrice data to database
      const servicePriceData: ServicePriceType = await new ServicePriceModel({
        title: title,
        description: description,
        image: imageData?.url,
        imagePath: imageData?.path,
        mrp: mrp,
        salePrice: salePrice,
        model: modelId,
        store: storeId,
        service: serviceId,
        type,
        isMostPopular,
      }).save();

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "ServicePrice added successfully",
        data: servicePriceData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // update servicePrice
  public async updateServicePrice(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      fieldValidateError(req);

      // upload servicePrice image
      const imageFile = req.files?.image;
      const filePath = `${req.currentUser?._id}`;
      const imageData: any | undefined =
        imageFile && !Array.isArray(imageFile)
          ? await super.uploadMedia(imageFile, filePath)
          : undefined;

      // save servicePrice data to database
      const servicePriceData: ServicePriceType | null =
        await ServicePriceModel.findByIdAndUpdate(req.params.servicePriceId, {
          title: req.body?.title,
          description: req.body?.description,
          image: imageData?.url,
          imagePath: imageData?.path,
          mrp: req.body?.mrp,
          salePrice: req.body?.salePrice,
          model: req.body?.modelId,
          store: req.body?.storeId,
          service: req.body?.serviceId,
        });

      if (!servicePriceData) throw new Error("ServicePrice not found");

      // delete previous servicePrice image
      imageData?.path &&
        servicePriceData?.imagePATH &&
        super.deleteMedia(servicePriceData?.imagePATH);

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "ServicePrice updated successfully",
        data: servicePriceData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // get servicePrice
  public async getServicePrice(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // save servicePrice data to database
      const servicePriceData: ServicePriceType | null =
        await ServicePriceModel.findById(req.params.servicePriceId)
          .populate(["store", "model", "service"])
          .select("-imagePath");

      if (!servicePriceData) throw new Error("ServicePrice not found");

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "ServicePrice found successfully",
        data: servicePriceData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  //   get all servicePrice
  public async getAllServicePrice(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const servicePriceData = await ServicePriceModel.aggregate([
        //   {
        //   $group:{
        //     _id:
        //   }
        // }
      ]);

      // paginationHelper({
      //   model: ServicePriceModel,
      //   query: {},
      //   select: "-imagePATH",
      //   sort: { createdAt: -1 },
      //   populate: ["store", "model", "service"],
      //   limit: req.query.limit ? Number(req.query.limit) : undefined,
      //   chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
      // });

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "All servicePrice found successfully",
        data: servicePriceData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }
  //   get all servicePrice by make
  public async getServicePricesByModel(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // save user data to database
      const query = {
        model: req?.params?.modelId || undefined,
      };

      !req.params.modelId && delete query.model;

      const servicePriceData = await paginationHelper({
        model: ServicePriceModel,
        query: query,
        select: "-imagePATH",
        sort: { createdAt: -1 },
        populate: ["store", "model", "service"],
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
      });

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "All servicePrice found successfully",
        data: servicePriceData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // get servicePrice
  public async deleteServicePrice(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // save servicePrice data to database
      const servicePriceData: ServicePriceType | null =
        await ServicePriceModel.findByIdAndDelete(req.params.servicePriceId);

      if (!servicePriceData) throw new Error("ServicePrice not found");

      // delete previous servicePrice image
      servicePriceData?.imagePATH &&
        super.deleteMedia(servicePriceData?.imagePATH);

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "ServicePrice deleted successfully",
        data: servicePriceData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // finds validators for the user creation request
  public validateCreateServicePriceFields = [
    body("mrp")
      .not()
      .isEmpty()
      .withMessage("MRP is required")
      .isNumeric()
      .withMessage("mrp most be a numeric"),
    body("salePrice")
      .not()
      .isEmpty()
      .withMessage("salePrice is required")
      .isNumeric()
      .withMessage("mrp most be a numeric"),
    body("modelId")
      .not()
      .isEmpty()
      .withMessage("modelId is required")
      .isMongoId()
      .withMessage("please enter a valid store id"),
    body("storeId")
      .not()
      .isEmpty()
      .withMessage("storeId is required")
      .isMongoId()
      .withMessage("please enter a valid store id"),
    body("isInStock")
      .not()
      .isEmpty()
      .withMessage("isInStock is required")
      .isBoolean()
      .withMessage("isInStock most be a boolean"),
    body("serviceId")
      .not()
      .isEmpty()
      .withMessage("serviceId is required")
      .isMongoId()
      .withMessage("please enter a valid store id"),
    body("type")
      .not()
      .isEmpty()
      .withMessage("type is required, ex-Stander, Premium"),
    body("isMostPopular")
      .optional()
      .exists()
      .isBoolean()
      .withMessage("isMostPopular must be boolean."),
  ];
}

export default ServicePrice;

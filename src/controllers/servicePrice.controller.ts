import { NextFunction, Response } from "express";
import { body, param } from "express-validator";
import { Types } from "mongoose";
import { aggregationData, fieldValidateError } from "../helper";
import CouponLogic from "../logic/coupon.logic";
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

  //   get all servicePrice by role
  public async getAllServicePrice(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const role = req?.currentUser?.role;
      fieldValidateError(req);

      const { model } = req.params;

      const { servicePriceIds, couponId } = req.query;
      const checkArrayServicePriceId = servicePriceIds
        ? Array.isArray(servicePriceIds)
          ? servicePriceIds.map((item) => new Types.ObjectId(String(item)))
          : [new Types.ObjectId(String(servicePriceIds))]
        : [];
      console.log("hit");

      const aggregationQuery = [
        {
          $match: {
            model: new Types.ObjectId(model),
          },
        },
        {
          $lookup: {
            from: "servicepropertyvalues",
            foreignField: "servicePrice",
            localField: "_id",
            as: "servicePropertyValue",
            pipeline: [
              {
                $lookup: {
                  from: "serviceproperties",
                  foreignField: "_id",
                  localField: "serviceProperty",
                  as: "serviceProperty",
                },
              },
              {
                $unwind: {
                  path: "$serviceProperty",
                  preserveNullAndEmptyArrays: true,
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "services",
            localField: "service",
            foreignField: "_id",
            as: "service",
          },
        },
        {
          $unwind: {
            path: "$service",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: {
              service: "$service",
              model: "$model",
            },
            cardSize: {
              $first: {
                $cond: [
                  { $gte: [{ $size: "$servicePropertyValue" }, 1] },
                  "LONG_CARD",
                  "NORMAL_CARD",
                ],
              },
            },
            longCard: {
              $push: {
                _id: "$_id",
                image: "$image",
                title: "$title",
                description: "$description",
                store: "$store",

                isInStock: "$isInStock",

                salePrice: "$salePrice",

                mrp: "$mrp",

                type: "$type",

                isMostPopular: "$isMostPopular",
                servicePropertyValue: "$servicePropertyValue",
              },
            },

            id: {
              $first: "$_id",
            },
            service: {
              $first: "$service",
            },
            model: {
              $first: "$model",
            },
            image: {
              $first: "$image",
            },
            title: {
              $first: "$title",
            },
            description: {
              $first: "$description",
            },
            store: {
              $first: "$store",
            },
            isInStock: {
              $first: "$isInStock",
            },
            salePrice: {
              $first: "$salePrice",
            },
            mrp: {
              $first: "$mrp",
            },
            type: {
              $first: "$type",
            },
            isMostPopular: {
              $first: "$isMostPopular",
            },
            createdAt: {
              $first: "$createdAt",
            },
          },
        },
        {
          $project: {
            longCard: {
              $cond: [
                { $eq: ["$cardSize", "LONG_CARD"] },
                "$longCard",
                undefined,
              ],
            },
            cardSize: 1,
            _id: "$id",
            service: 1,
            model: 1,
            title: 1,
            description: 1,
            store: 1,
            isInStock: 1,
            salePrice: 1,
            mrp: 1,
            type: 1,
            isMostPopular: 1,
          },
        },
      ];
      if (role !== "ADMIN") {
        aggregationQuery.splice(4);
      }

      const servicePriceData = await aggregationData<ServicePriceType>({
        model: ServicePriceModel,
        query: aggregationQuery,
        position: role !== "ADMIN" ? 3 : 5,
        sort: { createdAt: -1 },
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
      });

      // summery call

      const findSelectedServices = checkArrayServicePriceId?.length
        ? await ServicePriceModel.find({
            _id: { $in: checkArrayServicePriceId },
          })
        : undefined;

      const servicePricesReducer = findSelectedServices
        ? findSelectedServices?.reduce(
            (preserveValue, currentValue) => {
              preserveValue.mrp = preserveValue.mrp + currentValue.mrp;
              preserveValue.salePrice =
                preserveValue.salePrice + currentValue.salePrice;
              return preserveValue;
            },
            {
              mrp: 0,
              salePrice: 0,
            }
          )
        : undefined;
      const couponCalculation =
        servicePricesReducer?.salePrice && couponId
          ? await new CouponLogic().getCouponDiscount({
              price: servicePricesReducer?.salePrice,
              couponId: String(couponId),
            })
          : undefined;

      res.json({
        status: "SUCCESS",
        message: "Service price get successfully",
        servicePricesReducer,
        couponCalculation,
        findSelectedServices,
        data: servicePriceData,
        role,
      });
    } catch (error) {
      next(error);
    }
  }

  //   get all servicePrice by make
  // public async getServicePricesByModel(
  //   req: AuthRequest,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<any> {
  //   try {
  //     // save user data to database
  //     const query = {
  //       model: req?.params?.modelId || undefined,
  //     };

  //     !req.params.modelId && delete query.model;

  //     const servicePriceData = await paginationHelper({
  //       model: ServicePriceModel,
  //       query: query,
  //       select: "-imagePATH",
  //       sort: { createdAt: -1 },
  //       populate: ["store", "model", "service"],
  //       limit: req.query.limit ? Number(req.query.limit) : undefined,
  //       chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
  //     });

  //     // send response to client
  //     res.status(200).json({
  //       status: "SUCCESS",
  //       message: "All servicePrice found successfully",
  //       data: servicePriceData,
  //     });
  //   } catch (error) {
  //     // send error to client
  //     next(error);
  //   }
  // }

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
}

export const ServicePriceControllerValidation = {
  createServicePrice: [
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
  ],
  getAllServicePrice: [
    param("model")
      .not()
      .isEmpty()
      .withMessage("model id is required.")
      .isMongoId()
      .withMessage("model must be mongoose id."),
  ],
};

export default ServicePrice;

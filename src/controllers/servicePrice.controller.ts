import { NextFunction, Response } from "express";
import { body, param, query } from "express-validator";
import { BadRequest, InternalServerError } from "http-errors";
import { Types } from "mongoose";
import {
  aggregationData,
  fieldValidateError,
  paginationHelper,
} from "../helper";
import CouponLogic from "../logic/coupon.logic";
import MediaLogic from "../logic/media.logic";
import ServiceLogic from "../logic/service.logic";
import { ServicePropertyValueSchema } from "../models";
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
        allServices,
      } = req.body;
      // upload servicePrice picture
      const imageFile = req.files?.image;
      const filePath = `${req.currentUser?._id}`;
      const imageData: any | undefined =
        imageFile && !Array.isArray(imageFile)
          ? await super.uploadMedia(imageFile, filePath)
          : undefined;
      const servicePriceCountCheck = await ServicePriceModel.find({
        model: modelId,
        store: storeId,
        service: serviceId,
      });
      if (servicePriceCountCheck?.length > 3)
        throw new BadRequest("You can't add more than 3 services.");
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

      const allServicesCheck = allServices
        ? allServices?.map((item: any) => ({
            ...item,
            model: modelId,
            servicePrice: servicePriceData?._id,
          }))
        : undefined;
      // console.log({ allServices, allServicesCheck });

      const createServicePropertyValue = allServicesCheck
        ? await ServicePropertyValueSchema.insertMany(
            JSON.parse(JSON.stringify(allServicesCheck))
          )
        : undefined;
      console.log(createServicePropertyValue);
      if (!createServicePropertyValue && allServicesCheck)
        throw new InternalServerError(
          "Something went wrong, Service property value is not created."
        );
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
      const {
        servicePriceId,
        store,
        serviceId,
        modelId,
        excludeServicePriceIds,
      } = req.query;
      const excludeServicePriceIdsArrayCheck = excludeServicePriceIds
        ? Array.isArray(excludeServicePriceIds)
          ? excludeServicePriceIds
          : [excludeServicePriceIds]
        : undefined;
      const query: any = {};
      servicePriceId && (query["_id"] = servicePriceId);
      store && (query["store"] = store);
      serviceId && (query["service"] = serviceId);
      modelId && (query["model"] = modelId);
      excludeServicePriceIdsArrayCheck &&
        (query["_id"] = { $nin: excludeServicePriceIdsArrayCheck });
      const getAllServicePrice = await paginationHelper({
        model: ServicePriceModel,
        query,
        limit: req.query.limit,
        chunk: req.query.chunk,
        sort: { createdAt: -1 },
        populate: [
          {
            path: "service",
            select: "-imagePATH",
          },
        ],
      });

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "ServicePrice found successfully",
        data: servicePriceId
          ? getAllServicePrice?.data?.[0]
          : getAllServicePrice,
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
      // const role = req?.currentUser?.role;
      fieldValidateError(req);

      const { model } = req.params;
      const { serviceId, servicePriceId, storeId } = req.query;
      const serviceArg = [];
      serviceId &&
        serviceArg.push({
          $match: {
            service: new Types.ObjectId(String(serviceId)),
          },
        });

      const { servicePriceIds, couponId } = req.query;
      const checkArrayServicePriceId = servicePriceIds
        ? Array.isArray(servicePriceIds)
          ? servicePriceIds.map((item) => new Types.ObjectId(String(item)))
          : [new Types.ObjectId(String(servicePriceIds))]
        : [];
      const matchArray: any = [
        {
          $eq: ["$model", new Types.ObjectId(model)],
        },
      ];
      servicePriceId &&
        matchArray.push({
          $eq: ["$_id", new Types.ObjectId(String(servicePriceId))],
        });
      storeId &&
        matchArray.push({
          $eq: ["$store", new Types.ObjectId(String(storeId))],
        });
      const aggregationQuery: any[] = [
        {
          $match: {
            $expr: {
              $and: matchArray,
            },
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
        // extra
        ...serviceArg,
        // extra end
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
              store: "$store",
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
            // title: {
            //   $first: "$title",
            // },
            // description: {
            //   $first: "$description",
            // },
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
          $group: {
            _id: {
              service: "$_id.service",
              model: "$_id.model",
              cardSize: "$cardSize",
            },
            cardSize: { $first: "$cardSize" },
            longCard: { $first: "$longCard" },

            id: {
              $first: "$id",
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
            // title: {
            //   $first: "$title",
            // },
            // description: {
            //   $first: "$description",
            // },
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
        //
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
      // if (role === "ADMIN") {
      //   aggregationQuery.splice(4);
      // } else {
      aggregationQuery.push({
        $sort: {
          cardSize: 1,
        },
      });
      aggregationQuery.push({
        $addFields: {
          longCard: {
            $slice: ["$longCard", 3],
          },
        },
      });
      // }
      const servicePriceData = await aggregationData<ServicePriceType>({
        model: ServicePriceModel,
        query: aggregationQuery,
        position: 5,
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
        data: serviceId ? servicePriceData?.data?.[0] : servicePriceData,
      });
    } catch (error) {
      next(error);
    }
  }
  // service summery
  async serviceSummery(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { servicePriceIds, couponId } = req.body;
      fieldValidateError(req);
      const arrayServicePriceId = Array.isArray(servicePriceIds)
        ? servicePriceIds
        : [servicePriceIds];
      let dataServiceSummery = await new ServiceLogic().getPriceBYServiceId({
        servicePriceId: arrayServicePriceId,
      });
      const couponCalculation =
        dataServiceSummery?.salePrice && couponId
          ? await new CouponLogic().getCouponDiscount({
              couponId: String(couponId),
              price: dataServiceSummery?.salePrice,
            })
          : undefined;
      dataServiceSummery.salePrice =
        dataServiceSummery.salePrice - (couponCalculation || 0);

      res.json({
        status: "SUCCESS",
        message: "Service price get successfully",

        data: { couponCalculation, ...dataServiceSummery, couponId },
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
      // delete serviceProperty value
      const deleteServicePropertyValue =
        await ServicePropertyValueSchema.deleteMany({
          servicePrice: req.params.servicePriceId,
        });

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

    body("allServices.*.value")
      .optional()
      .isLength({ min: 1 })
      .withMessage("value must be at least 1 character.")
      .isLength({ max: 100 })
      .withMessage("value must be at most 100 characters long"),

    body("allServices.*.serviceProperty")
      .optional()
      .isMongoId()
      .withMessage("serviceProperty must be mongoesId."),
  ],
  getAllServicePrice: [
    param("model")
      .not()
      .isEmpty()
      .withMessage("model id is required.")
      .isMongoId()
      .withMessage("model must be mongoose id."),
    query("storeId")
      .optional()
      .exists()
      .isMongoId()
      .withMessage("storeId must be mongoose id."),
    query("serviceId")
      .optional()
      .exists()
      .isMongoId()
      .withMessage("serviceId is must be mongoose id."),
  ],
  serviceSummery: [
    body("servicePriceIds.*")
      .not()
      .isEmpty()
      .withMessage("servicePriceIds is required")
      .isMongoId()
      .withMessage("servicePriceIds must be mongoes id"),
    body("couponId")
      .optional()
      .exists()
      .isMongoId()
      .withMessage("couponId must be mongoose id."),
  ],
};

export default ServicePrice;

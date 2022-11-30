import { NextFunction, Response } from "express";
import { body, param, query } from "express-validator";
import { Types } from "mongoose";
import { fieldValidateError } from "../helper";
import { getDistance } from "../helper/core.helper";
import MediaLogic from "../logic/media.logic";
import StoreLogic from "../logic/store.logic";
import { ConfigSchema, HolidayModel } from "../models";
import { StoreModel } from "../models/store.model";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";
import StoreType from "../types/store";
import UserType from "../types/user";
import MailController from "./mail.controller";

class Store extends MediaLogic {
  // create store
  public async createStore(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      fieldValidateError(req);

      // upload user profile picture
      const imageFile = req.files?.image;
      const filePath = `store`;
      const imageData: any | undefined =
        imageFile && !Array.isArray(imageFile)
          ? await super.uploadMedia(imageFile, filePath)
          : undefined;
      let storeData: StoreType;
      //if store is a hub store
      if (req.body?.type?.toUpperCase() !== "HUB") {
        // save user data to database
        storeData = await new StoreModel({
          displayName: req.body?.displayName,
          email: req.body?.email,
          phoneNumber: req.body?.phoneNumber,
          countryCode: req.body?.countryCode,
          imageURL: imageData?.url,
          imagePath: imageData?.path,
          about: req.body?.about,
          createdBy: req.body?.createdBy,
          timing: req.body?.timing,
          address: {
            state: req.body?.state,
            city: req.body?.city,
            street: req.body?.street,
            zip: req.body?.zip,
            country: req.body?.country,
            latitude: req.body?.latitude,
            longitude: req.body?.longitude,
          },
        }).save();
      } else {
        // save user data to database
        const isAlradyHubExists = await StoreModel.findOne({ type: "HUB" });
        if (isAlradyHubExists) throw new Error("Hub store already exists");
        storeData = await new StoreModel({
          displayName: req.body?.displayName,
          email: req.body?.email,
          phoneNumber: req.body?.phoneNumber,
          countryCode: req.body?.countryCode,
          imageURL: imageData?.url,
          imagePath: imageData?.path,
          about: req.body?.about,
          createdBy: req.body?.createdBy,
          type: "HUB",
          timing: req?.body?.timing,
          address: {
            state: req.body?.state,
            city: req.body?.city,
            street: req.body?.street,
            zip: req.body?.zip,
            country: req.body?.country,
            latitude: req.body?.latitude,
            longitude: req.body?.longitude,
          },
        }).save();
        await UserModel.updateMany(
          { role: "ADMIN" },
          {
            store: storeData._id,
          }
        );
      }

      // send response to client
      res.json({
        status: "SUCCESS",
        message: "Store created successfully",
        data: storeData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // update store
  public async updateStore(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      fieldValidateError(req);

      // upload store image
      const imageFile = req.files?.image;
      const filePath = `${req.currentUser?._id}`;
      const imageData: any | undefined =
        imageFile && !Array.isArray(imageFile)
          ? await super.uploadMedia(imageFile, filePath)
          : undefined;

      // save store data to database
      const storeData: StoreType | null = await StoreModel.findByIdAndUpdate(
        req.params.storeId,
        {
          displayName: req.body?.displayName,
          email: req.body?.email,
          phoneNumber: req.body?.phoneNumber,
          countryCode: req.body?.countryCode,

          imageURL: imageData?.url,
          imagePath: imageData?.path,
          about: req.body?.about,
          createdBy: req.body?.createdBy,
          timing: req.body?.timing,
          "address.state": req.body?.state,
          "address.city": req.body?.city,
          "address.street": req.body?.street,
          "address.zip": req.body?.zip,
          "address.country": req.body?.country,
          "address.latitude": req.body?.latitude,
          "address.longitude": req.body?.longitude,
        }
      );

      if (!storeData) throw new Error("Store not found");

      // delete previous image
      imageData?.path &&
        storeData?.imagePath &&
        super.deleteMedia(storeData?.imagePath);

      // send response to client
      res.json({
        status: "SUCCESS",
        message: "Store updated successfully",
        data: storeData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // get store
  public async getStore(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // save store data to database
      const storeData: StoreType | null = await StoreModel.findById(
        req.params.storeId
      ).select("-imagePath");

      if (!storeData) throw new Error("Store not found");

      // send response to client
      res.json({
        status: "SUCCESS",
        message: "Store found successfully",
        data: storeData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  //   get all store
  public async getAllStores(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // save store data to database
      const query = {
        address: req?.query?.zip
          ? {
              zip: req?.query?.zip,
            }
          : undefined,
      };
      !req?.query?.zip && delete query?.address;
      let categoryData = await StoreModel.find(query)
        .populate(["address"])
        .select("-imagePath")
        .sort({ createdAt: -1 });
      if (req?.query?.latitude && req?.query?.longitude) {
        const configData = await ConfigSchema.findOne({});
        categoryData = categoryData.filter((item, index) =>
          configData?.storeRange
            ? configData?.storeRange >=
              getDistance(
                item?.address?.latitude as number,
                item?.address?.longitude as number,
                Number(req?.query?.latitude),
                Number(req?.query?.longitude),
                "K"
              )
            : true
        );
      }

      // send response to client
      res.json({
        status: "SUCCESS",
        message: "All stores found successfully",
        data: categoryData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // TODO: DELETE STORE
  async deleteStore(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { storeId } = req.params;
      // send response to client
      res.json({
        status: "SUCCESS",
        message: `${storeId} Stores delete in the todo list.`,
        data: storeId,
      });
    } catch (error) {
      next(error);
    }
  }

  // Assign store manager
  public async assignStoreManager(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const storeData: StoreType | null = await StoreModel.findById(
        req.params.storeId
      );

      if (!storeData) throw new Error("Store not found");

      // save store data to database
      const userData: UserType | null = await UserModel.findByIdAndUpdate(
        req.body?.managerId,
        {
          store: req.params.storeId,
        }
      );

      if (!userData) throw new Error("User not found");

      new MailController().sendMail({
        to: userData?.email,
        subject: "Store Manager Assigned",
        text: `
        hi,${userData?.displayName}!,
        you have been assigned as a store manager for ${storeData?.displayName}
        `,
      });

      // send response to client
      res.json({
        status: "SUCCESS",
        message: "Store manager assigned to store successfully",
        data: userData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // remove store manager
  public async removeStoreManager(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // save store data to database
      const userData: UserType | null = await UserModel.findByIdAndUpdate(
        req.body?.managerId,
        {
          store: null,
        }
      );

      if (!userData) throw new Error("Store not found");

      // send response to client
      res.json({
        status: "SUCCESS",
        message: "Store manager removed from store successfully",
        data: userData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  //get store managers
  public async getStoreManagersController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // save store data to database
      const userData: UserType[] = await new StoreLogic().getAllStoresManagers({
        Id: req.params.storeId,
        chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
      });

      if (!userData) throw new Error("Store not found");

      // send response to client
      res.json({
        status: "SUCCESS",
        message: "Store managers found successfully",
        data: userData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  //get hub data
  public async getHubDataController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // save store data to database
      const data = await StoreModel.findOne({
        type: "HUB",
      });

      if (!data) throw new Error("Hub not found");

      // send response to client
      res.json({
        status: "SUCCESS",
        message: "Hub data found successfully",
        data: data,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  public async getAllStore(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { services } = req.body as {
        services: any[];
      };
      const getAllStore = await new StoreLogic().getAllStoreByStoreIn({
        date: new Date(),
        services,
      });
      res.json({
        status: "SUCCESS",
        message: "According to the service store found successfully.",
        data: getAllStore,
      });
    } catch (error) {
      next(error);
    }
  }

  async getStoreListAccordingServiceAvailability(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const query = {
        address: req?.query?.zip
          ? {
              zip: req?.query?.zip,
            }
          : undefined,
      };
      !req?.query?.zip && delete query?.address;
      const { servicesId, modelId } = req.query;
      fieldValidateError(req);
      const servicePriceArrayCheck = servicesId
        ? Array.isArray(servicesId)
          ? servicesId?.map((item) => new Types.ObjectId(String(item)))
          : [servicesId]?.map((item) => new Types.ObjectId(String(item)))
        : undefined;
      const argArray: any = [];
      modelId &&
        argArray.push({
          $eq: ["$model", new Types.ObjectId(String(modelId))],
        });
      servicePriceArrayCheck &&
        argArray.push({
          $in: ["$service", servicePriceArrayCheck],
        });
      let getStore = await StoreModel.aggregate([
        // {
        //   $match: query,
        // },
        {
          $lookup: {
            from: "serviceprices",
            localField: "_id",
            foreignField: "store",
            as: "servicePrices",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: argArray,
                  },
                },
              },
              {
                $group: {
                  _id: "$service",
                },
              },
            ],
          },
        },
        {
          $match: {
            $expr: {
              $eq: [
                { $size: "$servicePrices" },
                servicePriceArrayCheck?.length,
              ],
            },
          },
        },
        {
          $project: {
            servicePrices: 0,
            type: 0,
            imagePath: 0,
            __v: 0,
          },
        },
      ]);
      if (req?.query?.latitude && req?.query?.longitude) {
        const configData = await ConfigSchema.findOne({});
        getStore = getStore.filter((item: StoreType) =>
          configData?.storeRange
            ? configData?.storeRange >=
              getDistance(
                item?.address?.latitude as number,
                item?.address?.longitude as number,
                Number(req?.query?.latitude),
                Number(req?.query?.longitude),
                "K"
              )
            : true
        );
      }

      res.json({
        status: "SUCCESS",
        message: "Store get successfully",
        data: getStore,
      });
    } catch (error) {
      next(error);
    }
  }
  // duplicate it will need in timing function
  async duplicateDetStoreListAccordingAvailability(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { serviceId, modelId, date } = req.body;

      const getStore = await StoreModel.aggregate([
        {
          $lookup: {
            from: "serviceprices",
            localField: "_id",
            foreignField: "store",
            as: "servicePrices",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$service", new Types.ObjectId(serviceId)],
                      },
                      {
                        $eq: ["$model", new Types.ObjectId(modelId)],
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
        {
          $match: {
            $expr: {
              $gte: [{ $size: "$servicePrices" }, 1],
            },
          },
        },
        {
          $lookup: {
            from: "holidays",
            localField: "_id",
            foreignField: "store",
            as: "holidays",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: [
                          {
                            $year: "$date",
                          },
                          {
                            $year: new Date(date),
                          },
                        ],
                      },
                      {
                        $eq: [
                          {
                            $month: "$date",
                          },
                          {
                            $month: new Date(date),
                          },
                        ],
                      },
                      {
                        $eq: [
                          {
                            $dayOfMonth: "$date",
                          },
                          {
                            $dayOfMonth: new Date(date),
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
          },
        },

        {
          $match: {
            $expr: {
              $lt: [{ $size: "$holidays" }, 1],
            },
          },
        },
        {
          $lookup: {
            from: "timings",
            localField: "_id",
            foreignField: "store",
            as: "timing",
            pipeline: [
              {
                $addFields: {
                  startDateForm: {
                    $dateFromParts: {
                      year: new Date(date).getFullYear(),
                      month: new Date(date).getMonth() + 1,
                      day: new Date(date).getDate(),
                      hour: {
                        $hour: "$start",
                      },
                      minute: {
                        $minute: "$start",
                      },
                    },
                  },
                  endDateForm: {
                    $dateFromParts: {
                      year: new Date(date).getFullYear(),
                      month: new Date(date).getMonth() + 1,
                      day: new Date(date).getDate(),
                      hour: {
                        $hour: "$end",
                      },
                      minute: {
                        $minute: "$end",
                      },
                    },
                  },
                },
              },

              {
                $lookup: {
                  from: "orders",
                  localField: "store",
                  foreignField: "storeID",
                  as: "orderHave",
                  let: {
                    startDate: "$startDateForm",
                    endDate: "$endDateForm",
                    dayOfWeekNumber: "$dayOfWeekNumber",
                  },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $and: [
                            {
                              $eq: ["$serviceType", "IN_STOR"],
                            },
                            {
                              $gte: ["$scheduledTime", "$$startDate"],
                            },
                            {
                              $lte: ["$scheduledTime", "$$endDate"],
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              },
              {
                $addFields: {
                  orderHave: {
                    $size: "$orderHave",
                  },
                  leftBooking: {
                    $subtract: [
                      "$numberOfRepairers",
                      {
                        $size: "$orderHave",
                      },
                    ],
                  },
                },
              },
              {
                $match: {
                  $expr: {
                    $gte: ["$leftBooking", 1],
                  },
                },
              },
            ],
          },
        },
        {
          $match: {
            $expr: {
              $gte: [{ $size: "$timing" }, 1],
            },
          },
        },
        {
          $project: {
            timing: 0,
            holidays: 0,
            servicePrices: 0,
          },
        },
      ]);

      res.json({
        status: "SUCCESS",
        message: "Store get successfully",
        data: getStore,
      });
    } catch (error) {
      next(error);
    }
  }
  async lastSevenDay(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { storeId } = req.params;
      const currentDateRoot = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      );
      const currentDateHigh = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        23,
        59,
        59
      );
      const holidays = await HolidayModel.aggregate([
        {
          $addFields: {
            sevenDay: [0, 1, 2, 3, 4, 5, 6],
          },
        },
        {
          $addFields: {
            sevenDay: {
              $map: {
                input: "$sevenDay",
                as: "singleDay",
                in: {
                  startDate: {
                    $dateAdd: {
                      startDate: new Date(currentDateRoot),
                      unit: "day",
                      amount: "$$singleDay",
                    },
                  },
                  endDate: {
                    $dateAdd: {
                      startDate: new Date(currentDateHigh),
                      unit: "day",
                      amount: "$$singleDay",
                    },
                  },
                },
              },
            },
          },
        },
        {
          $group: {
            _id: null,
            sevenDay: { $first: "$sevenDay" },
          },
        },
        {
          $unwind: {
            path: "$sevenDay",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 0,
            startDate: "$sevenDay.startDate",
            endDate: "$sevenDay.endDate",
          },
        },
        {
          $lookup: {
            from: "holidays",
            as: "holiday",
            let: {
              startDate: "$startDate",
              endDate: "$endDate",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$store", new Types.ObjectId(storeId)],
                      },
                      {
                        $gte: ["$date", "$$startDate"],
                      },
                      {
                        $lte: ["$date", "$$endDate"],
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      ]);
      res.json({
        status: "SUCCESS",
        message: "Store time get successfully",
        data: holidays,
      });
    } catch (error) {
      next(error);
    }
  }

  async storeManagerGet(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { store } = req.params;
      const findStoreManager = await UserModel.findOne({
        role: "MANAGER",
        store: store,
      });
      res.json({
        status: "SUCCESS",
        message: "Store manager get successfully",
        data: findStoreManager,
      });
    } catch (error) {
      next(error);
    }
  }

  // finds validators for the user creation request
}
export const storeControlValidator = {
  assignStoreManager: [
    body("displayName")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Display name must be at least 3 characters long")
      .isLength({ max: 100 })
      .withMessage("Display name must be at most 100 characters long"),
    body("email").optional().isEmail().withMessage("Invalid mail id"),
    body("phoneNumber")
      .optional()
      .isLength({ min: 8 })
      .withMessage("Phone number must be at least 8 characters long")
      .isLength({ max: 14 })
      .withMessage("Phone number must be at most 14 characters long"),
    body("countryCode")
      .optional()
      .isLength({ min: 1 })
      .withMessage("Country code must be at least 1 characters long")
      .isLength({ max: 3 })
      .withMessage("Country code must be at most 3 characters long"),
    body("about")
      .optional()
      .isLength({ min: 5 })
      .withMessage("About must be at least 5 characters long")
      .isLength({ max: 500 })
      .withMessage("About must be at most 101 characters long"),
    body("state")
      .optional()
      .isLength({ min: 3 })
      .withMessage("State must be at least 3 characters long")
      .isLength({ max: 25 })
      .withMessage("State must be at most 25 characters long"),
    body("city")
      .not()
      .isEmpty()
      .withMessage("city")
      .isLength({ min: 3 })
      .withMessage("City must be at least 3 characters long")
      .isLength({ max: 21 })
      .withMessage("City must be at most 21 characters long"),
    body("street")
      .not()
      .isEmpty()
      .isLength({ min: 5 })
      .withMessage("Street must be at least 5 characters long")
      .isLength({ max: 80 })
      .withMessage("Street must be at most 80 characters long"),
    body("zip")
      .not()
      .isEmpty()
      .withMessage("zip")
      // .isInt()
      .isLength({ min: 5 })
      .withMessage("zip code must be grater then 5 digit")
      .isLength({ max: 11 })
      .withMessage("zip code must be at most 11 digit"),
    body("zip")
      .not()
      .isEmpty()
      .withMessage("zip is required")
      .isLength({ min: 5 })
      .withMessage("zip code must be grater then 5 digit")
      .isLength({ max: 11 })
      .withMessage("zip code must be at most 11 digit"),
    body("latitude")
      .not()
      .isEmpty()
      .withMessage("latitude is required")
      .isNumeric()
      .withMessage("must be number"),
    body("longitude")
      .not()
      .isEmpty()
      .withMessage("longitude is required")
      .isNumeric()
      .withMessage("must be number"),
    body("country")
      .not()
      .isEmpty()
      .withMessage("country")
      .isLength({ min: 3 })
      .withMessage("Country must be at least 3 characters long")
      .isLength({ max: 25 })
      .withMessage("Country must be at most 25 characters long"),
  ],
  // serviceId, modelId
  getStoreListAccordingServiceAvailability: [
    query("servicesId.*")
      .not()
      .isEmpty()
      .withMessage("servicesId is required.")
      .isMongoId()
      .withMessage("servicesId must be mongoose id."),

    query("servicesId")
      .optional()
      .isMongoId()
      .withMessage("servicesId must be mongoose id."),

    query("modelId.*")
      .not()
      .isEmpty()
      .withMessage("modelId is required.")
      .isMongoId()
      .withMessage("modelId must be mongoose id."),

    query("modelId")
      .optional()
      .isMongoId()
      .withMessage("modelId must be mongoose id."),
  ],
  storeManagerGet: [
    param("store")
      .not()
      .isEmpty()
      .withMessage("store id is required.")
      .isMongoId()
      .withMessage("store must be mongoose id."),
  ],
};

export default Store;

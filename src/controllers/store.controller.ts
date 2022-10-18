import { NextFunction, Response } from "express";
import { body, validationResult } from "express-validator";
import MediaLogic from "../logic/media.logic";
import StoreLogic from "../logic/store.logic";
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
      res.status(200).json({
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
          address: req.body?.address,
          imageURL: imageData?.url,
          imagePath: imageData?.path,
          about: req.body?.about,
          createdBy: req.body?.createdBy,
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
      res.status(200).json({
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
      res.status(200).json({
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
      const categoryData: StoreType[] | null = await StoreModel.find({})
        .populate(["address"])
        .select("-imagePath")
        .sort({ createdAt: -1 });

      // send response to client
      res.status(200).json({
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

  // assign store manager
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
      res.status(200).json({
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
      res.status(200).json({
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
      res.status(200).json({
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
      res.status(200).json({
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
        message: "Hub data found successfully",
        data: getAllStore,
      });
    } catch (error) {
      next(error);
    }
  }

  // finds validators for the user creation request
  public validateCreateStoreFields = [
    body("displayName")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Display name must be at least 3 characters long")
      .isLength({ max: 20 })
      .withMessage("Display name must be at most 20 characters long"),
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
      .isLength({ max: 101 })
      .withMessage("About must be at most 101 characters long"),
    body("state")
      .not()
      .isEmpty()
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
      .isInt()
      .isLength({ min: 5 })
      .withMessage("zip code must be grater then 5 digit")
      .isLength({ max: 11 })
      .withMessage("zip code must be at most 11 digit"),
    body("country")
      .not()
      .isEmpty()
      .withMessage("country")
      .isLength({ min: 3 })
      .withMessage("Country must be at least 3 characters long")
      .isLength({ max: 25 })
      .withMessage("Country must be at most 25 characters long"),
  ];
}

export default Store;

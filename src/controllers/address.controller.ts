import { NextFunction, Response } from "express";
import { body } from "express-validator";
import { fieldValidateError } from "../helper";
import { AddressModel } from "../models/address.model";
import { StoreModel } from "../models/store.model";
import AddressType from "../types/address";
import { AuthRequest } from "../types/core";

class Address {
  // create address
  public async createAddress(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      fieldValidateError(req);
      // save user data to database
      const addressData: AddressType = await new AddressModel({
        user: req.currentUser?._id,
        name: req.body?.name,
        landmark: req.body?.landmark,
        email: req.body?.email,
        phoneNumber: req.body?.phoneNumber,
        countryCode: req.body?.countryCode,
        street: req.body?.street,
        city: req.body?.city,
        houseNumber: req.body?.houseNumber,
        state: req.body?.state,
        country: req.body?.country,
        zip: req.body?.zip,
        isDefault: req.body?.isDefault,
        type: req.body?.type?.toString()?.toUpperCase(),
      }).save();

      if (req.query.storeId) {
        await StoreModel.findByIdAndUpdate(req.query.storeId, {
          address: addressData._id,
        });
      }

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Address added successfully",
        data: addressData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // update address
  public async updateAddress(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      fieldValidateError(req);

      if (req.body?.isDefault) {
        // update all other addresses to false
        await AddressModel.updateMany(
          {
            user: req.currentUser?._id,
            isDefault: true,
          },
          {
            isDefault: false,
          }
        );
      }

      // save user data to database
      const addressData: AddressType | null =
        await AddressModel.findByIdAndUpdate(req.params.addressId, {
          name: req.body?.name,
          landmark: req.body?.landmark,
          email: req.body?.email,
          phoneNumber: req.body?.phoneNumber,
          countryCode: req.body?.countryCode,
          street: req.body?.street,
          city: req.body?.city,
          houseNumber: req.body?.houseNumber,
          state: req.body?.state,
          country: req.body?.country,
          zip: req.body?.zip,
          isDefault: req.body?.isDefault,
          type: req.body?.type?.toString()?.toUpperCase(),
        });

      if (!addressData) throw new Error("Address not found");

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Address updated successfully",
        data: addressData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // get my addresses
  public async getMyAddresses(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      fieldValidateError(req);

      // save user data to database
      const addressesData: AddressType[] = await AddressModel.find({
        user: req.currentUser?._id,
      });

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Addresses found successfully",
        data: addressesData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // get address
  public async getAddress(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      fieldValidateError(req);

      // save user data to database
      const addressData: AddressType | null = await AddressModel.findById(
        req.params.addressId
      );

      if (!addressData) throw new Error("Address not found");

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Address found successfully",
        data: addressData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // get address
  public async deleteAddress(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      fieldValidateError(req);

      // save user data to database
      const addressData: AddressType | null =
        await AddressModel.findByIdAndDelete(req.params.addressId);

      if (!addressData) throw new Error("Address not found");

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Address deleted successfully",
        data: addressData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // finds validators for the user creation request
  public validateCreateAddressFields = [
    body("name")
      .not()
      .isEmpty()
      .withMessage("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .isLength({ max: 20 })
      .withMessage("Name must be at most 20 characters long"),
    body("landmark")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Landmark must be at least 5 characters long")
      .isLength({ max: 25 })
      .withMessage("Landmark must be at most 25 characters long"),
    body("street")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Street must be at least 5 characters long")
      .isLength({ max: 80 })
      .withMessage("Street must be at most 80 characters long"),
    body("city")
      .not()
      .isEmpty()
      .withMessage("city is required")
      .isLength({ min: 3 })
      .withMessage("City must be at least 3 characters long")
      .isLength({ max: 21 })
      .withMessage("City must be at most 21 characters long"),
    body("houseNumber")
      .not()
      .isEmpty()
      .withMessage("houseNumber is required")
      .isLength({ min: 3 })
      .withMessage("houseNumber must be at least 3 characters long")
      .isLength({ max: 21 })
      .withMessage("houseNumber must be at most 21 characters long"),
    body("state")
      .optional()
      .isLength({ min: 3 })
      .withMessage("State must be at least 3 characters long")
      .isLength({ max: 25 })
      .withMessage("State must be at most 25 characters long"),
    body("country")
      .not()
      .isEmpty()
      .withMessage("country")
      .isLength({ min: 2 })
      .withMessage("Country must be at least 2 characters long")
      .isLength({ max: 25 })
      .withMessage("Country must be at most 25 characters long"),
    body("type")
      .optional()
      .custom((value) => {
        if (
          !["HOME", "WORK", "OTHER"].includes(value?.toString()?.toUpperCase())
        ) {
          return false;
        }
        return true;
      })
      .withMessage("type can only be HOME, WORK and OTHER"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("email")
      .isEmail()
      .withMessage("Please enter a valid email"),
    body("zip")
      .not()
      .isEmpty()
      .withMessage("zip")
      .isInt()
      .isLength({ min: 5 })
      .withMessage("zip code must be grater then 5 digit")
      .isLength({ max: 11 })
      .withMessage("zip code must be at most 11 digit"),
    body("isDefault")
      .optional()
      .isBoolean()
      .withMessage("isDefault must be a boolean"),
    body("countryCode")
      .optional()
      .isLength({ min: 2 })
      .withMessage("countryCode must be at least 2 characters long")
      .isLength({ max: 8 })
      .withMessage("countryCode must be at most 8 characters long"),
    body("phoneNumber")
      .not()
      .isEmpty()
      .withMessage("phoneNumber")
      .isInt()
      .isLength({ min: 8, max: 16 })
      .withMessage(
        "phone number must be grater then 8 digit and less then 16 digit"
      ),
  ];

  // finds validators for the user creation request
  public validateUpdateAddressFields = [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .isLength({ max: 20 })
      .withMessage("Name must be at most 20 characters long"),
    body("landmark")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Landmark must be at least 5 characters long")
      .isLength({ max: 25 })
      .withMessage("Landmark must be at most 25 characters long"),
    body("street")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Street must be at least 5 characters long")
      .isLength({ max: 25 })
      .withMessage("Street must be at most 25 characters long"),
    body("city")
      .optional()
      .isLength({ min: 3 })
      .withMessage("City must be at least 3 characters long")
      .isLength({ max: 21 })
      .withMessage("City must be at most 21 characters long"),
    body("state")
      .optional()
      .isLength({ min: 3 })
      .withMessage("State must be at least 3 characters long")
      .isLength({ max: 25 })
      .withMessage("State must be at most 25 characters long"),
    body("country")
      .optional()
      .isLength({ min: 2 })
      .withMessage("Country must be at least 2 characters long")
      .isLength({ max: 25 })
      .withMessage("Country must be at most 25 characters long"),
    body("type")
      .optional()
      .custom((value) => {
        if (
          !["HOME", "WORK", "OTHER"].includes(value?.toString()?.toUpperCase())
        ) {
          return false;
        }
        return true;
      })
      .withMessage("type can only be HOME, WORK and OTHER"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Please enter a valid email"),
    body("zip")
      .optional()
      .isInt()
      .isLength({ min: 5 })
      .withMessage("zip code must be grater then 5 digit")
      .isLength({ max: 11 })
      .withMessage("zip code must be at most 11 digit"),
    body("isDefault")
      .optional()
      .isBoolean()
      .withMessage("isDefault must be a boolean"),
    body("countryCode")
      .optional()
      .isLength({ min: 2 })
      .withMessage("countryCode must be at least 2 characters long")
      .isLength({ max: 8 })
      .withMessage("countryCode must be at most 8 characters long"),
    body("phoneNumber")
      .optional()
      .isInt()
      .isLength({ min: 8, max: 16 })
      .withMessage(
        "phone number must be grater then 8 digit and less then 16 digit"
      ),
  ];
}

export default Address;

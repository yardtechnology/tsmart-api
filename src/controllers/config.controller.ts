import { NextFunction, Response } from "express";
import { body } from "express-validator";
import { InternalServerError } from "http-errors";
import { fieldValidateError } from "../helper";
import { ConfigSchema } from "../models";
import { AuthRequest } from "../types/core";

class ConfigController {
  async createAndUpdate(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);

      const {
        tax,
        storeAndroidMessage,
        storeAndroidVersion,
        storeAndroidTitle,
        storeAndroidIsDismissible,
        storeIosMessage,
        storeIosVersion,
        storeIosTitle,
        storeIosIsDismissible,
        customerAndroidMessage,
        customerAndroidVersion,
        customerAndroidTitle,
        customerAndroidIsDismissible,
        customerIosMessage,
        customerIosVersion,
        customerIosTitle,
        customerIosIsDismissible,

        technicianAndroidMessage,
        technicianAndroidVersion,
        technicianAndroidTitle,
        technicianAndroidIsDismissible,

        technicianIosMessage,
        technicianIosVersion,
        technicianIosTitle,
        technicianIosIsDismissible,
        mailInInstauration,
        aboutUs,
        privacyPolicy,
        termsAndConditions,
        shoppingPolicy,
        mailInstructions,
        ourWarranty,
      } = req.body;

      const createConfig = await ConfigSchema.findOneAndUpdate(
        {},
        {
          tax,

          "storeAndroid.message": storeAndroidMessage,
          "store.Androidversion": storeAndroidVersion,
          "storeAndroid.title": storeAndroidTitle,
          "storeAndroid.isDismissible": storeAndroidIsDismissible,

          "storeIos.message": storeIosMessage,
          "store.Iosversion": storeIosVersion,
          "storeIos.title": storeIosTitle,
          "storeIos.isDismissible": storeIosIsDismissible,

          "customerAndroid.message": customerAndroidMessage,
          "customer.Androidversion": customerAndroidVersion,
          "customerAndroid.title": customerAndroidTitle,
          "customerAndroid.isDismissible": customerAndroidIsDismissible,

          "customerIos.message": customerIosMessage,
          "customer.Iosversion": customerIosVersion,
          "customerIos.title": customerIosTitle,
          "customerIos.isDismissible": customerIosIsDismissible,

          "technicianAndroid.message": technicianAndroidMessage,
          "technician.Androidversion": technicianAndroidVersion,
          "technicianAndroid.title": technicianAndroidTitle,
          "technicianAndroid.isDismissible": technicianAndroidIsDismissible,

          "technicianIos.message": technicianIosMessage,
          "technician.Iosversion": technicianIosVersion,
          "technicianIos.title": technicianIosTitle,
          "technicianIos.isDismissible": technicianIosIsDismissible,
          mailInInstauration,
          aboutUs,
          privacyPolicy,
          termsAndConditions,
          shoppingPolicy,
          mailInstructions,
          ourWarranty,
        },
        {
          runValidators: true,
          new: true,
          upsert: true,
        }
      );
      if (!createConfig)
        throw new InternalServerError(
          "Something went wrong, Config is not created."
        );
      res.json({
        status: "SUCCESS",
        message: "Config created successfully.",
        data: createConfig,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const getConfig = await ConfigSchema.findOne();
      res.json({
        status: "SUCCESS",
        message: "All Config found successfully.s",
        data: getConfig || {},
      });
    } catch (error) {
      next(error);
    }
  }
}
export const ConfigControllerValidation = {
  create: [
    body("tax")
      .optional()

      .isNumeric()
      .withMessage("tax must be number."),
    body("storeAndroidMessage")
      .optional()
      .isLength({ min: 1 })
      .withMessage("storeAndroidMessage must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("storeAndroidMessage must be at most 250 character."),
    body("storeAndroidTitle")
      .optional()
      .isLength({ min: 1 })
      .withMessage("storeAndroidTitle must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("storeAndroidTitle must be at most 250 character."),
    body("storeAndroidVersion").optional(),
    body("storeAndroidIsDismissible")
      .optional()
      .isBoolean()
      .withMessage("storeAndroidIsDismissible must be boolean."),
    //
    //
    body("storeIosMessage")
      .optional()
      .isLength({ min: 1 })
      .withMessage("storeIosMessage must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("storeIosMessage must be at most 250 character."),
    body("storeIosTitle")
      .optional()
      .isLength({ min: 1 })
      .withMessage("storeIosTitle must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("storeIosTitle must be at most 250 character."),
    body("storeIosVersion").optional(),

    body("storeIosIsDismissible")
      .optional()
      .isBoolean()
      .withMessage("storeIosIsDismissible must be boolean."),
    //
    //
    body("customerAndroidMessage")
      .optional()
      .isLength({ min: 1 })
      .withMessage("customerAndroidMessage must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("customerAndroidMessage must be at most 250 character."),
    body("customerAndroidTitle")
      .optional()
      .isLength({ min: 1 })
      .withMessage("customerAndroidTitle must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("customerAndroidTitle must be at most 250 character."),
    body("customerAndroidVersion").optional(),
    body("customerAndroidIsDismissible")
      .optional()
      .isBoolean()
      .withMessage("customerAndroidIsDismissible must be boolean."),

    //
    //
    body("customerIosMessage")
      .optional()
      .isLength({ min: 1 })
      .withMessage("customerIosMessage must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("customerIosMessage must be at most 250 character."),
    body("customerIosTitle")
      .optional()
      .isLength({ min: 1 })
      .withMessage("customerIosTitle must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("customerIosTitle must be at most 250 character."),
    body("customerIosVersion").optional(),
    body("customerIosIsDismissible")
      .optional()
      .isBoolean()
      .withMessage("customerIosIsDismissible must be boolean."),
    //
    //
    body("technicianAndroidMessage")
      .optional()
      .isLength({ min: 1 })
      .withMessage("technicianAndroidMessage must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("technicianAndroidMessage must be at most 250 character."),
    body("technicianAndroidTitle")
      .optional()
      .isLength({ min: 1 })
      .withMessage("technicianAndroidTitle must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("technicianAndroidTitle must be at most 250 character."),
    body("technicianAndroidVersion").optional(),
    body("technicianAndroidIsDismissible")
      .optional()
      .isBoolean()
      .withMessage("technicianAndroidIsDismissible must be boolean."),
    //
    //
    body("technicianIosMessage")
      .optional()
      .isLength({ min: 1 })
      .withMessage("technicianIosMessage must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("technicianIosMessage must be at most 250 character."),
    body("technicianIosTitle")
      .optional()
      .isLength({ min: 1 })
      .withMessage("technicianIosTitle must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("technicianIosTitle must be at most 250 character."),
    body("technicianIosVersion").optional(),
    body("technicianIosIsDismissible")
      .optional()
      .isBoolean()
      .withMessage("technicianIosIsDismissible must be boolean."),
  ],
};

export default ConfigController;

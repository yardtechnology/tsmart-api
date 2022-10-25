import { NextFunction, Response } from "express";
import { body, query } from "express-validator";
import { InternalServerError, NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import MediaLogic from "../logic/media.logic";
import { NotificationSchema } from "../models";
import { AuthRequest } from "../types/core";

class NotificationController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    let iconData: any | undefined;
    try {
      fieldValidateError(req);
      const { userId, title, description, redirectLink } = req.body;
      const iconFile = req?.files?.icon;
      const filePath = `Notification`;

      iconData =
        iconFile && !Array.isArray(iconFile)
          ? await new MediaLogic().uploadMedia(iconFile, filePath)
          : undefined;
      const createNotification = await NotificationSchema.create({
        title,
        description,
        user: userId,
        icon: iconData?.url,
        iconPATH: iconData?.path,
        redirectLink,
      });
      if (!createNotification)
        throw new InternalServerError(
          "Something went wrong, Notification is not created."
        );
      res.json({
        status: "SUCCESS",
        message: "Notification created successfully.",
        data: createNotification,
      });
    } catch (error) {
      if (iconData?.path) {
        new MediaLogic().deleteMedia(iconData?.path);
      }
      next(error);
    }
  }
  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { notificationIds, allRead } = req.body;
      const user = req?.currentUser?._id;

      fieldValidateError(req);
      const notificationArrayCheck = Array.isArray(notificationIds)
        ? notificationIds
        : [notificationIds];
      const queryData = allRead
        ? {
            user,
            readStatus: { $ne: true },
          }
        : {
            _id: { $in: notificationArrayCheck },
            user,
            readStatus: { $ne: true },
          };
      const updateNotification = await NotificationSchema.updateMany(
        queryData,
        {
          readStatus: true,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      res.json({
        status: "SUCCESS",
        message: "Read notification successfully.",
        // data: updateNotification,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);
      const { limit, chunk, notificationId } = req.query;
      const user = req?.currentUser?._id;

      const query: any = {
        user,
      };
      notificationId && (query["_id"] = notificationId);
      const getAllData = await paginationHelper({
        model: NotificationSchema,
        query,
        chunk: chunk ? Number(chunk) : undefined,
        limit: limit ? Number(limit) : undefined,
        select: "",
        populate: "",
        sort: {
          createdAt: -1,
        },
      });
      res.status(200).json({
        status: "SUCCESS",
        message: notificationId
          ? "Notification found successfully."
          : "All notification found successfully.",
        data: notificationId ? getAllData?.data?.[0] : getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { notificationIds, all } = req.body;
      fieldValidateError(req);
      const idArrayCheck = Array.isArray(notificationIds)
        ? notificationIds
        : [notificationIds];
      const user = req?.currentUser?._id;
      const query = all
        ? {
            user,
          }
        : {
            user,
            _id: { $in: idArrayCheck },
          };

      const notificationDelete = await NotificationSchema.deleteMany(query);
      //   delete device image

      if (!notificationDelete) throw new NotFound("No make found for delete.");

      res.json({
        status: "SUCCESS",
        message: "Notification deleted successfully",
        data: notificationDelete,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const NotificationControllerValidation = {
  create: [
    body("title").not().isEmpty().withMessage("title is required."),
    body("description").not().isEmpty().withMessage("description is required."),
    body("userId")
      .not()
      .isEmpty()
      .withMessage("userId is required.")
      .isMongoId()
      .withMessage("user id must be mongoose id."),
  ],
  update: [
    body("notificationIds")
      .custom((value, { req }) => Boolean(value || req.body.allRead))
      .withMessage("notificationIds or allRead is required."),
    body("allRead")
      .optional()
      .exists()
      .isBoolean()
      .withMessage("allRead must be boolean.")
      .custom((value, { req }) => Boolean(value || req.body.allRead))
      .withMessage("notificationIds or allRead is required."),
  ],
  getAll: [
    query("notificationId")
      .optional()
      .isMongoId()
      .withMessage("notificationId must be mongoose id."),
  ],
  delete: [
    body("notificationIds")
      .custom((value, { req }) => Boolean(value || req.body.all))
      .withMessage("notificationIds or all field is required."),
    body("all")
      .optional()
      .exists()
      .isBoolean()
      .withMessage("all must be boolean.")
      .custom((value, { req }) => Boolean(value || req.body.notificationIds))
      .withMessage("notificationIds or all is required."),
  ],
};

export default NotificationController;

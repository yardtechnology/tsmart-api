import { NextFunction, Response } from "express";
import { body } from "express-validator";
import { BadRequest } from "http-errors";
import NotificationLogic from "../logic/notification.logics";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";
import MailController from "./mail.controller";

class ReplayController {
  async replay(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      //   fieldValidateError(req);
      const { subject, body, userId, isEmailSend, isNotification, email } =
        req.body;
      console.log({ body: req.body });
      isNotification &&
        (await new NotificationLogic().pushNotification({
          title: subject,
          body: body,
          userIds: [userId],
        }));
      // email send

      const userData = userId ? await UserModel.findById(userId) : undefined;
      if (userId && !userData?.email)
        throw new BadRequest("No email found in this user");
      console.log({ email });
      await new MailController().sendHtmlMail({
        to: userData?.email || email,
        subject: subject,
        html: body,
      });

      res.json({
        status: "SUCCESS",
        message: "Replay send successfully.",
        // data: reviewDevice,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const ReplayControllerValidation = {
  replay: [
    body("subject").not().exists().withMessage("subject is required."),
    body("body").not().exists().withMessage("body is required."),
    body("userId")
      .optional()
      .if(
        (value: string, { req }: any) =>
          req.body?.isEmailSend || req?.body?.isNotification
      )
      .not()
      .exists()
      .withMessage("userId is required.")
      .isMongoId()
      .withMessage("userId must be mongoes id."),
    body("isEmailSend")
      .optional()
      .isBoolean()
      .withMessage("isEmailSend must be boolean."),
    body("isNotification")
      .optional()
      .isBoolean()
      .withMessage("isNotification must be boolean."),
  ],
};

export default ReplayController;

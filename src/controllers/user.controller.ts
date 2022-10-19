import { NextFunction, Response } from "express";
import { body, validationResult } from "express-validator";
import { NotAcceptable } from "http-errors";
import MediaLogic from "../logic/media.logic";
import UserLogic from "../logic/user.logic";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";
import UserType from "../types/user";
import MailController from "./mail.controller";

class User extends MediaLogic {
  // create user
  public async updateUserInfo(
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
      const avatarFile = req.files?.avatar;
      const filePath = `${req.currentUser?._id}`;
      const avatarData: any | undefined =
        avatarFile && !Array.isArray(avatarFile)
          ? await super.uploadMedia(avatarFile, filePath)
          : undefined;
      // get provided user data
      const { displayName, gender, phoneNumber } = req.body;

      // save user data to database
      const updatedUser: UserType | null = await UserModel.findByIdAndUpdate(
        req.currentUser?._id,
        {
          displayName,
          gender,
          phoneNumber,
          avatar: avatarData?.url,
          avatarPath: avatarData?.path,
          "fcmTokens.android":
            req.body?.fcmTokenAndroid || req.body?.fcmTokens?.android,
          "fcmTokens.ios": req.body?.fcmTokenIos || req.body?.fcmTokens?.ios,
          "fcmTokens.web": req.body?.fcmTokenWeb || req.body?.fcmTokens?.web,
          isOnline: req?.body?.isOnline,
        }
      );

      // delete previous avatar
      avatarData?.path &&
        updatedUser?.avatarPath &&
        super.deleteMedia(updatedUser?.avatarPath);

      if (!updatedUser) throw new Error("User not found");

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "User updated successfully",
        data: {
          _id: updatedUser._id,
          displayName: updatedUser.displayName,
          email: updatedUser.email,
          gender: updatedUser.gender,
          phoneNumber: updatedUser.phoneNumber,
          avatar: updatedUser.avatar,
        },
      });
    } catch (error) {
      console.log({ error });
      // send error to client
      next(error);
    }
  }

  // get my account
  public async getMyAccount(
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

      // save user data to database
      const userData: UserType | null = await UserModel.findById(
        req.currentUser?._id
      ).select("-encrypted_password -salt -verificationInfo -refreshTokens");

      if (!userData) throw new Error("User not found");

      let cartCount;
      try {
        //TODO: ADD DYNAMIC CART COUNT
        cartCount = 0;
      } catch (error) {
        cartCount = 0;
      }

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "User found successfully",
        data: { ...userData?._doc, cartCount },
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  //get all user
  public async getAllUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      // validator error handler
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new NotAcceptable(
          errors
            .array()
            .map((errors) => errors.msg)
            .join()
            .replace(/[,]/g, " and ")
        );
      }
      const data = new UserLogic().getAllUsers({
        chunk: req?.query?.chunk ? Number(req.query.limit) : undefined,
        limit: req?.query?.limit ? Number(req.query.chunk) : undefined,
        role: req?.query?.role as string | undefined,
        status: req?.query?.status as string | undefined,
      });

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Users found successfully",
        data: data,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // create store manager
  public async createStoreManager(
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
      const managerData = await new UserLogic().createStoreManager(req.body);
      new MailController().sendMail({
        to: req.currentUser?.email as string,
        subject: "Store Manager Created",
        text: `
        Email : ${req.body.email}
        Password : ${req.body.password}
        `,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Store manager created successfully",
        data: managerData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  //TODO: DELETE USER AND CORRESPONDING DATA

  //change user block status
  public async changeUserBlockStatus(
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

      // save user data to database
      const userData = await new UserLogic().changeBlockStatus(
        req.params.userId,
        req.body.blockStatus
      );
      new MailController().sendHtmlMail({
        to: userData.email,
        subject: `Your account has been ${req.body.blockStatus
          ?.toString()
          ?.toLowerCase()}`,
        templet: "normal",
        html: `
        <div>
          <h1>Your account has been ${req.body.blockStatus
            ?.toString()
            ?.toLowerCase()}</h1>

          <p>
            If you have any questions, please contact us at ${
              process.env.SUPPORT_EMAIL
            }
          </p>

          <p>
            Thank you for using ${process.env.APP_NAME}
          </p>
        </div>
        `,
      });

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "User updated successfully",
        data: userData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // verify user
  public async accountStatusChange(
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
      const userData = await UserModel.findByIdAndUpdate(req.params?.userId, {
        status: req.body?.status,
      });
      if (!userData) throw new Error("User not found");
      new MailController().sendHtmlMail({
        to: userData.email,
        subject: `Your account has been ${req.body?.status
          ?.toString()
          ?.toLowerCase()}`,
        templet: "normal",
        html: `
        <div>
          <h1>Your account has been ${req.body?.status
            ?.toString()
            ?.toLowerCase()}</h1>

          <p>
            If you have any questions, please contact us at ${
              process.env.SUPPORT_EMAIL
            }
            
          </p>
          <p>
            Thank you for using ${process.env.APP_NAME}
           
          </p>
        </div>
        `,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "User updated successfully",
        data: {
          _id: userData._id,
          status: userData.status,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
        },
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // get all users
  public async getAllUsersController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      let userData;
      // save user data to database
      switch (req.currentUser?.role) {
        case "ADMIN":
          userData = await new UserLogic().getAllUsers({
            chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            role: req.query.role
              ? req.query.role?.toString()?.toUpperCase()
              : undefined,
            status: req.query.status
              ? req.query?.status?.toString()?.toUpperCase()
              : undefined,
          });
          break;
        // case "MANAGER":
        //   const storeId = await UserModel.findById(req.currentUser._id)
        //     .select("store")
        //     .populate("store");
        //   if (!storeId?.store) throw new Error("manager has no store");
        //   userData = await new StoreLogic().getAllStoresCustomers({
        //     chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
        //     limit: req.query.limit ? Number(req.query.limit) : undefined,
        //     storeId: storeId?.store?._id,
        //   });
        //   break;

        default:
          throw new Error("You are not authorized to access this route");
      }
      res.status(200).json({
        status: "SUCCESS",
        message: "User updated successfully",
        data: userData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // field validators for the user creation request
  public validateUpdateUserFields = [
    body("displayName")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Display name must be at least 3 characters long")
      .isLength({ max: 20 })
      .withMessage("Display name must be at most 20 characters long"),
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("gender")
      .optional()
      .custom((value) => {
        if (!["MALE", "FEMALE", "OTHER"].includes(value)) {
          return false;
        }
        return true;
      })
      .withMessage("Gender can only be MALE FEMALE and OTHER"),
    body("phoneNumber")
      .optional()
      .isInt()
      .isLength({ min: 8 })
      .withMessage("phone number must be grater then 8 digit"),
  ];

  //field validation for change block status
  public validateChangeBlockStatusFields = [
    body("blockStatus")
      .not()
      .isEmpty()
      .withMessage("Block status is required")
      .custom((value) => {
        if (!["BLOCKED", "UNBLOCKED"].includes(value)) {
          return false;
        }
        return true;
      })
      .withMessage("Block status can only be BLOCKED and UNBLOCKED"),
  ];

  //status change validation
  public validateStatusChangeFields = [
    body("status")
      .not()
      .isEmpty()
      .withMessage("Status is required")
      .custom((value) => {
        if (
          !["INACTIVE", "ACTIVE", "PENDING", "VERIFIED", "REJECTED"].includes(
            value
          )
        ) {
          return false;
        }
        return true;
      })
      .withMessage(
        "Status can only be INACTIVE , ACTIVE , PENDING and VERIFIED"
      ),
  ];
}

export default User;

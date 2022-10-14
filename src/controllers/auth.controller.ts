import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import md5 from "md5";
import { createOTP } from "../helper/core.helper";
import AuthLogic from "../logic/auth.logic";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";
import UserType from "../types/user";
import MailController from "./mail.controller";

class Auth extends AuthLogic {
  // create user
  public async createUser(
    req: Request,
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

      // get provided user data
      const {
        displayName,
        email,
        password,
        confirmPassword,
        phoneNumber,
        countryCode,
        role,
      } = req.body;
      console.log(req.body);

      // save user data to database
      const newUser: UserType = await new UserModel({
        displayName,
        email,
        password,
        phoneNumber,
        countryCode,
        confirmPassword,
        role,
        photoURL: `https://www.gravatar.com/avatar/${md5(email)}?d=identicon`,
      }).save();

      // create secret
      const secret: string = await super.getAccessToken(
        {
          _id: newUser._id,
          email: newUser.email,
        },
        "1d"
      );

      // send mail for email verification
      new MailController().sendHtmlMail({
        to: email,
        templet: "normal",
        subject: "Email Verification",
        html: `<h1>Email Verification</h1>
        <p>
          Please click on the link below to verify your email:
          </p>
          <a href="${process.env.API_END_POINT}/auth/verify-email/${secret}">
            Verify Email
            </a>`,
      });

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "User created successfully",
        data: {
          _id: newUser._id,
          displayName: newUser.displayName,
          email: newUser.email,
        },
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // login user
  public async loginUser(
    req: Request,
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

      // get provided user data
      const { email, password } = req.body;

      // find user by email
      const userData: UserType | null = await UserModel.findOne({ email });

      // check if user exists
      if (!userData) {
        throw new Error("User not found");
      }

      // check if password is correct
      if (!userData.authenticate(password)) {
        throw new Error("Password is incorrect");
      }

      // check if user is Active or not
      if (userData.status === "INACTIVE") {
        throw new Error("Email is not verified");
      }

      //check is user is blocked or not
      if (userData.blockStatus === "BLOCKED") {
        throw new Error("User is blocked");
      }

      // get JWT token
      const ACCESS_TOKEN: string = await super.getAccessToken({
        _id: userData._id,
        email: userData.email,
        role: userData.role,
      });

      const userAgent: string =
        req
          ?.get("user-agent")
          ?.split(")")[0]
          .replace("(", "")
          .replace(/;/g, "")
          .replace(/ /g, "-") || "unknown-device";

      await UserModel.findByIdAndUpdate(userData._id, {
        isLoggedIn: true,
        isOnline: true,
        lastLogin: new Date(),
      });

      //send new login detection to mail
      new MailController().sendHtmlMail({
        to: userData.email,
        subject: "New Login",
        templet: "normal",
        html: `<h1>New Login</h1>
        <p>
          Someone logged in to your account.
          </p>
          <p>
          Device: ${userAgent.replace(/-/g, " ")}
          </p>
          <p>
          Time: ${new Date()}

          <p>
          if you did not login to your account, please login to your account and change your password.
          </p>

          <a href="${process.env.WEBSITE_END_POINT}/signin">
            Login
            </a>

            <p>
            Thanks, <br>
            ${process.env.WEBSITE_NAME}


            </p>
          </p>`,
      });

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "User logged in successfully",
        ACCESS_TOKEN,
        data: {
          _id: userData._id,
          displayName: userData.displayName,
          email: userData.email,
          role: userData.role,
        },
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // email verification
  public async verifyEmailController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { secret } = req.params;

      // decrypt secret
      const decryptedSecret: UserType = await super.verifyAccessToken(secret);
      console.log({ decryptedSecret });

      // update user status to ACTIVE
      const userData: UserType | null = await UserModel.findOneAndUpdate(
        { _id: decryptedSecret._id },
        { status: "ACTIVE" }
      );

      // check if user exists
      if (!userData) throw new Error("User not found");

      // check if user is already verified
      if (userData.status !== "INACTIVE")
        throw new Error("Email is already verified");

      res.redirect(`${process.env.WEBSITE_END_POINT}`);
    } catch (error) {
      const err = error as Error;
      // redirect user to website end point if error occurs
      res.redirect(
        `${process.env.WEBSITE_END_POINT}/verify-email?error=true&errorMessage=${err.message}`
      );
    }
  }

  // resend email verification
  public async resendEmailVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // get provided user data
      const { email } = req.body;

      // find user by email
      const userData: UserType | null = await UserModel.findOne({ email });

      // check if user exists
      if (!userData) throw new Error("User not found");

      // check if user is already verified
      if (userData.status !== "INACTIVE")
        throw new Error("Email is already verified");

      // create secret
      const secret: string = await super.getAccessToken(
        {
          _id: userData._id,
          email: userData.email,
        },
        "1d"
      );

      // send mail for email verification
      new MailController().sendHtmlMail({
        to: email,
        templet: "normal",
        subject: "Email Verification",
        html: `<h1>Email Verification</h1>
        <p>
          Please click on the link below to verify your email:
          </p>
          <a href="${process.env.API_END_POINT}/auth/verify-email/${secret}">
            Verify Email
            </a>`,
      });

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Email sent successfully",
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // change password
  public async changePassword(
    req: Request,
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

      // get provided user data
      const { email, oldPassword, newPassword } = req.body;

      // find user by email
      const userData: UserType | null = await UserModel.findOne({ email });

      // check if user exists
      if (!userData) throw new Error("User not found");

      // check if password is correct
      if (!userData.authenticate(oldPassword))
        throw new Error("Password is incorrect");

      // update user password
      userData.password = newPassword;
      await userData.save();

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Password changed successfully",
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // forgot password otp send
  public async forgotPasswordOtpSend(
    req: Request,
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

      // get provided user data
      const { email } = req.body;

      // find user by email
      const userData: UserType | null = await UserModel.findOne({ email });

      // check if user exists
      if (!userData) throw new Error("User not found");

      const OTP = createOTP(6); // generate 6 digit OTP

      await UserModel.findByIdAndUpdate(userData._id, {
        verificationInfo: {
          OTP,
          OTPExpiry: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
        },
      });

      // send mail for email verification
      new MailController().sendHtmlMail({
        to: email,
        subject: "Forgot Password OTP",
        templet: "normal",
        html: `<h1>Forgot Password OTP</h1>
        <p>
          Please enter the OTP below to reset your password:
          </p>
          <h1>${OTP}</h1>
          `,
      });

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Email sent successfully",
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // forgot password otp verify and change password
  public async forgotPasswordOtpVerifyAndChangePassword(
    req: Request,
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

      // get provided user data
      const { email, OTP, newPassword } = req.body;

      // find user by email
      const userData: UserType | null = await UserModel.findOne({ email });

      // check if user exists
      if (!userData) throw new Error("User not found");

      // check if OTP is correct
      if (userData.verificationInfo.OTP !== OTP)
        throw new Error("OTP is incorrect");

      // check if OTP is expired
      if (new Date(userData.verificationInfo.OTPExpiry) < new Date())
        throw new Error("OTP is expired");

      // check if new password is same as old password
      if (userData.authenticate(newPassword))
        throw new Error("New password cannot be same as old password");

      // update user password
      userData.password = newPassword;
      await userData.save();

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Password changed successfully",
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // logout
  public async logout(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userData = await UserModel.findByIdAndUpdate(req.currentUser?._id, {
        isLoggedIn: false,
        isOnline: false,
        token: null,
      });

      if (!userData) throw new Error("User not found");

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // finds validators for the user creation request
  public validateUserCreationFields = [
    body("displayName", "display name is required")
      .isLength({ min: 3 })
      .withMessage("Display name must be at least 3 characters long")
      .isLength({ max: 20 })
      .withMessage("Display name must be at most 20 characters long"),
    body("email", "Email is required")
      .isEmail()
      .withMessage("Invalid mail id")
      .normalizeEmail(),
    body("confirmPassword", "Confirm password is required")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match");
        }
        return true;
      })
      .withMessage("Password confirmation does not match"),
  ];
  // finds validators for the user creation request
  public validateTechnicianRegisterFields = [
    body("displayName", "display name is required")
      .isLength({ min: 3 })
      .withMessage("Display name must be at least 3 characters long")
      .isLength({ max: 20 })
      .withMessage("Display name must be at most 20 characters long"),
    body("email", "Email is required")
      .isEmail()
      .withMessage("Invalid mail id")
      .normalizeEmail(),
    body("phoneNumber", "phoneNumber is required")
      .isNumeric()
      .withMessage("Phone number must be a Number")
      .isLength({ min: 6, max: 16 })
      .withMessage("Phone number length must be 6 to 16 "),
    body("countryCode").not().isEmpty().withMessage("countryCode is Required"),
    body("password", "Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("password", "Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("confirmPassword", "Confirm password is required")
      .custom((value, { req }) => {
        req.body.role = "TECHNICIAN";
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match");
        }
        return true;
      })
      .withMessage("Password confirmation does not match"),
  ];

  // finds validators for the user login request
  public validateLoginFields = [
    body("email", "Email is required").isEmail().withMessage("Invalid mail id"),
    body("password", "Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];

  // finds validators for mail verify request
  public validateResendEmailVerificationFields = [
    body("email", "Email is required").isEmail().withMessage("Invalid mail id"),
  ];

  // finds validators for password change request
  public validateChangePasswordFields = [
    body("email", "Email is required").isEmail().withMessage("Invalid mail id"),
    body("oldPassword", "Old password is required")
      .isLength({ min: 6 })
      .withMessage("Old password must be at least 6 characters long"),
    body("newPassword", "New password is required")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters long")
      .custom((value, { req }) => {
        if (value === req.body.oldPassword) {
          return false;
        }
        return true;
      })
      .withMessage("Old password and new password cannot be same"),
    body("confirmPassword", "Confirm password is required")
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("New password confirmation does not match");
        }
        return true;
      })
      .withMessage("New password confirmation does not match"),
  ];

  // finds validators for the user creation request
  public validateForgotPasswordOtpSendFields = [
    body("email", "Email is required").isEmail().withMessage("Invalid mail id"),
  ];
  // fields validation for gating access token
  public validateGetAccessTokenFields = [
    body("refresh_token").isString().withMessage("Refresh token is required"),
  ];

  // finds validators for password change request
  public validateForgotPasswordFields = [
    body("email", "Email is required").isEmail().withMessage("Invalid mail id"),
    body("OTP", "Old is required")
      .isLength({ min: 6 })
      .withMessage("OTP must be at least 6 digit long")
      .toInt(),
    body("newPassword", "New password is required")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters long")
      .custom((value, { req }) => {
        if (value === req.body.oldPassword) {
          return false;
        }
        return true;
      })
      .withMessage("Old password and new password cannot be same"),
    body("confirmPassword", "Confirm password is required")
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("New password confirmation does not match");
        }
        return true;
      })
      .withMessage("New password confirmation does not match"),
  ];
}

export default Auth;

import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class Auth extends AuthenticateMiddleware {
  public router: Router;
  private authController: AuthController;

  constructor() {
    super();
    this.router = Router();
    this.authController = new AuthController();
    this.createUserRoute();
    this.registerTechnician();
    this.loginUserRoute();
    this.verifyEmailRoute();
    this.resendEmailVerificationRoute();
    this.changePasswordRoute();
    this.forgotPasswordOtpSendRoute();
    this.forgotPasswordOtpVerifyAndChangePasswordRoute();
    this.logoutRoute();
  }

  // create user
  private createUserRoute(): void {
    this.router.post(
      "/auth/signup",
      this.authController.validateUserCreationFields,
      this.authController.createUser
    );
  }

  // create user
  private registerTechnician(): void {
    this.router.post(
      "/auth/register-technician",
      this.authController.validateTechnicianRegisterFields,
      this.authController.registerTechnician
    );
  }

  // user login
  private loginUserRoute(): void {
    this.router.post(
      "/auth/login",
      this.authController.validateLoginFields,
      this.authController.loginUser
    );
  }

  // verify email
  private verifyEmailRoute(): void {
    this.router.get(
      "/auth/verify-email/:secret",
      this.authController.verifyEmailController
    );
  }

  // resend email verification
  private resendEmailVerificationRoute(): void {
    this.router.post(
      "/auth/resend-email-verification",
      this.authController.validateResendEmailVerificationFields,
      this.authController.resendEmailVerification
    );
  }

  // change password
  private changePasswordRoute(): void {
    this.router.post(
      "/auth/change-password",
      this.authController.validateChangePasswordFields,
      this.authController.changePassword
    );
  }

  // forgot password
  private forgotPasswordOtpSendRoute(): void {
    this.router.post(
      "/auth/forgot-password",
      this.authController.validateForgotPasswordOtpSendFields,
      this.authController.forgotPasswordOtpSend
    );
  }

  // forgot password otp verify and change password
  private forgotPasswordOtpVerifyAndChangePasswordRoute(): void {
    this.router.post(
      "/auth/forgot-password/verify-otp",
      this.authController.validateForgotPasswordFields,
      this.authController.forgotPasswordOtpVerifyAndChangePassword
    );
  }

  // logout
  private logoutRoute(): void {
    this.router.put(
      "/auth/logout",
      super.isAuthenticated,
      this.authController.logout
    );
  }
}

export default Auth;

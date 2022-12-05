"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.authController = new auth_controller_1.default();
        _this.sendOTPRoute();
        _this.verifyOTPRoute();
        _this.createUserRoute();
        _this.registerTechnician();
        _this.loginUserRoute();
        _this.verifyEmailRoute();
        _this.resendEmailVerificationRoute();
        _this.changePasswordRoute();
        _this.forgotPasswordOtpSendRoute();
        _this.forgotPasswordOtpVerifyAndChangePasswordRoute();
        _this.logoutRoute();
        return _this;
    }
    // send otp
    Auth.prototype.sendOTPRoute = function () {
        this.router.post("/auth/send-otp", this.authController.validateSendOtpFields, this.authController.sendOtp);
    };
    // verify otp
    Auth.prototype.verifyOTPRoute = function () {
        this.router.post("/auth/verify-otp", this.authController.validateVerifyOtpFields, this.authController.verifyOtp);
    };
    // create user
    Auth.prototype.createUserRoute = function () {
        this.router.post("/auth/signup", this.authController.validateUserCreationFields, this.authController.createUser);
    };
    // create user
    Auth.prototype.registerTechnician = function () {
        this.router.post("/auth/register-technician", this.authController.validateTechnicianRegisterFields, this.authController.registerTechnician);
    };
    // user login
    Auth.prototype.loginUserRoute = function () {
        this.router.post("/auth/login", this.authController.validateLoginFields, this.authController.loginUser);
    };
    // verify email
    Auth.prototype.verifyEmailRoute = function () {
        this.router.get("/auth/verify-email/:secret", this.authController.verifyEmailController);
    };
    // resend email verification
    Auth.prototype.resendEmailVerificationRoute = function () {
        this.router.post("/auth/resend-email-verification", this.authController.validateResendEmailVerificationFields, this.authController.resendEmailVerification);
    };
    // change password
    Auth.prototype.changePasswordRoute = function () {
        this.router.post("/auth/change-password", this.authController.validateChangePasswordFields, this.authController.changePassword);
    };
    // forgot password
    Auth.prototype.forgotPasswordOtpSendRoute = function () {
        this.router.post("/auth/forgot-password", this.authController.validateForgotPasswordOtpSendFields, this.authController.forgotPasswordOtpSend);
    };
    // forgot password otp verify and change password
    Auth.prototype.forgotPasswordOtpVerifyAndChangePasswordRoute = function () {
        this.router.post("/auth/forgot-password/verify-otp", this.authController.validateForgotPasswordFields, this.authController.forgotPasswordOtpVerifyAndChangePassword);
    };
    // logout
    Auth.prototype.logoutRoute = function () {
        this.router.put("/auth/logout", _super.prototype.isAuthenticated, this.authController.logout);
    };
    return Auth;
}(authenticate_middleware_1.default));
exports.default = Auth;

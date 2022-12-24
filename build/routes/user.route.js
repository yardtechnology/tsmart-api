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
var user_controller_1 = __importDefault(require("../controllers/user.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.userController = new user_controller_1.default();
        _this.createUserRoute();
        _this.getMyAccountRoute();
        _this.createStoreManagerRoute();
        _this.changeBlockStatusRoute();
        _this.statusChangeRoute();
        _this.getAllUsersRoute();
        _this.onDutyRecordRoute();
        _this.deleteUserRoute();
        return _this;
    }
    // create user
    Auth.prototype.createUserRoute = function () {
        this.router.put("/user/account", _super.prototype.isAuthenticated, this.userController.validateUpdateUserFields, this.userController.updateUserInfo);
    };
    // get my account
    Auth.prototype.getMyAccountRoute = function () {
        this.router.get("/user/my-account", _super.prototype.isAuthenticated, this.userController.getMyAccount);
    };
    // create store manager
    Auth.prototype.createStoreManagerRoute = function () {
        this.router.post("/user/manager", _super.prototype.isAuthenticated, this.userController.validateUpdateUserFields, this.userController.createStoreManager);
    };
    // TODO: DELETE USER AND CORRESPONDING DATA
    //change block status
    Auth.prototype.changeBlockStatusRoute = function () {
        this.router.put("/user/block-status/:userId", _super.prototype.isAdmin, this.userController.validateChangeBlockStatusFields, this.userController.changeUserBlockStatus);
    };
    //TODO: GET ALL USERS FOR STORE AND ADMIN
    //status change
    Auth.prototype.statusChangeRoute = function () {
        this.router.put("/user/status/:userId", _super.prototype.isAdmin, this.userController.validateStatusChangeFields, this.userController.accountStatusChange);
    };
    //get all users
    Auth.prototype.getAllUsersRoute = function () {
        this.router.get("/users/all", _super.prototype.isManager, this.userController.getAllUsersController);
    };
    //is on duty status change | online record maintaining
    Auth.prototype.onDutyRecordRoute = function () {
        this.router.put("/user/is-on-duty", _super.prototype.isAuthenticated, this.userController.onlineRecordController);
    };
    //delete user
    Auth.prototype.deleteUserRoute = function () {
        this.router.delete("/user", _super.prototype.isAuthenticated, this.userController.deleteUserController);
    };
    return Auth;
}(authenticate_middleware_1.default));
exports.default = Auth;

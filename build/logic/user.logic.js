"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mail_controller_1 = __importDefault(require("../controllers/mail.controller"));
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var models_1 = require("../models");
var address_model_1 = require("../models/address.model");
var cartItem_model_1 = require("../models/cartItem.model");
var user_model_1 = require("../models/user.model");
var wishlist_model_1 = require("../models/wishlist.model");
var media_logic_1 = __importDefault(require("./media.logic"));
var UserLogic = /** @class */ (function () {
    function UserLogic(userId) {
        this.userId = userId;
    }
    // create store manager
    UserLogic.prototype.createStoreManager = function (_a) {
        var _this = this;
        var displayName = _a.displayName, email = _a.email, password = _a.password, phoneNumber = _a.phoneNumber, store = _a.store;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var userData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new user_model_1.UserModel({
                                displayName: displayName,
                                email: email,
                                password: password,
                                phoneNumber: phoneNumber,
                                role: "MANAGER",
                                store: store,
                                status: "ACTIVE",
                            }).save()];
                    case 1:
                        userData = _a.sent();
                        resolve(userData);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        reject(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    // get user data
    UserLogic.prototype.getUserData = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var userData, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.UserModel.findById(id || this.userId)];
                    case 1:
                        userData = _a.sent();
                        if (!userData)
                            throw new Error("User not found");
                        resolve(userData);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        reject(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    //change users block status
    UserLogic.prototype.changeBlockStatus = function (id, blockStatus) {
        return __awaiter(this, void 0, void 0, function () {
            var userData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.UserModel.findByIdAndUpdate(id, {
                            blockStatus: blockStatus,
                        })];
                    case 1:
                        userData = _a.sent();
                        if (!userData)
                            throw new Error("User not found");
                        return [2 /*return*/, userData];
                }
            });
        });
    };
    //get all users
    UserLogic.prototype.getAllUsers = function (_a) {
        var _this = this;
        var chunk = _a.chunk, limit = _a.limit, _b = _a.role, role = _b === void 0 ? "USER" : _b, status = _a.status;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var query, allUsers;
            return __generator(this, function (_a) {
                try {
                    query = {
                        role: role,
                        status: status,
                    };
                    !status && delete query.status;
                    allUsers = (0, pagination_helper_1.default)({
                        model: user_model_1.UserModel,
                        query: query,
                        sort: { createdAt: -1 },
                        chunk: chunk,
                        limit: limit,
                        populate: [
                            {
                                path: "deviceType",
                                select: "-imagePATH -type",
                            },
                            {
                                path: "makeType",
                                select: "-imagePATH -type -devices",
                            },
                        ],
                        select: "-encrypted_password -salt -refreshTokens -verificationInfo",
                    });
                    resolve(allUsers);
                }
                catch (error) {
                    reject(error);
                }
                return [2 /*return*/];
            });
        }); });
    };
    //check if user is verified
    UserLogic.prototype.isUserVerified = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var userData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.UserModel.findById(id)];
                    case 1:
                        userData = _a.sent();
                        if (!userData)
                            throw new Error("User not found");
                        if (userData.status !== "VERIFIED")
                            throw new Error("Please verify your account by providing GST number or uploading GST document");
                        return [2 /*return*/, true];
                }
            });
        });
    };
    //check is user blocked
    UserLogic.prototype.isUserBlocked = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var userData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.UserModel.findById(id)];
                    case 1:
                        userData = _a.sent();
                        if (!userData)
                            throw new Error("User not found");
                        if ((userData === null || userData === void 0 ? void 0 : userData.blockStatus) === "BLOCKED")
                            throw new Error("User is blocked");
                        return [2 /*return*/, true];
                }
            });
        });
    };
    //delete user
    UserLogic.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, userData, mediaLogic, deletedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = id || this.userId;
                        return [4 /*yield*/, user_model_1.UserModel.findById(userId)];
                    case 1:
                        userData = _a.sent();
                        //if user not found
                        if (!userData)
                            throw new Error("User not found");
                        //delete all cart items
                        return [4 /*yield*/, cartItem_model_1.CartItemModel.deleteMany({ user: userData._id })];
                    case 2:
                        //delete all cart items
                        _a.sent();
                        //delete all wishlist items
                        return [4 /*yield*/, wishlist_model_1.WishListModel.deleteMany({ user: userData._id })];
                    case 3:
                        //delete all wishlist items
                        _a.sent();
                        //delete all addresses
                        return [4 /*yield*/, address_model_1.AddressModel.deleteMany({ user: userData._id })];
                    case 4:
                        //delete all addresses
                        _a.sent();
                        //delete all notifications
                        return [4 /*yield*/, models_1.NotificationSchema.deleteMany({ user: userData._id })];
                    case 5:
                        //delete all notifications
                        _a.sent();
                        mediaLogic = new media_logic_1.default();
                        // delete avatar
                        userData.avatarPath && mediaLogic.deleteMedia(userData === null || userData === void 0 ? void 0 : userData.avatarPath);
                        // delete faceVideo
                        userData.faceVideoPATH && mediaLogic.deleteMedia(userData === null || userData === void 0 ? void 0 : userData.faceVideoPATH);
                        // delete faceVideo
                        userData.documentPATH && mediaLogic.deleteMedia(userData === null || userData === void 0 ? void 0 : userData.documentPATH);
                        return [4 /*yield*/, user_model_1.UserModel.findByIdAndDelete(userId)];
                    case 6:
                        deletedUser = _a.sent();
                        new mail_controller_1.default().sendHtmlMail({
                            to: userData === null || userData === void 0 ? void 0 : userData.email,
                            subject: "Account Deleted",
                            html: "\n      <h1>Account Deleted</h1>\n      <p>Your account has been deleted</p>\n      ",
                        });
                        return [2 /*return*/, deletedUser];
                }
            });
        });
    };
    return UserLogic;
}());
exports.default = UserLogic;

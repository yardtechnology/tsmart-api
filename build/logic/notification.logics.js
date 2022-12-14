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
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = require("http-errors");
var config_1 = require("../config");
var models_1 = require("../models");
var user_model_1 = require("../models/user.model");
// import NotificationLogic from "./notification.logic";
var NotificationLogic = /** @class */ (function () {
    function NotificationLogic() {
    }
    NotificationLogic.prototype.pushNotification = function (_a) {
        var title = _a.title, body = _a.body, imageUrl = _a.imageUrl, userIds = _a.userIds, users = _a.users, data = _a.data;
        return __awaiter(this, void 0, void 0, function () {
            var usersDetails, _b, args, tokens, tempStr, makeStString, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        if (!users && !userIds)
                            throw new http_errors_1.BadRequest("NotificationFunction users or userIds is required.");
                        _b = users;
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserModel.find({ _id: { $in: userIds } }).select("fcmTokens")];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        usersDetails = _b;
                        args = data
                            ? data
                            : {
                                screen: "Notification",
                            };
                        tokens = usersDetails.map(function (user) {
                            new models_1.NotificationSchema({
                                title: title,
                                description: body,
                                user: user === null || user === void 0 ? void 0 : user._id,
                            }).save();
                            if (user === null || user === void 0 ? void 0 : user.fcmTokens)
                                return Object.values(user.fcmTokens);
                            return [];
                        });
                        tempStr = tokens.flat();
                        makeStString = tempStr.filter(function (item) { return item !== undefined; });
                        if (!(makeStString === null || makeStString === void 0 ? void 0 : makeStString.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, config_1.Admin.messaging().sendMulticast({
                                tokens: makeStString,
                                notification: {
                                    title: title,
                                    body: body,
                                    imageUrl: imageUrl,
                                },
                                data: args,
                            })];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _c.sent();
                        throw error_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return NotificationLogic;
}());
exports.default = NotificationLogic;

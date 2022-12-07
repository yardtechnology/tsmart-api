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
exports.ReplayControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var notification_logics_1 = __importDefault(require("../logic/notification.logics"));
var user_model_1 = require("../models/user.model");
var mail_controller_1 = __importDefault(require("./mail.controller"));
var ReplayController = /** @class */ (function () {
    function ReplayController() {
    }
    ReplayController.prototype.replay = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, subject, body_1, userId, isEmailSend, isNotification, _b, userData, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 6, , 7]);
                        _a = req.body, subject = _a.subject, body_1 = _a.body, userId = _a.userId, isEmailSend = _a.isEmailSend, isNotification = _a.isNotification;
                        _b = isNotification;
                        if (!_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, new notification_logics_1.default().pushNotification({
                                title: subject,
                                body: body_1,
                                userIds: [userId],
                            })];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        _b;
                        if (!(isEmailSend && userId)) return [3 /*break*/, 5];
                        return [4 /*yield*/, user_model_1.UserModel.findById(userId)];
                    case 3:
                        userData = _c.sent();
                        return [4 /*yield*/, new mail_controller_1.default().sendHtmlMail({
                                to: (userData === null || userData === void 0 ? void 0 : userData.email) || "",
                                subject: subject,
                                html: body_1,
                            })];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        res.json({
                            status: "SUCCESS",
                            message: "Replay send successfully.",
                            // data: reviewDevice,
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _c.sent();
                        next(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return ReplayController;
}());
exports.ReplayControllerValidation = {
    replay: [
        (0, express_validator_1.body)("subject").not().exists().withMessage("subject is required."),
        (0, express_validator_1.body)("body").not().exists().withMessage("body is required."),
        (0, express_validator_1.body)("userId")
            .if(function (value, _a) {
            var _b, _c;
            var req = _a.req;
            return ((_b = req.body) === null || _b === void 0 ? void 0 : _b.isEmailSend) || ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.isNotification);
        })
            .not()
            .exists()
            .withMessage("userId is required.")
            .isMongoId()
            .withMessage("userId must be mongoes id."),
        (0, express_validator_1.body)("isEmailSend")
            .optional()
            .isBoolean()
            .withMessage("isEmailSend must be boolean."),
        (0, express_validator_1.body)("isNotification")
            .optional()
            .isBoolean()
            .withMessage("isNotification must be boolean."),
    ],
};
exports.default = ReplayController;

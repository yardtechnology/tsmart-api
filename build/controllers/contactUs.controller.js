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
exports.ContactUsControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var models_1 = require("../models");
var user_model_1 = require("../models/user.model");
var ContactUsController = /** @class */ (function () {
    function ContactUsController() {
    }
    ContactUsController.prototype.create = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, subject, message, store, userId, userData, createContactUs, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        (0, helper_1.fieldValidateError)(req);
                        _c = req.body, subject = _c.subject, message = _c.message, store = _c.storeId;
                        userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a._id;
                        return [4 /*yield*/, user_model_1.UserModel.findById(userId)];
                    case 1:
                        userData = _d.sent();
                        return [4 /*yield*/, models_1.ContactUsSchema.create({
                                email: userData === null || userData === void 0 ? void 0 : userData.email,
                                name: userData === null || userData === void 0 ? void 0 : userData.displayName,
                                phoneNumber: userData === null || userData === void 0 ? void 0 : userData.phoneNumber,
                                countryCode: (_b = userData === null || userData === void 0 ? void 0 : userData.country) === null || _b === void 0 ? void 0 : _b.code,
                                subject: subject,
                                message: message,
                                store: store,
                            })];
                    case 2:
                        createContactUs = _d.sent();
                        if (!createContactUs)
                            throw new http_errors_1.InternalServerError("Something went wrong, ContactUs is not created.");
                        res.json({
                            status: "SUCCESS",
                            message: "ContactUs created successfully.",
                            data: createContactUs,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _d.sent();
                        next(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ContactUsController.prototype.getAll = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, limit, chunk, contactUsId, query_1, getAllData, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = req.query, limit = _b.limit, chunk = _b.chunk, contactUsId = _b.contactUsId;
                        (0, helper_1.fieldValidateError)(req);
                        query_1 = {};
                        contactUsId && (query_1["_id"] = contactUsId);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: models_1.ContactUsSchema,
                                query: query_1,
                                chunk: chunk ? Number(chunk) : undefined,
                                limit: limit ? Number(limit) : undefined,
                                select: "",
                                populate: "",
                                sort: {
                                    createdAt: -1,
                                },
                            })];
                    case 1:
                        getAllData = _c.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: contactUsId
                                ? "ContactUs found successfully."
                                : "All ContactUs found successfully.",
                            data: contactUsId ? (_a = getAllData === null || getAllData === void 0 ? void 0 : getAllData.data) === null || _a === void 0 ? void 0 : _a[0] : getAllData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _c.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContactUsController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var contactUsId, deleteContactUs, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        contactUsId = req.params.contactUsId;
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.ContactUsSchema.findByIdAndDelete(contactUsId)];
                    case 1:
                        deleteContactUs = _a.sent();
                        if (!deleteContactUs)
                            throw new http_errors_1.NotFound("No ContactUs found for delete.");
                        res.json({
                            status: "SUCCESS",
                            message: "ContactUs deleted successfully",
                            data: deleteContactUs,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ContactUsController;
}());
exports.ContactUsControllerValidation = {
    create: [
        (0, express_validator_1.body)("message")
            .not()
            .isEmpty()
            .withMessage("message is required.")
            .isLength({ min: 3 })
            .withMessage("message must be at least 3 characters long")
            .isLength({ max: 420 })
            .withMessage("message must be at most 420 characters long"),
        (0, express_validator_1.body)("subject")
            .not()
            .isEmpty()
            .withMessage("subject is required.")
            .isLength({ min: 3 })
            .withMessage("subject must be at least 3 characters long")
            .isLength({ max: 100 })
            .withMessage("subject must be at most 100 characters long"),
        (0, express_validator_1.body)("storeId")
            .optional()
            .isMongoId()
            .withMessage("storeId is must be mongos id."),
    ],
    getAll: [
        (0, express_validator_1.query)("contactUsId")
            .optional()
            .isMongoId()
            .withMessage("ContactUsId should be mongoose id."),
    ],
    delete: [
        (0, express_validator_1.param)("contactUsId")
            .not()
            .isEmpty()
            .withMessage("ContactUsId is required.")
            .isMongoId()
            .withMessage("ContactUsId must be mongoose Id."),
    ],
};
exports.default = ContactUsController;

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
exports.WarrantyControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var models_1 = require("../models");
var WarrantyController = /** @class */ (function () {
    function WarrantyController() {
    }
    WarrantyController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, phoneNumber, name_1, makeModel, claimInformation, storeVisited, createWarranty, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        (0, helper_1.fieldValidateError)(req);
                        _a = req.body, email = _a.email, phoneNumber = _a.phoneNumber, name_1 = _a.name, makeModel = _a.makeModel, claimInformation = _a.claimInformation, storeVisited = _a.storeVisited;
                        return [4 /*yield*/, models_1.WarrantySchema.create({
                                email: email,
                                phoneNumber: phoneNumber,
                                name: name_1,
                                makeModel: makeModel,
                                claimInformation: claimInformation,
                                storeVisited: storeVisited,
                            })];
                    case 1:
                        createWarranty = _b.sent();
                        if (!createWarranty)
                            throw new http_errors_1.InternalServerError("Something went wrong, Warranty is not created.");
                        res.json({
                            status: "SUCCESS",
                            message: "Warranty created successfully.",
                            data: createWarranty,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WarrantyController.prototype.getAll = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, limit, chunk, warrantyId, query_1, getAllData, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = req.query, limit = _b.limit, chunk = _b.chunk, warrantyId = _b.warrantyId;
                        (0, helper_1.fieldValidateError)(req);
                        query_1 = {};
                        warrantyId && (query_1["_id"] = warrantyId);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: models_1.WarrantySchema,
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
                            message: warrantyId
                                ? "Warranty found successfully."
                                : "All Warranty found successfully.",
                            data: warrantyId ? (_a = getAllData === null || getAllData === void 0 ? void 0 : getAllData.data) === null || _a === void 0 ? void 0 : _a[0] : getAllData,
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
    WarrantyController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var warrantyId, deleteWarranty, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        warrantyId = req.params.warrantyId;
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.WarrantySchema.findByIdAndDelete(warrantyId)];
                    case 1:
                        deleteWarranty = _a.sent();
                        if (!deleteWarranty)
                            throw new http_errors_1.NotFound("No Warranty found for delete.");
                        res.json({
                            status: "SUCCESS",
                            message: "Warranty deleted successfully",
                            data: deleteWarranty,
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
    return WarrantyController;
}());
exports.WarrantyControllerValidation = {
    create: [
        (0, express_validator_1.body)("email")
            .not()
            .isEmpty()
            .withMessage("email is required.")
            .isEmail()
            .withMessage("email is not formatted."),
        (0, express_validator_1.body)("phoneNumber").not().isEmpty().withMessage("phoneNumber is required."),
        (0, express_validator_1.body)("name")
            .not()
            .isEmpty()
            .withMessage("name is required.")
            .isLength({ min: 3 })
            .withMessage("name must be at least 3 characters long")
            .isLength({ max: 420 })
            .withMessage("name must be at most 420 characters long"),
        (0, express_validator_1.body)("makeModel").not().isEmpty().withMessage("makeModel is required."),
        (0, express_validator_1.body)("claimInformation")
            .not()
            .isEmpty()
            .withMessage("claimInformation is required.")
            .isLength({ min: 3 })
            .withMessage("claimInformation must be at least 3 characters long")
            .isLength({ max: 420 })
            .withMessage("claimInformation must be at most 420 characters long"),
        (0, express_validator_1.body)("storeVisited")
            .not()
            .isEmpty()
            .withMessage("storeVisited is required.")
            .isLength({ min: 3 })
            .withMessage("storeVisited must be at least 3 characters long")
            .isLength({ max: 420 })
            .withMessage("storeVisited must be at most 420 characters long"),
    ],
    getAll: [
        (0, express_validator_1.query)("warrantyId")
            .optional()
            .isMongoId()
            .withMessage("warrantyId should be mongoose id."),
    ],
    delete: [
        (0, express_validator_1.param)("warrantyId")
            .not()
            .isEmpty()
            .withMessage("warrantyId is required.")
            .isMongoId()
            .withMessage("warrantyId must be mongoose Id."),
    ],
};
exports.default = WarrantyController;

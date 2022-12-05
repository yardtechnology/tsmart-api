"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.JoinOurTeamControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var media_logic_1 = __importDefault(require("../logic/media.logic"));
var models_1 = require("../models");
var JoinOurTeamController = /** @class */ (function () {
    function JoinOurTeamController() {
    }
    JoinOurTeamController.prototype.create = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var resumeData, resumeFile, filePath, _b, joinOurTeam, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        (0, helper_1.fieldValidateError)(req);
                        resumeFile = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.resume;
                        if (!resumeFile)
                            throw new http_errors_1.BadRequest("resume field is required.");
                        filePath = "JoinOurTeam";
                        if (!(resumeFile && !Array.isArray(resumeFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, new media_logic_1.default().uploadMedia(resumeFile, filePath)];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = undefined;
                        _c.label = 3;
                    case 3:
                        resumeData = _b;
                        return [4 /*yield*/, models_1.JoinOurTeamSchema.create(__assign(__assign({}, req.body), { resume: resumeData === null || resumeData === void 0 ? void 0 : resumeData.url, resumePATH: resumeData === null || resumeData === void 0 ? void 0 : resumeData.path }))];
                    case 4:
                        joinOurTeam = _c.sent();
                        if (!joinOurTeam)
                            throw new http_errors_1.InternalServerError("Something went wrong, join our team is not created.");
                        res.json({
                            status: "SUCCESS",
                            message: "Your message sended successfully.",
                            data: joinOurTeam,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _c.sent();
                        if (resumeData === null || resumeData === void 0 ? void 0 : resumeData.path) {
                            new media_logic_1.default().deleteMedia(resumeData === null || resumeData === void 0 ? void 0 : resumeData.path);
                        }
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    JoinOurTeamController.prototype.getAll = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, limit, chunk, joinOurTeamId, query, getAllData, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = req.query, limit = _b.limit, chunk = _b.chunk, joinOurTeamId = _b.joinOurTeamId;
                        query = {};
                        joinOurTeamId && (query["_id"] = joinOurTeamId);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: models_1.JoinOurTeamSchema,
                                query: query,
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
                            message: joinOurTeamId
                                ? "Join our team found successfully."
                                : "All join our team found successfully.",
                            data: joinOurTeamId ? (_a = getAllData === null || getAllData === void 0 ? void 0 : getAllData.data) === null || _a === void 0 ? void 0 : _a[0] : getAllData,
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
    JoinOurTeamController.prototype.deleteData = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var joinOurTeamId, deleteJoinOurTeam, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        joinOurTeamId = req.params.joinOurTeamId;
                        if (!joinOurTeamId)
                            throw new http_errors_1.BadRequest("joinOurTeamId is required.");
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.JoinOurTeamSchema.findByIdAndDelete(joinOurTeamId)];
                    case 1:
                        deleteJoinOurTeam = _a.sent();
                        //   delete device image
                        (deleteJoinOurTeam === null || deleteJoinOurTeam === void 0 ? void 0 : deleteJoinOurTeam.resumePATH) &&
                            new media_logic_1.default().deleteMedia(deleteJoinOurTeam === null || deleteJoinOurTeam === void 0 ? void 0 : deleteJoinOurTeam.resumePATH);
                        if (!deleteJoinOurTeam)
                            throw new http_errors_1.NotFound("No make found for delete.");
                        res.json({
                            status: "SUCCESS",
                            message: "join our team deleted successfully",
                            data: deleteJoinOurTeam,
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
    return JoinOurTeamController;
}());
exports.JoinOurTeamControllerValidation = {
    create: [
        (0, express_validator_1.body)("fullName")
            .not()
            .isEmpty()
            .withMessage("fullName is required.")
            .isLength({ min: 3 })
            .withMessage("fullName must be at least 3 characters long")
            .isLength({ max: 60 })
            .withMessage("fullName must be at most 60 characters long"),
        (0, express_validator_1.body)("phoneNumber")
            .not()
            .isEmpty()
            .withMessage("phoneNumber is required.")
            .isLength({ min: 3 })
            .withMessage("phoneNumber must be at least 3 characters long")
            .isLength({ max: 20 })
            .withMessage("phoneNumber must be at most 20 characters long"),
        (0, express_validator_1.body)("email")
            .not()
            .isEmpty()
            .withMessage("email is required.")
            .isLength({ min: 3 })
            .withMessage("email must be at least 3 characters long")
            .isLength({ max: 60 })
            .withMessage("email must be at most 60 characters long"),
        (0, express_validator_1.body)("address")
            .not()
            .isEmpty()
            .withMessage("address is required.")
            .isLength({ min: 3 })
            .withMessage("address must be at least 3 characters long")
            .isLength({ max: 420 })
            .withMessage("address must be at most 420 characters long"),
        (0, express_validator_1.body)("city")
            .not()
            .isEmpty()
            .withMessage("city is required.")
            .isLength({ min: 3 })
            .withMessage("city must be at least 3 characters long")
            .isLength({ max: 100 })
            .withMessage("city must be at most 100 characters long"),
        (0, express_validator_1.body)("postalPin")
            .not()
            .isEmpty()
            .withMessage("postalPin is required.")
            .isLength({ min: 3 })
            .withMessage("postalPin must be at least 3 characters long")
            .isLength({ max: 10 })
            .withMessage("postalPin must be at most 10 characters long"),
        (0, express_validator_1.body)("rightToWorkInUk")
            .not()
            .isEmpty()
            .withMessage("rightToWorkInUk is required.")
            .isBoolean()
            .withMessage("rightToWorkInUk must be boolean."),
        (0, express_validator_1.body)("commuteIntoCentralLondon")
            .not()
            .isEmpty()
            .withMessage("commuteIntoCentralLondon is required.")
            .isBoolean()
            .withMessage("commuteIntoCentralLondon must be boolean."),
    ],
    getAll: [
        (0, express_validator_1.param)("joinOurTeamId")
            .optional()
            .isMongoId()
            .withMessage("joinOurTeamId must be mongoose id."),
    ],
    delete: [
        (0, express_validator_1.param)("joinOurTeamId")
            .not()
            .isEmpty()
            .withMessage("joinOurTeamId is required.")
            .isMongoId()
            .withMessage("joinOurTeamId must be mongoose id."),
    ],
};
exports.default = JoinOurTeamController;

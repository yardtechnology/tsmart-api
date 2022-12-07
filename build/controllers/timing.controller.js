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
exports.TimingControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var mongoose_1 = require("mongoose");
var helper_1 = require("../helper");
var models_1 = require("../models");
var TimingController = /** @class */ (function () {
    function TimingController() {
    }
    TimingController.prototype.createAndUpdate = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, numberOfRepairers_1, start_1, end, storeId_1, durationInMin_1, user, dayOfWeekNumber_1, subtract, divide, deleteFirst, dateArray, insertData, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        (0, helper_1.fieldValidateError)(req);
                        _b = req.body, numberOfRepairers_1 = _b.numberOfRepairers, start_1 = _b.start, end = _b.end, storeId_1 = _b.storeId, durationInMin_1 = _b.durationInMin;
                        user = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a._id;
                        dayOfWeekNumber_1 = new Date(start_1).getDay();
                        subtract = new Date(end).getTime() - new Date(start_1).getTime();
                        divide = Math.floor(subtract / (durationInMin_1 * 60 * 1000));
                        return [4 /*yield*/, models_1.TimingSchema.deleteMany({
                                dayOfWeekNumber: dayOfWeekNumber_1,
                                store: storeId_1,
                            })];
                    case 1:
                        deleteFirst = _c.sent();
                        dateArray = new Array(divide).fill(1).map(function (item, index) {
                            return {
                                store: storeId_1,
                                dayOfWeekNumber: dayOfWeekNumber_1,
                                durationInMin: durationInMin_1,
                                numberOfRepairers: numberOfRepairers_1,
                                start: new Date(new Date(start_1).getTime() + index * (durationInMin_1 * 60 * 1000)),
                                end: new Date(new Date(start_1).getTime() +
                                    (index + 1) * (durationInMin_1 * 60 * 1000)),
                            };
                        });
                        return [4 /*yield*/, models_1.TimingSchema.insertMany(dateArray)];
                    case 2:
                        insertData = _c.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Timing is created successfully.",
                            data: insertData,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _c.sent();
                        next(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TimingController.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, numberOfRepairers_2, start_2, end, storeId_2, durationInMin_2, id, dayOfWeekNumber_2, subtract, divide, deleteFirst, dateArray, insertData, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        (0, helper_1.fieldValidateError)(req);
                        _a = req.body, numberOfRepairers_2 = _a.numberOfRepairers, start_2 = _a.start, end = _a.end, storeId_2 = _a.storeId, durationInMin_2 = _a.durationInMin, id = _a.id;
                        dayOfWeekNumber_2 = new Date(start_2).getDay();
                        subtract = new Date(end).getTime() - new Date(start_2).getTime();
                        divide = Math.floor(subtract / (durationInMin_2 * 60 * 1000));
                        return [4 /*yield*/, models_1.TimingSchema.deleteMany({
                                dayOfWeekNumber: { $in: [dayOfWeekNumber_2, id] },
                                store: storeId_2,
                            })];
                    case 1:
                        deleteFirst = _b.sent();
                        dateArray = new Array(divide).fill(1).map(function (item, index) {
                            return {
                                store: storeId_2,
                                dayOfWeekNumber: dayOfWeekNumber_2,
                                durationInMin: durationInMin_2,
                                numberOfRepairers: numberOfRepairers_2,
                                start: new Date(new Date(start_2).getTime() + index * (durationInMin_2 * 60 * 1000)),
                                end: new Date(new Date(start_2).getTime() +
                                    (index + 1) * ((durationInMin_2 - 1) * 60 * 1000)),
                            };
                        });
                        return [4 /*yield*/, models_1.TimingSchema.insertMany(dateArray)];
                    case 2:
                        insertData = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Timing is updated successfully.",
                            data: insertData,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        next(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TimingController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, storeId, deleteFirst, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        (0, helper_1.fieldValidateError)(req);
                        console.log("id", req.body);
                        _a = req.body, id = _a.id, storeId = _a.storeId;
                        return [4 /*yield*/, models_1.TimingSchema.deleteMany({
                                dayOfWeekNumber: { $in: [id] },
                                store: storeId,
                            })];
                    case 1:
                        deleteFirst = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Delete data successfully.",
                            data: deleteFirst,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TimingController.prototype.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, limit, chunk, storeId, start, dayOfWeekNumber, query, getAllData, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, limit = _a.limit, chunk = _a.chunk;
                        storeId = req.params.storeId;
                        start = req.body.start;
                        dayOfWeekNumber = start ? new Date(start).getDay() : undefined;
                        query = {};
                        dayOfWeekNumber && (query["dayOfWeekNumber"] = dayOfWeekNumber);
                        return [4 /*yield*/, models_1.TimingSchema.aggregate([
                                {
                                    $match: {
                                        store: new mongoose_1.Types.ObjectId(storeId),
                                    },
                                },
                                // {
                                //   $addFields: {
                                //     timeArray: {
                                //       $range: [
                                //         "$start",
                                //         "$end",
                                //         {
                                //           $dateAdd: {
                                //             startDate: "$start",
                                //             unit: "minute",
                                //             amount: 30,
                                //           },
                                //         },
                                //       ],
                                //     },
                                //   },
                                // },
                            ])];
                    case 1:
                        getAllData = _b.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: storeId
                                ? "Timing found successfully."
                                : "All Timing found successfully.",
                            data: getAllData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TimingController.prototype.userGetStoreLeftBookingList = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, limit, chunk, storeId, date, dayOfWeekNumber, query, getAllData, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, limit = _a.limit, chunk = _a.chunk;
                        storeId = req.params.storeId;
                        date = req.query.date;
                        dayOfWeekNumber = new Date(Number(date) || new Date()).getDay();
                        query = {};
                        dayOfWeekNumber && (query["dayOfWeekNumber"] = dayOfWeekNumber);
                        return [4 /*yield*/, models_1.TimingSchema.aggregate([
                                {
                                    $match: {
                                        $and: [
                                            {
                                                store: new mongoose_1.Types.ObjectId(storeId),
                                            },
                                            {
                                                dayOfWeekNumber: dayOfWeekNumber,
                                            },
                                        ],
                                    },
                                },
                                {
                                    $addFields: {
                                        startDateForm: {
                                            $dateFromParts: {
                                                year: new Date(Number(date)).getFullYear(),
                                                month: new Date(Number(date)).getMonth() + 1,
                                                day: new Date(Number(date)).getDate(),
                                                hour: {
                                                    $hour: "$start",
                                                },
                                                minute: {
                                                    $minute: "$start",
                                                },
                                            },
                                        },
                                        endDateForm: {
                                            $dateFromParts: {
                                                year: new Date(Number(date)).getFullYear(),
                                                month: new Date(Number(date)).getMonth() + 1,
                                                day: new Date(Number(date)).getDate(),
                                                hour: {
                                                    $hour: "$end",
                                                },
                                                minute: {
                                                    $minute: "$end",
                                                },
                                            },
                                        },
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "orders",
                                        localField: "store",
                                        foreignField: "storeID",
                                        as: "orderHave",
                                        let: {
                                            startDate: "$startDateForm",
                                            endDate: "$endDateForm",
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            {
                                                                $eq: ["$serviceType", "IN_STOR"],
                                                            },
                                                            {
                                                                $gte: ["$scheduledTime", new Date(Number(date))],
                                                            },
                                                            {
                                                                $eq: [
                                                                    { $dayOfWeek: "$scheduledTime" },
                                                                    dayOfWeekNumber + 1,
                                                                ],
                                                            },
                                                            {
                                                                $gte: ["$scheduledTime", "$$startDate"],
                                                            },
                                                            {
                                                                $lte: ["$scheduledTime", "$$endDate"],
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $addFields: {
                                        orderHave: {
                                            $size: "$orderHave",
                                        },
                                        leftBooking: {
                                            $subtract: [
                                                "$numberOfRepairers",
                                                {
                                                    $size: "$orderHave",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    $sort: {
                                        startDateForm: -1,
                                    },
                                },
                            ])];
                    case 1:
                        getAllData = _b.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: storeId
                                ? "Timing found successfully."
                                : "All Timing found successfully.",
                            data: getAllData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _b.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TimingController.prototype.getAllTimingsOfStore = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var storeId, getAllData, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        storeId = req.params.storeId;
                        return [4 /*yield*/, models_1.TimingSchema.aggregate([
                                {
                                    $match: {
                                        $and: [
                                            {
                                                store: new mongoose_1.Types.ObjectId(storeId),
                                            },
                                        ],
                                    },
                                },
                                {
                                    $group: {
                                        _id: "$dayOfWeekNumber",
                                        durationInMin: { $first: "$durationInMin" },
                                        numberOfRepairers: { $first: "$numberOfRepairers" },
                                        start: { $first: "$start" },
                                        end: { $last: "$end" },
                                    },
                                },
                                {
                                    $sort: { _id: -1 },
                                },
                            ])];
                    case 1:
                        getAllData = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "All Timing found successfully.",
                            data: getAllData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TimingController;
}());
exports.TimingControllerValidation = {
    createAndUpdate: [
        (0, express_validator_1.body)("numberOfRepairers")
            .not()
            .isEmpty()
            .withMessage("numberOfRepairers is required.")
            .isNumeric()
            .withMessage("numberOfRepairers must be number."),
        (0, express_validator_1.body)("storeId")
            .not()
            .isEmpty()
            .withMessage("storeId is required.")
            .isMongoId()
            .withMessage("storeId must be mongoes id."),
        (0, express_validator_1.body)("durationInMin")
            .optional()
            .exists()
            .isNumeric()
            .withMessage("durationInMin should be number."),
        (0, express_validator_1.body)("start")
            .optional()
            .exists()
            .toDate()
            .withMessage("start is invalid date.")
            .custom(function (value, _a) {
            var _b, _c, _d, _e;
            var req = _a.req;
            if (!((_b = req.body) === null || _b === void 0 ? void 0 : _b.end) || !((_c = req.body) === null || _c === void 0 ? void 0 : _c.durationInMin))
                return false;
            var end = (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.end;
            var subtract = new Date(end).getTime() - new Date(value).getTime();
            return ((_e = req.body) === null || _e === void 0 ? void 0 : _e.durationInMin) * 60 * 1000 < subtract;
        })
            .withMessage("Two date distance is smaller than durationInMin"),
        (0, express_validator_1.body)("end")
            .optional()
            .exists()
            // .isISO8601()
            .toDate()
            .withMessage("end is invalid date.")
            .custom(function (value, _a) {
            var req = _a.req;
            var endDateDay = new Date(value).getDay();
            var startDateDay = new Date(req.body.start).getDay();
            return endDateDay === startDateDay;
        })
            .withMessage("Start day and end day have to same day in week."),
    ],
    update: [
        (0, express_validator_1.body)("numberOfRepairers")
            .not()
            .isEmpty()
            .withMessage("numberOfRepairers is required.")
            .isNumeric()
            .withMessage("numberOfRepairers must be number."),
        (0, express_validator_1.body)("storeId")
            .not()
            .isEmpty()
            .withMessage("storeId is required.")
            .isMongoId()
            .withMessage("storeId must be mongoes id."),
        (0, express_validator_1.body)("durationInMin")
            .optional()
            .exists()
            .isNumeric()
            .withMessage("durationInMin should be number."),
        (0, express_validator_1.body)("start")
            .optional()
            .exists()
            .toDate()
            .withMessage("start is invalid date.")
            .custom(function (value, _a) {
            var _b, _c, _d, _e;
            var req = _a.req;
            if (!((_b = req.body) === null || _b === void 0 ? void 0 : _b.end) || !((_c = req.body) === null || _c === void 0 ? void 0 : _c.durationInMin))
                return false;
            var end = (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.end;
            var subtract = new Date(end).getTime() - new Date(value).getTime();
            return ((_e = req.body) === null || _e === void 0 ? void 0 : _e.durationInMin) * 60 * 1000 < subtract;
        })
            .withMessage("Two date distance is smaller than durationInMin"),
        (0, express_validator_1.body)("end")
            .optional()
            .exists()
            // .isISO8601()
            .toDate()
            .withMessage("end is invalid date.")
            .custom(function (value, _a) {
            var req = _a.req;
            var endDateDay = new Date(value).getDay();
            var startDateDay = new Date(req.body.start).getDay();
            return endDateDay === startDateDay;
        })
            .withMessage("Start day and end day have to same day in week."),
        (0, express_validator_1.body)("id")
            .not()
            .isEmpty()
            .withMessage("id is required")
            .isIn([1, 2, 3, 4, 5, 6, 7])
            .withMessage("id is must be number from 1 to 7")
            .withMessage("Start day and end day have to same day in week."),
    ],
    getAll: [
        (0, express_validator_1.param)("storeId")
            .optional()
            .isMongoId()
            .withMessage("storeId must be mongoose id."),
    ],
    delete: [
        (0, express_validator_1.body)("storeId")
            .not()
            .isEmpty()
            .withMessage("storeId is required.")
            .isMongoId()
            .withMessage("storeId must be mongoes id."),
        (0, express_validator_1.body)("id")
            .not()
            .isEmpty()
            .withMessage("id is required")
            .isIn([0, 1, 2, 3, 4, 5, 6, 7])
            .withMessage("id is must be number from 1 to 7"),
    ],
};
exports.default = TimingController;

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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregationData = void 0;
function aggregationData(_a) {
    var model = _a.model, query = _a.query, position = _a.position, sort = _a.sort, limit = _a.limit, chunk = _a.chunk;
    return __awaiter(this, void 0, void 0, function () {
        var limitSkipArgs, skip, limitData, compArgs, dataGet, isLastChunk, dataGet, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    limitSkipArgs = [];
                    sort && limitSkipArgs.push({ $sort: sort });
                    if (!(limit && chunk && typeof position === "number")) return [3 /*break*/, 2];
                    skip = chunk || limit ? Number(limit) * (Number(chunk) - 1) : undefined;
                    limitData = chunk || limit ? Number(limit) + 1 : undefined;
                    typeof skip === "number" &&
                        limitSkipArgs.push({
                            $skip: skip,
                        });
                    typeof limit === "number" &&
                        limitSkipArgs.push({
                            $limit: limitData,
                        });
                    query.splice(position, 0, limitSkipArgs);
                    compArgs = query.flat();
                    return [4 /*yield*/, model.aggregate(compArgs)];
                case 1:
                    dataGet = _b.sent();
                    isLastChunk = Boolean(dataGet.length === Number(limitData));
                    if (isLastChunk)
                        dataGet.pop();
                    return [2 /*return*/, {
                            data: dataGet,
                            isLastChunk: !isLastChunk,
                        }];
                case 2: return [4 /*yield*/, model.aggregate(__spreadArray(__spreadArray([], query, true), limitSkipArgs, true))];
                case 3:
                    dataGet = _b.sent();
                    return [2 /*return*/, {
                            data: dataGet,
                            isLastChunk: false,
                        }];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _b.sent();
                    throw error_1;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.aggregationData = aggregationData;
exports.default = (function (_a) {
    var model = _a.model, query = _a.query, chunk = _a.chunk, limit = _a.limit, sort = _a.sort, populate = _a.populate, select = _a.select;
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var requiredData, totalLength, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, model
                            .find(query)
                            .sort(sort)
                            .skip(Number(chunk || 0) * Number(limit))
                            .limit(Number(limit) + 1)
                            .populate(populate)
                            .select(select)];
                case 1:
                    requiredData = _a.sent();
                    totalLength = requiredData.length;
                    if (totalLength > Number(limit))
                        requiredData.pop();
                    resolve({
                        data: requiredData,
                        isLastChunk: !(totalLength > Number(limit)),
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    reject(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
});

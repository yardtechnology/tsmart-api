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
var wishlist_logic_1 = __importDefault(require("../logic/wishlist.logic"));
var WishList = /** @class */ (function (_super) {
    __extends(WishList, _super);
    function WishList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // add to wishlist
    WishList.prototype.addToWishList = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var productId, wishlist, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        productId = req.body.productId;
                        return [4 /*yield*/, _super.prototype.add.call(this, {
                                userId: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a._id,
                                productId: productId,
                            })];
                    case 1:
                        wishlist = _b.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Product added to wishlist",
                            data: wishlist,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        // send error to client
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * remove from wishlist
     * @param req
     * @param res
     * @param next
     */
    WishList.prototype.removeFromWishList = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var productId, wishlist, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        productId = req.params.productId;
                        return [4 /*yield*/, _super.prototype.remove.call(this, productId)];
                    case 1:
                        wishlist = _a.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Product removed from wishlist",
                            data: wishlist,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        // send error to client
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * get my wishlist
     * @param req
     * @param res
     * @param next
     */
    WishList.prototype.getMyWishList = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var wishlist, _d, error_3;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 6, , 7]);
                        wishlist = void 0;
                        _d = (_a = req.query) === null || _a === void 0 ? void 0 : _a.resData;
                        switch (_d) {
                            case "optimized": return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, _super.prototype.getAllWishlistOptimized.call(this, {
                            userId: (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b._id,
                            limit: req.query.limit ? Number(req.query.limit) : undefined,
                            chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
                        })];
                    case 2:
                        wishlist = _e.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, _super.prototype.getAll.call(this, {
                            userId: (_c = req.currentUser) === null || _c === void 0 ? void 0 : _c._id,
                            limit: req.query.limit ? Number(req.query.limit) : undefined,
                            chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
                        })];
                    case 4:
                        wishlist = _e.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Wishlist retrieved successfully",
                            data: wishlist,
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_3 = _e.sent();
                        // send error to client
                        next(error_3);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return WishList;
}(wishlist_logic_1.default));
exports.default = WishList;

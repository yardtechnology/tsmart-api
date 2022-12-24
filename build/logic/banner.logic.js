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
var banner_model_1 = require("../models/banner.model");
var media_logic_1 = __importDefault(require("./media.logic"));
var BillingLogic = /** @class */ (function (_super) {
    __extends(BillingLogic, _super);
    function BillingLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *create banner
     */
    BillingLogic.prototype.createBanner = function (_a) {
        var _b;
        var title = _a.title, description = _a.description, imageFile = _a.imageFile, data = _a.data, type = _a.type, link = _a.link, themeColor = _a.themeColor, textColor = _a.textColor;
        return __awaiter(this, void 0, void 0, function () {
            var filePath, imageData, _c, newsData;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        filePath = "store";
                        if (!(imageFile && !Array.isArray(imageFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, imageFile, filePath)];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _d.label = 3;
                    case 3:
                        imageData = _c;
                        return [4 /*yield*/, new banner_model_1.BannerModel({
                                title: title,
                                description: description,
                                image: imageData === null || imageData === void 0 ? void 0 : imageData.url,
                                imagePath: imageData === null || imageData === void 0 ? void 0 : imageData.path,
                                "data.screen": data.screen,
                                "data.id": data.id,
                                link: link,
                                type: (_b = type === null || type === void 0 ? void 0 : type.toString()) === null || _b === void 0 ? void 0 : _b.toUpperCase(),
                                themeColor: themeColor,
                                textColor: textColor,
                            }).save()];
                    case 4:
                        newsData = _d.sent();
                        return [2 /*return*/, newsData];
                }
            });
        });
    };
    /**
     * update banner
     */
    BillingLogic.prototype.updateBanner = function (_a) {
        var _b;
        var id = _a.id, title = _a.title, description = _a.description, imageFile = _a.imageFile, data = _a.data, type = _a.type, link = _a.link, themeColor = _a.themeColor, textColor = _a.textColor;
        return __awaiter(this, void 0, void 0, function () {
            var filePath, imageData, _c, updatedData, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        filePath = "store";
                        if (!(imageFile && !Array.isArray(imageFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, imageFile, filePath)];
                    case 1:
                        _c = _e.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _e.label = 3;
                    case 3:
                        imageData = _c;
                        return [4 /*yield*/, banner_model_1.BannerModel.findByIdAndUpdate(id, {
                                title: title,
                                description: description,
                                image: imageData === null || imageData === void 0 ? void 0 : imageData.url,
                                imagePath: imageData === null || imageData === void 0 ? void 0 : imageData.path,
                                "data.screen": data.screen,
                                "data.id": data.id,
                                link: link,
                                type: (_b = type === null || type === void 0 ? void 0 : type.toString()) === null || _b === void 0 ? void 0 : _b.toUpperCase(),
                                themeColor: themeColor,
                                textColor: textColor,
                            })];
                    case 4:
                        updatedData = _e.sent();
                        if (!updatedData)
                            throw new Error("Banner not found");
                        //remove old image if exist
                        _d = (updatedData === null || updatedData === void 0 ? void 0 : updatedData.imagePath) &&
                            (imageData === null || imageData === void 0 ? void 0 : imageData.path);
                        if (!_d) 
                        //remove old image if exist
                        return [3 /*break*/, 6];
                        return [4 /*yield*/, _super.prototype.deleteMedia.call(this, updatedData.imagePath)];
                    case 5:
                        _d = (_e.sent());
                        _e.label = 6;
                    case 6:
                        //remove old image if exist
                        _d;
                        return [2 /*return*/, updatedData];
                }
            });
        });
    };
    /**
     * get all banners
     */
    BillingLogic.prototype.getAllBanners = function (_a) {
        var _b;
        var type = _a.type;
        return __awaiter(this, void 0, void 0, function () {
            var query, banners;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        query = { type: (_b = type === null || type === void 0 ? void 0 : type.toString()) === null || _b === void 0 ? void 0 : _b.toUpperCase() };
                        !type && delete query.type;
                        return [4 /*yield*/, banner_model_1.BannerModel.find(query).sort({ createdAt: -1 })];
                    case 1:
                        banners = _c.sent();
                        return [2 /*return*/, banners];
                }
            });
        });
    };
    /**
     * delete banner
     */
    BillingLogic.prototype.deleteBanner = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var banner, deleteBanner, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, banner_model_1.BannerModel.findById(id)];
                    case 1:
                        banner = _b.sent();
                        if (!banner)
                            throw new Error("Banner not found");
                        deleteBanner = banner_model_1.BannerModel.findByIdAndDelete(id);
                        //remove old image if exist
                        _a = banner.imagePath;
                        if (!_a) 
                        //remove old image if exist
                        return [3 /*break*/, 3];
                        return [4 /*yield*/, _super.prototype.deleteMedia.call(this, banner.imagePath)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        //remove old image if exist
                        _a;
                        return [2 /*return*/, deleteBanner];
                }
            });
        });
    };
    return BillingLogic;
}(media_logic_1.default));
exports.default = BillingLogic;

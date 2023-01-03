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
var express_validator_1 = require("express-validator");
var helper_1 = require("../helper");
var stripe_logic_1 = __importDefault(require("../logic/stripe.logic"));
var Payment = /** @class */ (function (_super) {
    __extends(Payment, _super);
    function Payment() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // field validators for the payment request
        _this.validatePaymentFields = [
            (0, express_validator_1.body)("amount").not().isEmpty().isInt().withMessage("amount is required"),
            (0, express_validator_1.body)("currency").not().isEmpty().withMessage("currency is required"),
            (0, express_validator_1.body)("token.email")
                .not()
                .isEmpty()
                .withMessage("[token.email]:email is required"),
            (0, express_validator_1.body)("token.id").not().isEmpty().withMessage("[token.id]:id is required"),
        ];
        return _this;
    }
    // create product
    Payment.prototype.createPaymentController = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, email, id, _c, amount, currency, data, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        (0, helper_1.fieldValidateError)(req);
                        _b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.token, email = _b.email, id = _b.id;
                        _c = req.body, amount = _c.amount, currency = _c.currency;
                        return [4 /*yield*/, _super.prototype.paymentSession.call(this, {
                                amount: amount,
                                source: id,
                                email: email,
                                currency: currency,
                                name: "Lalit sekhar behera",
                                address: {
                                    line1: "TC 9/4 Old MES colony",
                                    // postal_code: "452331",
                                    // city: "Indore",
                                    // state: "Madhya Pradesh",
                                    country: "United Kingdom",
                                },
                            })];
                    case 1:
                        data = _d.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Charged Successfully",
                            data: data,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _d.sent();
                        // send error to client
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Payment;
}(stripe_logic_1.default));
exports.default = Payment;

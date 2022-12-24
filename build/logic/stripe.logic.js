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
var stripe_1 = __importDefault(require("stripe"));
var StripeLogic = /** @class */ (function () {
    function StripeLogic() {
    }
    /**
     * payment
     */
    StripeLogic.prototype.paymentSession = function (Props) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, stripeCustomerData, stripeChargeData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        stripe = new stripe_1.default(process.env.STRIPE_KEY, {
                            apiVersion: "2022-08-01",
                        });
                        return [4 /*yield*/, stripe.customers.create({
                                email: Props === null || Props === void 0 ? void 0 : Props.email,
                                source: Props === null || Props === void 0 ? void 0 : Props.source,
                                name: Props === null || Props === void 0 ? void 0 : Props.name,
                                address: Props === null || Props === void 0 ? void 0 : Props.address,
                                shipping: {
                                    address: Props === null || Props === void 0 ? void 0 : Props.address,
                                    name: Props === null || Props === void 0 ? void 0 : Props.name,
                                },
                            })];
                    case 1:
                        stripeCustomerData = _a.sent();
                        console.log({ stripeCustomerData: stripeCustomerData });
                        return [4 /*yield*/, stripe.charges.create({
                                amount: Props.amount * 100,
                                description: "tSmart Payment",
                                currency: Props.currency,
                                customer: stripeCustomerData.id,
                                receipt_email: Props.email,
                                shipping: {
                                    name: Props === null || Props === void 0 ? void 0 : Props.name,
                                    address: Props.address,
                                },
                            })];
                    case 2:
                        stripeChargeData = _a.sent();
                        console.log(stripeChargeData);
                        if ((stripeChargeData === null || stripeChargeData === void 0 ? void 0 : stripeChargeData.status) !== "succeeded")
                            throw new Error("Something went wrong when creating the stripeCharge ");
                        resolve(stripeChargeData);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        reject(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    StripeLogic.prototype.reactNativePaymentIntents = function (_a) {
        var _b;
        var amount = _a.amount, currency = _a.currency, address = _a.address, name = _a.name;
        return __awaiter(this, void 0, void 0, function () {
            var stripe, customer, ephemeralKey, paymentIntent;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        stripe = new stripe_1.default(process.env.STRIPE_KEY, {
                            apiVersion: "2022-08-01",
                        });
                        return [4 /*yield*/, stripe.customers.create()];
                    case 1:
                        customer = _c.sent();
                        return [4 /*yield*/, stripe.ephemeralKeys.create({ customer: customer.id }, { apiVersion: "2022-08-01" })];
                    case 2:
                        ephemeralKey = _c.sent();
                        return [4 /*yield*/, stripe.paymentIntents.create({
                                amount: amount * 100,
                                currency: currency,
                                customer: customer.id,
                                shipping: {
                                    name: name,
                                    address: address,
                                },
                                payment_method_types: ["card"],
                            })];
                    case 3:
                        paymentIntent = _c.sent();
                        return [2 /*return*/, {
                                paymentIntent: paymentIntent.client_secret,
                                ephemeralKey: ephemeralKey.secret,
                                customer: customer.id,
                                publishableKey: (_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.PUBLISHABLE_KEY,
                            }];
                }
            });
        });
    };
    return StripeLogic;
}());
exports.default = StripeLogic;

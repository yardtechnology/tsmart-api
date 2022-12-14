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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bank_controller_1 = __importDefault(require("../controllers/bank.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var Bank = /** @class */ (function (_super) {
    __extends(Bank, _super);
    function Bank() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.bankController = new bank_controller_1.default();
        _this.createBankRoute();
        _this.getBankRoute();
        _this.deleteBankRoute();
        return _this;
    }
    // create bank
    Bank.prototype.createBankRoute = function () {
        this.router.post("/bank", _super.prototype.isAuthenticated, this.bankController.validateUpdateBankFields, this.bankController.createBank);
    };
    // get bank
    Bank.prototype.getBankRoute = function () {
        this.router.get("/bank", _super.prototype.isAuthenticated, this.bankController.getBank);
    };
    // delete bank
    Bank.prototype.deleteBankRoute = function () {
        this.router.delete("/bank", _super.prototype.isAuthenticated, this.bankController.deleteBank);
    };
    return Bank;
}(authenticate_middleware_1.default));
exports.default = Bank;

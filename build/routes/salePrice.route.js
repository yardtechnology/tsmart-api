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
var controllers_1 = require("../controllers");
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var SalePriceRoutes = /** @class */ (function (_super) {
    __extends(SalePriceRoutes, _super);
    function SalePriceRoutes() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.salePriceController = new controllers_1.SalePriceController();
        _this.routes();
        return _this;
    }
    SalePriceRoutes.prototype.routes = function () {
        // create
        this.router.post("/sale-price/create", _super.prototype.isAuthenticated, controllers_1.SalePriceControllerValidation.createAndUpdate, this.salePriceController.create);
        this.router.put("/sale-price/update/:salePriceId", controllers_1.SalePriceControllerValidation.update, _super.prototype.isAuthenticated, this.salePriceController.update);
        // get all
        this.router.get("/sale-price/:modelId", controllers_1.SalePriceControllerValidation.getAll, _super.prototype.isAuthenticated, this.salePriceController.getAll);
        // delete
        this.router.delete("/sale-price/:_id", _super.prototype.isAuthenticated, controllers_1.SalePriceControllerValidation.delete, this.salePriceController.delete);
        // sale summery
        this.router.post("/sale-price/sale-summery", _super.prototype.isAuthenticated, controllers_1.SalePriceControllerValidation.saleSummery, this.salePriceController.saleSummery);
    };
    return SalePriceRoutes;
}(authenticate_middleware_1.default));
exports.default = SalePriceRoutes;

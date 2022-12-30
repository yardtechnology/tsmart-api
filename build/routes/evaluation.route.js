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
var EvaluationRoutes = /** @class */ (function (_super) {
    __extends(EvaluationRoutes, _super);
    function EvaluationRoutes() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.evaluationController = new controllers_1.EvaluationController();
        _this.routes();
        return _this;
    }
    EvaluationRoutes.prototype.routes = function () {
        // evaluation price
        this.router.post("/evaluation/evaluation-price", this.evaluationController.evaluationPrice);
        // create
        this.router.post("/evaluation/", _super.prototype.isAuthenticated, controllers_1.EvaluationControllerValidation.create, this.evaluationController.create);
        // get all
        this.router.get("/evaluation", _super.prototype.isAuthenticated, this.evaluationController.getAll);
        // update
        this.router.put("/evaluation/:evaluationId", _super.prototype.isAuthenticated, controllers_1.EvaluationControllerValidation.update, this.evaluationController.update);
        // delete
        this.router.delete("/evaluation/:evaluationId", _super.prototype.isAuthenticated, controllers_1.EvaluationControllerValidation.delete, this.evaluationController.delete);
    };
    return EvaluationRoutes;
}(authenticate_middleware_1.default));
exports.default = EvaluationRoutes;

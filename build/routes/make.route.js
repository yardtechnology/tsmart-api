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
var MakeRoutes = /** @class */ (function (_super) {
    __extends(MakeRoutes, _super);
    function MakeRoutes() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.makeController = new controllers_1.MakeController();
        _this.routes();
        return _this;
    }
    MakeRoutes.prototype.routes = function () {
        // create
        this.router.post("/make/create-and-update", _super.prototype.isAuthenticated, controllers_1.MakeControllerValidation.createAndUpdate, this.makeController.createAndUpdate);
        // get all
        this.router.get("/make", 
        // super.isAuthenticated,
        controllers_1.MakeControllerValidation.getAll, this.makeController.getAll);
        // remove serviceType
        this.router.put("/make/remove-service-type/:makeId", 
        // super.isAuthenticated,
        controllers_1.MakeControllerValidation.removeServiceType, this.makeController.removeServiceType);
        // remove serviceType
        this.router.put("/make/update-type-and-device/:makeId", 
        // super.isAuthenticated,
        controllers_1.MakeControllerValidation.updateTypeAndDevice, this.makeController.updateTypeAndDevice);
        // remove serviceType
        this.router.delete("/make/delete/:makeId", 
        // super.isAuthenticated,
        controllers_1.MakeControllerValidation.delete, this.makeController.delete);
    };
    return MakeRoutes;
}(authenticate_middleware_1.default));
exports.default = MakeRoutes;

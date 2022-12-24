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
var JoinOurTeamRoutes = /** @class */ (function (_super) {
    __extends(JoinOurTeamRoutes, _super);
    function JoinOurTeamRoutes() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.joinOurTeamController = new controllers_1.JoinOurTeamController();
        _this.routes();
        return _this;
    }
    JoinOurTeamRoutes.prototype.routes = function () {
        // create
        this.router.post("/join-our-team/", _super.prototype.isAuthenticated, controllers_1.JoinOurTeamControllerValidation.create, this.joinOurTeamController.create);
        // get all
        this.router.get("/join-our-team", _super.prototype.isAuthenticated, controllers_1.JoinOurTeamControllerValidation.getAll, this.joinOurTeamController.getAll);
        // delete
        this.router.delete("/join-our-team/:joinOurTeamId", _super.prototype.isAuthenticated, controllers_1.JoinOurTeamControllerValidation.delete, this.joinOurTeamController.deleteData);
    };
    return JoinOurTeamRoutes;
}(authenticate_middleware_1.default));
exports.default = JoinOurTeamRoutes;

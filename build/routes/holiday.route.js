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
var holiday_controller_1 = __importDefault(require("../controllers/holiday.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var Holiday = /** @class */ (function (_super) {
    __extends(Holiday, _super);
    function Holiday() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.holidayController = new holiday_controller_1.default();
        _this.addHolidayRoute();
        _this.updateHolidayRoute();
        _this.deleteHolidayRoute();
        _this.getMyHolidayRoute();
        return _this;
    }
    // add to holiday
    Holiday.prototype.addHolidayRoute = function () {
        this.router.post("/holiday", _super.prototype.isManager, this.holidayController.validateCreateHoliday, this.holidayController.createHolidayController);
    };
    // add to holiday
    Holiday.prototype.updateHolidayRoute = function () {
        this.router.put("/holiday/:HolidayId", _super.prototype.isManager, this.holidayController.validateUpdateHoliday, this.holidayController.updateHolidayController);
    };
    // delete holiday
    Holiday.prototype.deleteHolidayRoute = function () {
        this.router.delete("/holiday/:HolidayId", _super.prototype.isManager, this.holidayController.deleteHolidayController);
    };
    // get all holiday
    Holiday.prototype.getMyHolidayRoute = function () {
        this.router.get("/holidays", this.holidayController.getAllHolidayController);
    };
    return Holiday;
}(authenticate_middleware_1.default));
exports.default = Holiday;

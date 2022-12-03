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
var address_controller_1 = __importDefault(require("../controllers/address.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var Address = /** @class */ (function (_super) {
    __extends(Address, _super);
    function Address() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.addressController = new address_controller_1.default();
        _this.createAddressRoute();
        _this.updateAddressRoute();
        _this.getMyAddressesRoute();
        _this.getAddressRoute();
        _this.deleteAddressRoute();
        return _this;
    }
    // create address
    Address.prototype.createAddressRoute = function () {
        this.router.post("/address/", _super.prototype.isAuthenticated, this.addressController.validateCreateAddressFields, this.addressController.createAddress);
    };
    // update address
    Address.prototype.updateAddressRoute = function () {
        this.router.put("/address/:addressId", _super.prototype.isAuthenticated, this.addressController.validateUpdateAddressFields, this.addressController.updateAddress);
    };
    // get my addresses
    Address.prototype.getMyAddressesRoute = function () {
        this.router.get("/address/all/my-addresses", _super.prototype.isAuthenticated, this.addressController.getMyAddresses);
    };
    // get address
    Address.prototype.getAddressRoute = function () {
        this.router.get("/address/:addressId", _super.prototype.isAuthenticated, this.addressController.getAddress);
    };
    // delete address
    Address.prototype.deleteAddressRoute = function () {
        this.router.delete("/address/:addressId", _super.prototype.isAuthenticated, this.addressController.deleteAddress);
    };
    return Address;
}(authenticate_middleware_1.default));
exports.default = Address;

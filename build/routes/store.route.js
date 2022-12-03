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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var store_controller_1 = __importStar(require("../controllers/store.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    function Category() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.storeController = new store_controller_1.default();
        _this.routes();
        return _this;
    }
    // create store
    Category.prototype.routes = function () {
        // get service store
        this.router.get("/store/service-store", _super.prototype.isAuthenticated, store_controller_1.storeControlValidator.getStoreListAccordingServiceAvailability, this.storeController.getStoreListAccordingServiceAvailability);
        this.router.get("/store/store-manager/:store", _super.prototype.isAuthenticated, store_controller_1.storeControlValidator.storeManagerGet, this.storeController.storeManagerGet);
        // last seven days
        this.router.get("/store/seven-day/:storeId", 
        // super.isAuthenticated,
        // storeControlValidator.getStoreListAccordingAvailability,
        this.storeController.lastSevenDay);
        this.router.post("/store/", _super.prototype.isAdmin, store_controller_1.storeControlValidator.assignStoreManager, this.storeController.createStore);
        // update store
        this.router.put("/store/:storeId", _super.prototype.isAdmin, store_controller_1.storeControlValidator.assignStoreManager, this.storeController.updateStore);
        // get store
        this.router.get("/store/:storeId", _super.prototype.isAuthenticated, this.storeController.getStore);
        // get all stores
        this.router.get("/store/all/stores", this.storeController.getAllStores);
        // TODO: DELETE STORE
        this.router.delete("/store/:storeId", this.storeController.deleteStore);
        // assign manager
        this.router.put("/store/manager/assign/:storeId", _super.prototype.isAdmin, store_controller_1.storeControlValidator.assignStoreManager, this.storeController.assignStoreManager);
        // remove manager
        this.router.put("/store/manager/remove/:storeId", _super.prototype.isAdmin, this.storeController.removeStoreManager);
        //get store managers
        this.router.get("/store/:storeId/managers", _super.prototype.isAdmin, this.storeController.getStoreManagersController);
        //get hub data
        this.router.get("/store/dashboard/hub", _super.prototype.isAdmin, this.storeController.getHubDataController);
        //get hub data
        this.router.post("/store/list", _super.prototype.isAdmin, this.storeController.getAllStore);
        // get store list according availability and time
        // this.router.post(
        //   "/store/time-availability",
        //   super.isAuthenticated,
        //   storeControlValidator.getStoreListAccordingAvailability,
        //   this.storeController.getStoreListAccordingAvailability
        // );
    };
    return Category;
}(authenticate_middleware_1.default));
exports.default = Category;

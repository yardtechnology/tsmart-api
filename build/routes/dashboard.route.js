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
var dashboardController_1 = require("../dashboardController");
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var DashboardRoutes = /** @class */ (function (_super) {
    __extends(DashboardRoutes, _super);
    function DashboardRoutes() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        // this.dashboardController = new DashboardController();
        _this.userDashboardController = new dashboardController_1.UserDashboardController();
        _this.storeDashboardController = new dashboardController_1.StoreDashboardController();
        _this.repairerDashboardController = new dashboardController_1.RepairerDashboardController();
        _this.refurbishedDashboardController = new dashboardController_1.RefurbishedDashboardController();
        _this.accessoryDashboardController = new dashboardController_1.AccessoryDashboardController();
        _this.buyDashboardController = new dashboardController_1.BuyDashboardController();
        _this.paymentDashboardController = new dashboardController_1.PaymentDashboardController();
        _this.reportDashboardController = new dashboardController_1.ReportDashboardController();
        _this.orderDashboardController = new dashboardController_1.OrderDashboardController();
        _this.dashboardDashboardController = new dashboardController_1.DashboardDashboardController();
        _this.routes();
        return _this;
    }
    DashboardRoutes.prototype.routes = function () {
        // create
        // this.router.get(
        //   "/dashboard/order-status",
        //   super.isAuthenticated,
        //   DashboardControllerValidation.orderStatusAndServiceType,
        //   this.dashboardController.orderStatusAndServiceType
        // );
        // // total user count
        // this.router.get(
        //   "/dashboard/user-count",
        //   super.isAuthenticated,
        //   DashboardControllerValidation.totalUserCount,
        //   this.dashboardController.totalUserCount
        // );
        // //  Repair count
        // this.router.get(
        //   "/dashboard/repair-order-count",
        //   super.isAuthenticated,
        //   this.dashboardController.repairOrderCount
        // );
        // // Refurbished count
        // this.router.get(
        //   "/dashboard/refurbish-and-accessory-product-count",
        //   super.isAuthenticated,
        //   DashboardControllerValidation.refurbishedProductCount,
        //   this.dashboardController.refurbishedProductCount
        // );
        // // Revenue generate
        // this.router.get(
        //   "/dashboard/revenue",
        //   super.isAuthenticated,
        //   this.dashboardController.revenue
        // );
        // // Store Count
        // this.router.get(
        //   "/dashboard/store-count",
        //   super.isAuthenticated,
        //   this.dashboardController.storeCount
        // );
        // ================================================================= >>>> USER DASHBOARD <<<< =================================================================
        this.router.get("/dashboard/user/weekly-join", _super.prototype.isAuthenticated, this.userDashboardController.userLastWeeklyJoin);
        this.router.get("/dashboard/user/technician", _super.prototype.isAuthenticated, this.userDashboardController.userTechnicianCount);
        this.router.get("/dashboard/user/customer", _super.prototype.isAuthenticated, this.userDashboardController.customerCount);
        // technician
        this.router.get("/dashboard/user/technician/:technicianId", _super.prototype.isAuthenticated, dashboardController_1.userDashboardValidation.technician, this.userDashboardController.technician);
        // ================================================================= >>>> STORE DASHBOARD <<<< =================================================================
        this.router.get("/dashboard/store/monthly-join", _super.prototype.isAuthenticated, this.storeDashboardController.monthlyStatus);
        // total store
        this.router.get("/dashboard/store/total-store", _super.prototype.isAuthenticated, this.storeDashboardController.totalStore);
        // total manager
        this.router.get("/dashboard/store/total-manager", _super.prototype.isAuthenticated, this.storeDashboardController.totalManager);
        // total manager Assign
        this.router.get("/dashboard/store/manager-assign", _super.prototype.isAuthenticated, this.storeDashboardController.assignManager);
        // ============================= >>>>>> REPAIRER DASHBOARD >>>================
        // Repairer status graph
        this.router.get("/dashboard/repairer/status", _super.prototype.isAuthenticated, this.repairerDashboardController.repairerStatus);
        // last seven year status
        this.router.get("/dashboard/repairer/last-seven-year", _super.prototype.isAuthenticated, this.repairerDashboardController.lastSevenYearData);
        this.router.get("/dashboard/repairer/card", _super.prototype.isAuthenticated, this.repairerDashboardController.card);
        // ============================= >>> REFURBISHED DASHBOARD <<<<<<<<<<<<<<<< =============
        this.router.get("/dashboard/refurbished/category-graph", _super.prototype.isAuthenticated, this.refurbishedDashboardController.refurbishedByCategory);
        this.router.get("/dashboard/refurbished/top-brand", _super.prototype.isAuthenticated, this.refurbishedDashboardController.topBrands);
        this.router.get("/dashboard/refurbished/card", _super.prototype.isAuthenticated, this.refurbishedDashboardController.card);
        this.router.get("/dashboard/refurbished/month-wise-repair-in-store", _super.prototype.isAuthenticated, this.refurbishedDashboardController.managerMonthly);
        /**
         * TODO: total refurbished in percentage has left
         */
        // ============================= >>> Accessory Dashboard <<<================================================================
        this.router.get("/dashboard/accessory/circular-graph", _super.prototype.isAuthenticated, this.accessoryDashboardController.circularGraph);
        this.router.get("/dashboard/accessory/card", _super.prototype.isAuthenticated, this.accessoryDashboardController.card);
        // top 5 accessory
        this.router.get("/dashboard/accessory/top-accessory", _super.prototype.isAuthenticated, this.accessoryDashboardController.topAccessories);
        // ========================>>> BUY DASHBOARD <<================================================================
        this.router.get("/dashboard/buy/card", _super.prototype.isAuthenticated, this.buyDashboardController.card);
        this.router.get("/dashboard/buy/circular-graph", _super.prototype.isAuthenticated, this.buyDashboardController.card);
        // ======================== payment <<================================================================
        this.router.get("/dashboard/payment/total-revenue", _super.prototype.isAuthenticated, this.paymentDashboardController.totalRevenue);
        this.router.get("/dashboard/payment/refurbish-list", _super.prototype.isAuthenticated, this.paymentDashboardController.refurbishList);
        this.router.get("/dashboard/payment/accessory-list", _super.prototype.isAuthenticated, this.paymentDashboardController.accessoryList);
        this.router.get("/dashboard/payment/in-store-list", _super.prototype.isAuthenticated, this.paymentDashboardController.inStoreList);
        this.router.get("/dashboard/payment/mail-in-list", _super.prototype.isAuthenticated, this.paymentDashboardController.mailInRevenueList);
        this.router.get("/dashboard/payment/call-out-list", _super.prototype.isAuthenticated, this.paymentDashboardController.callOutRevenue);
        // ======================== Report <<================================================================
        this.router.get("/dashboard/report/report-count", _super.prototype.isAuthenticated, this.reportDashboardController.reportCount);
        this.router.get("/dashboard/report/total-brought", _super.prototype.isAuthenticated, this.reportDashboardController.totalBrought);
        this.router.get("/dashboard/report/job-list", _super.prototype.isAuthenticated, this.reportDashboardController.totalJob);
        this.router.get("/dashboard/report/user-list", _super.prototype.isAuthenticated, this.reportDashboardController.totalUserList);
        // ======================== Order dashboard <<================================================================
        this.router.get("/dashboard/order/card", _super.prototype.isAuthenticated, this.orderDashboardController.card);
        this.router.get("/dashboard/order/monthly", _super.prototype.isAuthenticated, this.orderDashboardController.lastOneYearData);
        this.router.get("/dashboard/order/delivery-order", _super.prototype.isAuthenticated, this.orderDashboardController.deliveryOrder);
        // ======================== Dashboard  <<================================================================
        this.router.get("/dashboard/dashboard/card", _super.prototype.isAuthenticated, this.dashboardDashboardController.card);
        this.router.get("/dashboard/dashboard/top-technician", _super.prototype.isAuthenticated, this.dashboardDashboardController.topTechnician);
        this.router.get("/dashboard/dashboard/stock", _super.prototype.isAuthenticated, this.dashboardDashboardController.stock);
        this.router.get("/dashboard/dashboard/visitors", _super.prototype.isAuthenticated, this.dashboardDashboardController.visitors);
        this.router.get("/dashboard/dashboard/popular-page", _super.prototype.isAuthenticated, this.dashboardDashboardController.popularPage);
        this.router.get("/dashboard/dashboard/popular-page", _super.prototype.isAuthenticated, this.dashboardDashboardController.popularPage);
        this.router.get("/dashboard/dashboard/month-wise-order", _super.prototype.isAuthenticated, this.orderDashboardController.lastOneYearData);
        this.router.get("/dashboard/dashboard/repair-report", _super.prototype.isAuthenticated, this.dashboardDashboardController.repairReport);
    };
    return DashboardRoutes;
}(authenticate_middleware_1.default));
exports.default = DashboardRoutes;
//

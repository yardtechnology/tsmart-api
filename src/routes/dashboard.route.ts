import { Router } from "express";
import {
  AccessoryDashboardController,
  BuyDashboardController,
  DashboardDashboardController,
  OrderDashboardController,
  PaymentDashboardController,
  RefurbishedDashboardController,
  RepairerDashboardController,
  ReportDashboardController,
  StoreDashboardController,
  UserDashboardController,
  userDashboardValidation,
} from "../dashboardController";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class DashboardRoutes extends AuthenticateMiddleware {
  public router: Router;
  // private dashboardController: DashboardController;
  private userDashboardController: UserDashboardController;
  private storeDashboardController: StoreDashboardController;
  private repairerDashboardController: RepairerDashboardController;
  private refurbishedDashboardController: RefurbishedDashboardController;
  private accessoryDashboardController: AccessoryDashboardController;
  private buyDashboardController: BuyDashboardController;
  private paymentDashboardController: PaymentDashboardController;
  private reportDashboardController: ReportDashboardController;
  private orderDashboardController: OrderDashboardController;
  private dashboardDashboardController: DashboardDashboardController;

  constructor() {
    super();
    this.router = Router();
    // this.dashboardController = new DashboardController();
    this.userDashboardController = new UserDashboardController();
    this.storeDashboardController = new StoreDashboardController();
    this.repairerDashboardController = new RepairerDashboardController();
    this.refurbishedDashboardController = new RefurbishedDashboardController();
    this.accessoryDashboardController = new AccessoryDashboardController();
    this.buyDashboardController = new BuyDashboardController();
    this.paymentDashboardController = new PaymentDashboardController();
    this.reportDashboardController = new ReportDashboardController();
    this.orderDashboardController = new OrderDashboardController();
    this.dashboardDashboardController = new DashboardDashboardController();
    this.routes();
  }
  private routes() {
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
    this.router.get(
      "/dashboard/user/weekly-join",
      super.isAuthenticated,
      this.userDashboardController.userLastWeeklyJoin
    );

    this.router.get(
      "/dashboard/user/technician",
      super.isAuthenticated,
      this.userDashboardController.userTechnicianCount
    );
    this.router.get(
      "/dashboard/user/customer",
      super.isAuthenticated,
      this.userDashboardController.customerCount
    );
    // technician
    this.router.get(
      "/dashboard/user/technician/:technicianId",
      super.isAuthenticated,
      userDashboardValidation.technician,
      this.userDashboardController.technician
    );

    // ================================================================= >>>> STORE DASHBOARD <<<< =================================================================
    this.router.get(
      "/dashboard/store/monthly-join",
      super.isAuthenticated,
      this.storeDashboardController.monthlyStatus
    );
    // total store
    this.router.get(
      "/dashboard/store/total-store",
      super.isAuthenticated,
      this.storeDashboardController.totalStore
    );
    // total manager
    this.router.get(
      "/dashboard/store/total-manager",
      super.isAuthenticated,
      this.storeDashboardController.totalManager
    );
    // total manager Assign
    this.router.get(
      "/dashboard/store/manager-assign",
      super.isAuthenticated,
      this.storeDashboardController.assignManager
    );
    // ============================= >>>>>> REPAIRER DASHBOARD >>>================
    // Repairer status graph
    this.router.get(
      "/dashboard/repairer/status",
      super.isAuthenticated,
      this.repairerDashboardController.repairerStatus
    );
    // last seven year status
    this.router.get(
      "/dashboard/repairer/last-seven-year",
      super.isAuthenticated,
      this.repairerDashboardController.lastSevenYearData
    );
    this.router.get(
      "/dashboard/repairer/card",
      super.isAuthenticated,
      this.repairerDashboardController.card
    );
    // ============================= >>> REFURBISHED DASHBOARD <<<<<<<<<<<<<<<< =============
    this.router.get(
      "/dashboard/refurbished/category-graph",
      super.isAuthenticated,
      this.refurbishedDashboardController.refurbishedByCategory
    );
    this.router.get(
      "/dashboard/refurbished/top-brand",
      super.isAuthenticated,
      this.refurbishedDashboardController.topBrands
    );
    this.router.get(
      "/dashboard/refurbished/card",
      super.isAuthenticated,
      this.refurbishedDashboardController.card
    );
    /**
     * TODO: total refurbished in percentage has left
     */
    // ============================= >>> Accessory Dashboard <<<================================================================
    this.router.get(
      "/dashboard/accessory/circular-graph",
      super.isAuthenticated,
      this.accessoryDashboardController.circularGraph
    );
    this.router.get(
      "/dashboard/accessory/card",
      super.isAuthenticated,
      this.accessoryDashboardController.card
    );
    // top 5 accessory
    this.router.get(
      "/dashboard/accessory/top-accessory",
      super.isAuthenticated,
      this.accessoryDashboardController.topAccessories
    );
    // ========================>>> BUY DASHBOARD <<================================================================
    this.router.get(
      "/dashboard/buy/card",
      super.isAuthenticated,
      this.buyDashboardController.card
    );
    // ======================== payment <<================================================================
    this.router.get(
      "/dashboard/payment/total-revenue",
      super.isAuthenticated,
      this.paymentDashboardController.totalRevenue
    );
    this.router.get(
      "/dashboard/payment/refurbish-list",
      super.isAuthenticated,
      this.paymentDashboardController.refurbishList
    );
    this.router.get(
      "/dashboard/payment/accessory-list",
      super.isAuthenticated,
      this.paymentDashboardController.accessoryList
    );
    this.router.get(
      "/dashboard/payment/in-store-list",
      super.isAuthenticated,
      this.paymentDashboardController.inStoreList
    );
    this.router.get(
      "/dashboard/payment/mail-in-list",
      super.isAuthenticated,
      this.paymentDashboardController.mailInRevenueList
    );
    this.router.get(
      "/dashboard/payment/call-out-list",
      super.isAuthenticated,
      this.paymentDashboardController.callOutRevenue
    );

    // ======================== Report <<================================================================
    this.router.get(
      "/dashboard/report/report-count",
      super.isAuthenticated,
      this.reportDashboardController.reportCount
    );
    this.router.get(
      "/dashboard/report/total-brought",
      super.isAuthenticated,
      this.reportDashboardController.totalBrought
    );
    this.router.get(
      "/dashboard/report/job-list",
      super.isAuthenticated,
      this.reportDashboardController.totalJob
    );
    this.router.get(
      "/dashboard/report/user-list",
      super.isAuthenticated,
      this.reportDashboardController.totalUserList
    );

    // ======================== Order dashboard <<================================================================
    this.router.get(
      "/dashboard/order/card",
      super.isAuthenticated,
      this.orderDashboardController.card
    );
    this.router.get(
      "/dashboard/order/monthly",
      super.isAuthenticated,
      this.orderDashboardController.lastOneYearData
    );
    this.router.get(
      "/dashboard/order/delivery-order",
      super.isAuthenticated,
      this.orderDashboardController.deliveryOrder
    );

    // ======================== Dashboard  <<================================================================
    this.router.get(
      "/dashboard/dashboard/card",
      super.isAuthenticated,
      this.dashboardDashboardController.card
    );
    this.router.get(
      "/dashboard/dashboard/top-technician",
      super.isAuthenticated,
      this.dashboardDashboardController.topTechnician
    );
    this.router.get(
      "/dashboard/dashboard/stock",
      super.isAuthenticated,
      this.dashboardDashboardController.stock
    );
    this.router.get(
      "/dashboard/dashboard/visitors",
      super.isAuthenticated,
      this.dashboardDashboardController.visitors
    );
    this.router.get(
      "/dashboard/dashboard/popular-page",
      super.isAuthenticated,
      this.dashboardDashboardController.popularPage
    );
    this.router.get(
      "/dashboard/dashboard/popular-page",
      super.isAuthenticated,
      this.dashboardDashboardController.popularPage
    );
    this.router.get(
      "/dashboard/dashboard/month-wise-order",
      super.isAuthenticated,
      this.orderDashboardController.lastOneYearData
    );
    this.router.get(
      "/dashboard/dashboard/repair-report",
      super.isAuthenticated,
      this.dashboardDashboardController.repairReport
    );
  }
}

//

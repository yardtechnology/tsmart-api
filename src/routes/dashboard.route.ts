import { Router } from "express";
import {
  DashboardController,
  DashboardControllerValidation,
} from "../controllers";
import {
  AccessoryDashboardController,
  BuyDashboardController,
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
  private dashboardController: DashboardController;
  private userDashboardController: UserDashboardController;
  private storeDashboardController: StoreDashboardController;
  private repairerDashboardController: RepairerDashboardController;
  private refurbishedDashboardController: RefurbishedDashboardController;
  private accessoryDashboardController: AccessoryDashboardController;
  private buyDashboardController: BuyDashboardController;
  private paymentDashboardController: PaymentDashboardController;
  private reportDashboardController: ReportDashboardController;
  constructor() {
    super();
    this.router = Router();
    this.dashboardController = new DashboardController();
    this.userDashboardController = new UserDashboardController();
    this.storeDashboardController = new StoreDashboardController();
    this.repairerDashboardController = new RepairerDashboardController();
    this.refurbishedDashboardController = new RefurbishedDashboardController();
    this.accessoryDashboardController = new AccessoryDashboardController();
    this.buyDashboardController = new BuyDashboardController();
    this.paymentDashboardController = new PaymentDashboardController();
    this.reportDashboardController = new ReportDashboardController();
    this.routes();
  }
  private routes() {
    // create
    this.router.get(
      "/dashboard/order-status",
      super.isAuthenticated,
      DashboardControllerValidation.orderStatusAndServiceType,
      this.dashboardController.orderStatusAndServiceType
    );

    // total user count
    this.router.get(
      "/dashboard/user-count",
      super.isAuthenticated,
      DashboardControllerValidation.totalUserCount,
      this.dashboardController.totalUserCount
    );

    //  Repair count
    this.router.get(
      "/dashboard/repair-order-count",
      super.isAuthenticated,
      this.dashboardController.repairOrderCount
    );
    // Refurbished count
    this.router.get(
      "/dashboard/refurbish-and-accessory-product-count",
      super.isAuthenticated,
      DashboardControllerValidation.refurbishedProductCount,
      this.dashboardController.refurbishedProductCount
    );
    // Revenue generate
    this.router.get(
      "/dashboard/revenue",
      super.isAuthenticated,
      this.dashboardController.revenue
    );
    // Store Count
    this.router.get(
      "/dashboard/store-count",
      super.isAuthenticated,
      this.dashboardController.storeCount
    );

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
    // ======================== Report <<================================================================
    this.router.get(
      "/dashboard/report/total-user",
      super.isAuthenticated,
      this.reportDashboardController.totalUser
    );
  }
}

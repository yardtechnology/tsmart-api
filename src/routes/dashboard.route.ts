import { Router } from "express";
import {
  DashboardController,
  DashboardControllerValidation,
} from "../controllers";
import { UserDashboardController } from "../dashboardController";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class DashboardRoutes extends AuthenticateMiddleware {
  public router: Router;
  private dashboardController: DashboardController;
  private userDashboardController: UserDashboardController;

  constructor() {
    super();
    this.router = Router();
    this.dashboardController = new DashboardController();
    this.userDashboardController = new UserDashboardController();
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
  }
}

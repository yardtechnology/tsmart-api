import { Router } from "express";
import {
  DashboardController,
  DashboardControllerValidation,
} from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class DashboardRoutes extends AuthenticateMiddleware {
  public router: Router;
  private dashboardController: DashboardController;

  constructor() {
    super();
    this.router = Router();
    this.dashboardController = new DashboardController();
    this.routes();
  }
  private routes() {
    // create
    this.router.get(
      "/dashboard/order-status",
      super.isAuthenticated,
      DashboardControllerValidation.statusCount,
      this.dashboardController.statusCount
    );

    // total user count
    this.router.get(
      "/dashboard/total-user-count",
      super.isAuthenticated,
      this.dashboardController.totalUserCount
    );

    //  total revenue

    // this.router.get(
    //   "/dashboard/total-revenue",
    //   super.isAuthenticated,
    //   DashboardControllerValidation.totalRevenue,
    //   this.dashboardController.totalRevenue
    // );
  }
}

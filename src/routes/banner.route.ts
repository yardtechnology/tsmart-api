import { Router } from "express";
import BannerController from "../controllers/banner.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class Banner extends AuthenticateMiddleware {
  public router: Router;
  private BannerController: BannerController;

  constructor() {
    super();
    this.router = Router();
    this.BannerController = new BannerController();
    this.createBannerRoute();
    this.updateBannerRoute();
    this.getAllBannersRoute();
    this.deleteBannerRoute();
  }

  //create banner
  private createBannerRoute(): void {
    this.router.post(
      "/banner",
      super.isAdmin,
      this.BannerController.validateUpdateBannerFields,
      this.BannerController.createBannerController
    );
  }

  //update banner
  private updateBannerRoute(): void {
    this.router.put(
      "/banner/:bannerId",
      super.isAdmin,
      this.BannerController.validateUpdateBannerFields,
      this.BannerController.updateBannerController
    );
  }

  //get all banners
  private getAllBannersRoute(): void {
    this.router.get("/banners", this.BannerController.getAllBannersController);
  }

  //delete banner
  private deleteBannerRoute(): void {
    this.router.delete(
      "/banner/:bannerId",
      super.isAdmin,
      this.BannerController.deleteBannerController
    );
  }
}

export default Banner;

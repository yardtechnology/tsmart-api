import { Router } from "express";
import AboutUsController from "../controllers/aboutUs.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class AboutUs extends AuthenticateMiddleware {
  public router: Router;
  private AboutUsController: AboutUsController;

  constructor() {
    super();
    this.router = Router();
    this.AboutUsController = new AboutUsController();
    this.createAboutUsRoute();
    this.updateAboutUsRoute();
    this.getAllAboutUssRoute();
    this.deleteAboutUsRoute();
  }

  //create aboutUs
  private createAboutUsRoute(): void {
    this.router.post(
      "/aboutUs",
      super.isAuthenticated,
      this.AboutUsController.createAboutUsController
    );
  }

  //update aboutUs
  private updateAboutUsRoute(): void {
    this.router.put(
      "/aboutUs/:aboutUsId",
      super.isAdmin,
      this.AboutUsController.updateAboutUsController
    );
  }

  //get all aboutUss
  private getAllAboutUssRoute(): void {
    this.router.get(
      "/aboutUss",
      this.AboutUsController.getAllAboutUssController
    );
  }

  //delete aboutUs
  private deleteAboutUsRoute(): void {
    this.router.delete(
      "/aboutUs/:aboutUsId",
      super.isAdmin,
      this.AboutUsController.deleteAboutUsController
    );
  }
}

export default AboutUs;

import { Router } from "express";
import {
  ContactUsController,
  ContactUsControllerValidation,
} from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class ContactUsRoutes extends AuthenticateMiddleware {
  public router: Router;
  private contactUsController: ContactUsController;

  constructor() {
    super();
    this.router = Router();
    this.contactUsController = new ContactUsController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/contactUs/",

      ContactUsControllerValidation.create,
      this.contactUsController.create
    );
    // get all
    this.router.get(
      "/contactUs",
      super.isAuthenticated,
      ContactUsControllerValidation.getAll,
      this.contactUsController.getAll
    );

    // delete
    this.router.delete(
      "/contactUs/:contactUsId",
      super.isAuthenticated,
      ContactUsControllerValidation.delete,
      this.contactUsController.delete
    );
  }
}

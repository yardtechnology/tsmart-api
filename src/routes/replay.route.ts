import { Router } from "express";
import { ReplayController, ReplayControllerValidation } from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class Routes extends AuthenticateMiddleware {
  public router: Router;
  private replayController: ReplayController;

  constructor() {
    super();
    this.router = Router();
    this.replayController = new ReplayController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/replay/",
      super.isAuthenticated,
      ReplayControllerValidation.replay,
      this.replayController.replay
    );
  }
}

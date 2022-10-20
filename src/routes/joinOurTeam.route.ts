import { Router } from "express";
import {
  JoinOurTeamController,
  JoinOurTeamControllerValidation,
} from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class JoinOurTeamRoutes extends AuthenticateMiddleware {
  public router: Router;
  private joinOurTeamController: JoinOurTeamController;

  constructor() {
    super();
    this.router = Router();
    this.joinOurTeamController = new JoinOurTeamController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/join-our-team/",
      super.isAuthenticated,
      JoinOurTeamControllerValidation.create,
      this.joinOurTeamController.create
    );
    // get all
    this.router.get(
      "/join-our-team",
      super.isAuthenticated,
      JoinOurTeamControllerValidation.getAll,
      this.joinOurTeamController.getAll
    );

    // delete
    this.router.delete(
      "/join-our-team/:joinOurTeamId",
      super.isAuthenticated,
      JoinOurTeamControllerValidation.delete,
      this.joinOurTeamController.deleteData
    );
  }
}

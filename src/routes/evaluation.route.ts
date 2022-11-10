import { Router } from "express";
import {
  EvaluationController,
  EvaluationControllerValidation,
} from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class EvaluationRoutes extends AuthenticateMiddleware {
  public router: Router;
  private evaluationController: EvaluationController;

  constructor() {
    super();
    this.router = Router();
    this.evaluationController = new EvaluationController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/evaluation/",
      super.isAuthenticated,
      EvaluationControllerValidation.create,
      this.evaluationController.create
    );
    // get all
    this.router.get(
      "/evaluation",
      super.isAuthenticated,

      this.evaluationController.getAll
    );
    // evaluation price
    this.router.get(
      "/evaluation/evaluation-price",
      this.evaluationController.evaluationPrice
    );
    // update
    this.router.put(
      "/evaluation/:evaluationId",
      super.isAuthenticated,
      EvaluationControllerValidation.update,
      this.evaluationController.update
    );
    // delete
    this.router.delete(
      "/evaluation/:evaluationId",
      super.isAuthenticated,
      EvaluationControllerValidation.delete,
      this.evaluationController.deleteData
    );
  }
}

import { Router } from "express";
import NewsController from "../controllers/news.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class News extends AuthenticateMiddleware {
  public router: Router;
  private NewsController: NewsController;

  constructor() {
    super();
    this.router = Router();
    this.NewsController = new NewsController();
    this.createNewsRoute();
    this.updateNewsRoute();
    this.getAllNewsesRoute();
    this.deleteNewsRoute();
    this.getNewsRoute();
  }

  //create news
  private createNewsRoute(): void {
    this.router.post(
      "/news",
      super.isAdmin,
      this.NewsController.validateCreateNewsFields,
      this.NewsController.createNewsController
    );
  }

  //update news
  private updateNewsRoute(): void {
    this.router.put(
      "/news/:newsId",
      super.isAdmin,
      this.NewsController.validateUpdateNewsFields,
      this.NewsController.updateNewsController
    );
  }
  //get news
  private getNewsRoute(): void {
    this.router.get("/news/:newsId", this.NewsController.getNewsByIdController);
  }

  //get all newses
  private getAllNewsesRoute(): void {
    this.router.get("/newses", this.NewsController.getAllNewsesController);
  }

  //delete news
  private deleteNewsRoute(): void {
    this.router.delete(
      "/news/:newsId",
      super.isAdmin,
      this.NewsController.deleteNewsController
    );
  }
}

export default News;

import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class Category extends AuthenticateMiddleware {
  public router: Router;
  private categoryController: CategoryController;

  constructor() {
    super();
    this.router = Router();
    this.categoryController = new CategoryController();
    this.createCategoryRoute();
    this.updateCategoryRoute();
    this.getCategoryRoute();
    this.getAllCategoryRoute();
    this.deleteCategoryRoute();
    this.getFeaturedCategoryRoute();
  }

  // create user
  private createCategoryRoute(): void {
    this.router.post(
      "/category/",
      super.isAuthenticated,
      this.categoryController.validateCreateCategoryFields,
      this.categoryController.createCategory
    );
  }

  // update category
  private updateCategoryRoute(): void {
    this.router.put(
      "/category/:categoryId",
      super.isAuthenticated,
      this.categoryController.validateCreateCategoryFields,
      this.categoryController.updateCategory
    );
  }

  //TODO: GET PRODUCTS BY CATEGORY

  // get category
  private getCategoryRoute(): void {
    this.router.get(
      "/category/:categoryId",
      super.isAuthenticated,
      this.categoryController.getCategory
    );
  }

  // get my categories
  private getAllCategoryRoute(): void {
    this.router.get("/categories", this.categoryController.getAllCategory);
  }

  // delete category
  private deleteCategoryRoute(): void {
    this.router.delete(
      "/category/:categoryId",
      super.isAuthenticated,
      this.categoryController.deleteCategory
    );
  }

  //get featured category
  private getFeaturedCategoryRoute(): void {
    this.router.get(
      "/categories/featured",
      this.categoryController.getAllFeaturedCategory
    );
  }
}

export default Category;

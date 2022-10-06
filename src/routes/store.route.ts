import { Router } from "express";
import StoreController from "../controllers/store.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class Category extends AuthenticateMiddleware {
  public router: Router;
  private storeController: StoreController;

  constructor() {
    super();
    this.router = Router();
    this.storeController = new StoreController();
    this.createStoreRoute();
    this.updateStoreRoute();
    this.getStoreRoute();
    this.getAllStoresRoute();
    this.assignStoreManagerRoute();
    this.removeStoreManagerRoute();
    this.getStoreManagersRoute();
    this.getHubDataRoute();
  }

  // create store
  private createStoreRoute(): void {
    this.router.post(
      "/store/",
      super.isAdmin,
      this.storeController.validateCreateStoreFields,
      this.storeController.createStore
    );
  }

  // update store
  private updateStoreRoute(): void {
    this.router.put(
      "/store/:storeId",
      super.isAdmin,
      this.storeController.validateCreateStoreFields,
      this.storeController.updateStore
    );
  }

  // get store
  private getStoreRoute(): void {
    this.router.get(
      "/store/:storeId",
      super.isAuthenticated,
      this.storeController.getStore
    );
  }

  // get my stores
  private getAllStoresRoute(): void {
    this.router.get("/store/all/stores", this.storeController.getAllStores);
  }

  // TODO: DELETE STORE

  // assign manager
  public assignStoreManagerRoute(): void {
    this.router.put(
      "/store/manager/assign/:storeId",
      super.isAdmin,
      this.storeController.validateCreateStoreFields,
      this.storeController.assignStoreManager
    );
  }

  // remove manager
  public removeStoreManagerRoute(): void {
    this.router.put(
      "/store/manager/remove/:storeId",
      super.isAdmin,
      this.storeController.removeStoreManager
    );
  }

  //get store managers
  public getStoreManagersRoute(): void {
    this.router.get(
      "/store/:storeId/managers",
      super.isAdmin,
      this.storeController.getStoreManagersController
    );
  }

  //get hub data
  public getHubDataRoute(): void {
    this.router.get(
      "/store/dashboard/hub",
      super.isAdmin,
      this.storeController.getHubDataController
    );
  }
}

export default Category;

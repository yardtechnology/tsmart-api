import { Router } from "express";
import StoreController, {
  storeControlValidator,
} from "../controllers/store.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class Category extends AuthenticateMiddleware {
  public router: Router;
  private storeController: StoreController;

  constructor() {
    super();
    this.router = Router();
    this.storeController = new StoreController();
    this.routes();
  }

  // create store

  private routes() {
    // get service store
    this.router.get(
      "/store/service-store",
      super.isAuthenticated,
      storeControlValidator.getStoreListAccordingServiceAvailability,
      this.storeController.getStoreListAccordingServiceAvailability
    );
    this.router.get(
      "/store/store-manager/:store",
      super.isAuthenticated,
      storeControlValidator.storeManagerGet,
      this.storeController.storeManagerGet
    );
    // last seven days
    this.router.get(
      "/store/seven-day/:storeId",
      // super.isAuthenticated,
      // storeControlValidator.getStoreListAccordingAvailability,
      this.storeController.lastSevenDay
    );

    this.router.post(
      "/store/",
      super.isAdmin,
      storeControlValidator.assignStoreManager,
      this.storeController.createStore
    );
    // update store
    this.router.put(
      "/store/:storeId",
      super.isAdmin,
      storeControlValidator.assignStoreManager,
      this.storeController.updateStore
    );
    // get store
    this.router.get(
      "/store/:storeId",
      super.isAuthenticated,
      this.storeController.getStore
    );
    // get all stores
    this.router.get("/store/all/stores", this.storeController.getAllStores);

    // TODO: DELETE STORE
    this.router.delete("/store/:storeId", this.storeController.deleteStore);
    // assign manager
    this.router.put(
      "/store/manager/assign/:storeId",
      super.isAdmin,
      storeControlValidator.assignStoreManager,
      this.storeController.assignStoreManager
    );
    // remove manager

    this.router.put(
      "/store/manager/remove/:storeId",
      super.isAdmin,
      this.storeController.removeStoreManager
    );

    //get store managers
    this.router.get(
      "/store/:storeId/managers",
      super.isAdmin,
      this.storeController.getStoreManagersController
    );
    //get hub data
    this.router.get(
      "/store/dashboard/hub",
      super.isAdmin,
      this.storeController.getHubDataController
    );
    //get hub data
    this.router.post(
      "/store/list",
      super.isAdmin,
      this.storeController.getAllStore
    );

    // get store list according availability and time
    // this.router.post(
    //   "/store/time-availability",
    //   super.isAuthenticated,
    //   storeControlValidator.getStoreListAccordingAvailability,
    //   this.storeController.getStoreListAccordingAvailability
    // );
  }
}

export default Category;

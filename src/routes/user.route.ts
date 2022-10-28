import { Router } from "express";
import UserController from "../controllers/user.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class Auth extends AuthenticateMiddleware {
  public router: Router;
  private userController: UserController;

  constructor() {
    super();
    this.router = Router();
    this.userController = new UserController();
    this.createUserRoute();
    this.getMyAccountRoute();
    this.createStoreManagerRoute();
    this.changeBlockStatusRoute();
    this.statusChangeRoute();
    this.getAllUsersRoute();
    this.onDutyRecordRoute();
  }

  // create user
  private createUserRoute(): void {
    this.router.put(
      "/user/account",
      super.isAuthenticated,
      this.userController.validateUpdateUserFields,
      this.userController.updateUserInfo
    );
  }

  // get my account
  private getMyAccountRoute(): void {
    this.router.get(
      "/user/my-account",
      super.isAuthenticated,
      this.userController.getMyAccount
    );
  }

  // create store manager
  public createStoreManagerRoute(): void {
    this.router.post(
      "/user/manager",
      super.isAuthenticated,
      this.userController.validateUpdateUserFields,
      this.userController.createStoreManager
    );
  }

  // TODO: DELETE USER AND CORRESPONDING DATA

  //change block status
  public changeBlockStatusRoute(): void {
    this.router.put(
      "/user/block-status/:userId",
      super.isAdmin,
      this.userController.validateChangeBlockStatusFields,
      this.userController.changeUserBlockStatus
    );
  }

  //TODO: GET ALL USERS FOR STORE AND ADMIN

  //status change
  public statusChangeRoute(): void {
    this.router.put(
      "/user/status/:userId",
      super.isAdmin,
      this.userController.validateStatusChangeFields,
      this.userController.accountStatusChange
    );
  }

  //get all users
  public getAllUsersRoute(): void {
    this.router.get(
      "/users/all",
      super.isManager,
      this.userController.getAllUsersController
    );
  }
  //is on duty status change | online record maintaining
  public onDutyRecordRoute(): void {
    this.router.put(
      "/user/is-on-duty",
      super.isAuthenticated,
      this.userController.onlineRecordController
    );
  }
}

export default Auth;

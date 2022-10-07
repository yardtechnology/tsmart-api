import { Router } from "express";
import WishListController from "../controllers/wishlist.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class WishList extends AuthenticateMiddleware {
  public router: Router;
  private wishListController: WishListController;

  constructor() {
    super();
    this.router = Router();
    this.wishListController = new WishListController();
    this.addToWishListRoute();
    this.removeFromWishListRoute();
    this.getMyWishListRoute();
  }

  // add to wishlist
  private addToWishListRoute(): void {
    this.router.put(
      "/wishlist",
      super.isAuthenticated,
      this.wishListController.addToWishList
    );
  }

  // remove from wishlist
  private removeFromWishListRoute(): void {
    this.router.delete(
      "/wishlist/:productId",
      super.isAuthenticated,
      this.wishListController.removeFromWishList
    );
  }

  // get my wishlist
  private getMyWishListRoute(): void {
    this.router.get(
      "/wishlists",
      super.isAuthenticated,
      this.wishListController.getMyWishList
    );
  }
}

export default WishList;

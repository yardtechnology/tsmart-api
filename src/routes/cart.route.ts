import { Router } from "express";
import CartController from "../controllers/cart.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class Cart extends AuthenticateMiddleware {
  public router: Router;
  private cartController: CartController;

  constructor() {
    super();
    this.router = Router();
    this.cartController = new CartController();
    this.addProductToCartRoute();
    this.removeProductFromCartRoute();
    this.deleteProductFromCartRoute();
    this.getCartInfoRoute();
  }

  // add to Cart
  private addProductToCartRoute(): void {
    this.router.put(
      "/cart/add",
      super.isAuthenticated,
      this.cartController.addToCart
    );
  }

  // remove from Cart
  private removeProductFromCartRoute(): void {
    this.router.put(
      "/cart/remove",
      super.isAuthenticated,
      this.cartController.removeFromCart
    );
  }

  // delete
  private deleteProductFromCartRoute(): void {
    this.router.delete(
      "/cart/:cartItemId",
      super.isAuthenticated,
      this.cartController.deleteFromCart
    );
  }

  // get cart info
  private getCartInfoRoute(): void {
    this.router.get(
      "/cart/all",
      super.isAuthenticated,
      this.cartController.getCartInfo
    );
  }

  //TODO: ORDER CART ITEM
}

export default Cart;

import { Router } from "express";
import ProductController from "../controllers/product.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class Product extends AuthenticateMiddleware {
  public router: Router;
  private productController: ProductController;

  constructor() {
    super();
    this.router = Router();
    this.productController = new ProductController();
    this.productTemp();
    this.createStoreRoute();
    this.addVariantRoute();
    this.updateProductRoute();
    this.getVariantsRoute();
    this.getProductInformationRoute();
    this.deleteProductRoute();
    this.getAllProductsRoute();
    this.getAllFeaturedProductsRoute();
    this.searchProductsRoute();
    this.productFilterRoute();
    this.deleteProductImage();
    this.getAllProductsIdRoute();
    this.addProductStockRoute();
    this.getProductStocksRoute();
    this.getStoresStocksRoute();
  }

  // create store
  private createStoreRoute(): void {
    this.router.post(
      "/product/",
      super.isManager,
      this.productController.validateCreateProductFields,
      this.productController.createProduct
    );
  }

  // add variant of product
  private addVariantRoute(): void {
    this.router.post(
      "/product/variant",
      super.isManager,
      this.productController.validateCreateProductVariantFields,
      this.productController.addVariant
    );
  }

  // update product
  private updateProductRoute(): void {
    this.router.put(
      "/product/:productId",
      super.isManager,
      this.productController.validateCreateProductUpdateFields,
      this.productController.updateProduct
    );
  }

  // get variants of product
  private getVariantsRoute(): void {
    this.router.get(
      "/product/:productId/variants",
      super.isManager,
      this.productController.getProductVariants
    );
  }

  // get product information
  private getProductInformationRoute(): void {
    this.router.get(
      "/product/:productId/info",
      super.authenticateOrUnAuthenticate,
      this.productController.getProductDetails
    );
  }

  // delete a product
  private deleteProductRoute(): void {
    this.router.delete(
      "/product/:productId",
      super.isManager,
      this.productController.deleteAProduct
    );
  }
  // get all products
  private getAllProductsRoute(): void {
    this.router.get("/products", this.productController.getAllProduct);
  }

  // get all featured products
  private getAllFeaturedProductsRoute(): void {
    this.router.get(
      "/products/featured",
      this.productController.getAllFeaturedProductsController
    );
  }

  // search products
  private searchProductsRoute(): void {
    this.router.get(
      "/products/search",
      this.productController.searchProductsController
    );
  }

  // product filter
  private productFilterRoute(): void {
    this.router.get(
      "/products/filter",
      this.productController.filterProductsController
    );
  }
  private deleteProductImage(): void {
    this.router.delete(
      "/product/:productId/image",
      this.productController.deleteProductImageController
    );
  }

  //get all products id
  private getAllProductsIdRoute(): void {
    this.router.get(
      "/products/ids",
      this.productController.getAllProductsIdsController
    );
  }
  //add product stock
  private addProductStockRoute(): void {
    this.router.post(
      "/product/:productId/stock",
      this.isManager,
      this.productController.validateCreateProductStockAddFields,
      this.productController.addProductsStockController
    );
  }

  //add product stock
  private getProductStocksRoute(): void {
    this.router.get(
      "/product-stock",
      this.isManager,
      this.productController.getProductStocksController
    );
  }
  //add product stock
  private getStoresStocksRoute(): void {
    this.router.get(
      "/product/:productId/store-stock",
      this.isAdmin,
      this.productController.getStoresStocksController
    );
  }
  //add product stock
  private productTemp(): void {
    this.router.get(
      "/product/temp",

      this.productController.productTemp
    );
  }
}

export default Product;

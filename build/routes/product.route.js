"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var product_controller_1 = __importDefault(require("../controllers/product.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.productController = new product_controller_1.default();
        _this.productTemp();
        _this.createStoreRoute();
        _this.addVariantRoute();
        _this.updateProductRoute();
        _this.getVariantsRoute();
        _this.getProductInformationRoute();
        _this.deleteProductRoute();
        _this.getAllProductsRoute();
        _this.getAllFeaturedProductsRoute();
        _this.searchProductsRoute();
        _this.productFilterRoute();
        _this.deleteProductImage();
        _this.getAllProductsIdRoute();
        _this.addProductStockRoute();
        _this.getProductStocksRoute();
        _this.removeProductStocksRoute();
        _this.getStoresStocksRoute();
        return _this;
    }
    // create store
    Product.prototype.createStoreRoute = function () {
        this.router.post("/product/", _super.prototype.isManager, this.productController.validateCreateProductFields, this.productController.createProduct);
    };
    // add variant of product
    Product.prototype.addVariantRoute = function () {
        this.router.post("/product/variant", _super.prototype.isManager, this.productController.validateCreateProductVariantFields, this.productController.addVariant);
    };
    // update product
    Product.prototype.updateProductRoute = function () {
        this.router.put("/product/:productId", _super.prototype.isManager, this.productController.validateCreateProductUpdateFields, this.productController.updateProduct);
    };
    // get variants of product
    Product.prototype.getVariantsRoute = function () {
        this.router.get("/product/:productId/variants", _super.prototype.isManager, this.productController.getProductVariants);
    };
    // get product information
    Product.prototype.getProductInformationRoute = function () {
        this.router.get("/product/:productId/info", _super.prototype.authenticateOrUnAuthenticate, this.productController.getProductDetails);
    };
    // delete a product
    Product.prototype.deleteProductRoute = function () {
        this.router.delete("/product/:productId", _super.prototype.isManager, this.productController.deleteAProduct);
    };
    // get all products
    Product.prototype.getAllProductsRoute = function () {
        this.router.get("/products", this.productController.getAllProduct);
    };
    // get all featured products
    Product.prototype.getAllFeaturedProductsRoute = function () {
        this.router.get("/products/featured", this.productController.getAllFeaturedProductsController);
    };
    // search products
    Product.prototype.searchProductsRoute = function () {
        this.router.get("/products/search", this.productController.searchProductsController);
    };
    // product filter
    Product.prototype.productFilterRoute = function () {
        this.router.get("/products/filter", this.productController.filterProductsController);
    };
    Product.prototype.deleteProductImage = function () {
        this.router.delete("/product/:productId/image", this.productController.deleteProductImageController);
    };
    //get all products id
    Product.prototype.getAllProductsIdRoute = function () {
        this.router.get("/products/ids", this.productController.getAllProductsIdsController);
    };
    //add product stock
    Product.prototype.addProductStockRoute = function () {
        this.router.post("/product/:productId/stock", this.isManager, this.productController.validateCreateProductStockAddFields, this.productController.addProductsStockController);
    };
    //add product stock
    Product.prototype.getProductStocksRoute = function () {
        this.router.get("/product-stock", this.isManager, this.productController.getProductStocksController);
    };
    //remove product stock
    Product.prototype.removeProductStocksRoute = function () {
        this.router.delete("/product-stock/:productStockId", this.isManager, this.productController.removeProductsStockController);
    };
    //add product stock
    Product.prototype.getStoresStocksRoute = function () {
        this.router.get("/product/:productId/store-stock", this.isAdmin, this.productController.getStoresStocksController);
    };
    //add product stock
    Product.prototype.productTemp = function () {
        this.router.get("/product/temp", this.productController.productTemp);
    };
    return Product;
}(authenticate_middleware_1.default));
exports.default = Product;

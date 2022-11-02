import { NextFunction, Response } from "express";
import { body, validationResult } from "express-validator";
import { Types } from "mongoose";
import { fieldValidateError } from "../helper";
import { PaginationResult } from "../helper/pagination.helper";
import MediaLogic from "../logic/media.logic";
import ProductLogic from "../logic/product.logic";
import UserLogic from "../logic/user.logic";
import { ProductModel } from "../models/product.model";
import { AuthRequest, ImageType } from "../types/core";
import { ProductType } from "../types/product";

class Product extends ProductLogic {
  // create product
  public async createProduct(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error(
          errors
            .array()
            .map((errors) => errors.msg)
            .join()
            .replace(/[,]/g, " and ")
        );
      }
      let productData: ProductType | null = null;
      const userData = await new UserLogic(req.currentUser?._id).getUserData();
      // add store id to product data
      req.body.storeId = userData?.store;

      // save product data to database
      productData = await super.createAProduct(req);

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Product created successfully",
        data: productData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // add variant to product
  public async addVariant(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      fieldValidateError(req);

      // upload user profile picture
      const displayImageFile = req.files?.displayImage;
      const filePath = `product`;
      const displayImageData: any | undefined =
        displayImageFile && !Array.isArray(displayImageFile)
          ? await super.uploadMedia(displayImageFile, filePath)
          : undefined;

      // upload product images
      const imagesFile = req.files?.images;
      const imageFilePath = `product`;
      const imagesData: ImageType | ImageType[] | undefined =
        imagesFile &&
        (Array.isArray(imagesFile)
          ? await super.uploadMultipleMedia(imagesFile, imageFilePath)
          : await super.uploadMedia(imagesFile, imageFilePath));

      // save product data to database
      const categoryData: ProductType = await new ProductModel({
        title: req.body?.title,
        shortDescription: req.body?.shortDescription,
        description: req.body?.description,
        mrp: req.body?.mrp,
        salePrice: req.body?.salePrice,
        displayImage: displayImageData,
        category: req.body?.category,
        store: req.body?.store,
        isFeatured: req.body?.isFeatured,
        isActive: req.body?.isActive,
        stock: req.body?.stock,
        variantOf: req.body?.variantOf,
        memory: req.body?.memory,
        color: req.body?.color,
        condition: req.body?.condition,
        type: req.body?.type,
        images: imagesData,
        device: req.body?.device,
        make: req.body?.make,
        model: req.body?.model,
      }).save();

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Product variant created successfully",
        data: categoryData,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // update product
  public async updateProduct(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // validator error handler
      fieldValidateError(req);

      // upload product image
      const displayImageFile = req.files?.displayImage;
      const filePath = `product`;
      const displayImageData: ImageType | undefined =
        displayImageFile && !Array.isArray(displayImageFile)
          ? await super.uploadMedia(displayImageFile, filePath)
          : undefined;

      // upload product images
      const imagesFile = req.files?.images;
      const imageFilePath = `product`;
      const imagesData: ImageType | ImageType[] | undefined =
        imagesFile &&
        (Array.isArray(imagesFile)
          ? await super.uploadMultipleMedia(imagesFile, imageFilePath)
          : await super.uploadMedia(imagesFile, imageFilePath));

      // update product data to database
      const updatedProduct: ProductType | null =
        await ProductModel.findByIdAndUpdate(req.params.productId, {
          title: req.body?.title,
          shortDescription: req.body?.shortDescription,
          description: req.body?.description,
          mrp: req.body?.mrp,
          salePrice: req.body?.salePrice,
          displayImage: displayImageData,
          category: req.body?.category,
          store: req.body?.store,
          isFeatured: req.body?.isFeatured,
          isActive: req.body?.isActive,
          stock: req.body?.stock,
          variantOf: req.body?.variantOf,
          memory: req.body?.memory,
          color: req.body?.color,
          condition: req.body?.condition,
          type: req.body?.type,
          $addToSet: {
            images: imagesData,
          },
          moq: req.body?.moq,
        });
      if (!updatedProduct) throw new Error("Product not found");

      // remove old images from cloud storage
      displayImageData?.path &&
        updatedProduct.displayImage?.path &&
        (await super.deleteMedia(updatedProduct.displayImage.path));

      //TODO: remove old images from cloud storage

      res.status(200).json({
        status: "SUCCESS",
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  // get product variants
  public async getProductVariants(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const variants = await super.getVariants(req.params.productId);
      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Product variants fetched successfully",
        data: variants,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  /** get product information */
  public async getProductInformation(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      let product;
      if (req.query.userId) {
        product = await super.getProductInfoOptimized({
          Id: req.params.productId,
          userId: req.query.userId as string,
        });
      } else {
        product = await super.getProductInfo(req.params.productId);
      }
      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Product info fetched successfully",
        data: product,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  /** delete a product */
  public async deleteAProduct(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const product = await super.deleteProduct(req.params.productId);
      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Product deleted successfully",
        data: product,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  /**get all display products */
  public async getAllProduct(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      let products;
      if (req.query?.userId) {
        products = await super.getAllProductsOptimized({
          limit: req.query.limit ? Number(req.query.limit) : undefined,
          chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
          type: req.query.type
            ? req.query.type.toString().toUpperCase()
            : undefined,
          userId: req.query?.userId as string,
        });
      } else {
        products = await super.getAllDisplayProducts({
          limit: req.query.limit ? Number(req.query.limit) : undefined,
          chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
          type: req.query.type
            ? req.query.type.toString().toUpperCase()
            : undefined,
        });
      }
      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "All products fetched successfully",
        data: products,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  //get all featured products
  public async getAllFeaturedProductsController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      let products: PaginationResult<ProductType>;
      if (req?.query?.userId) {
        // get all wishlist products
        products = await super.getAllProductsOptimized({
          limit: req.query.limit ? Number(req.query.limit) : undefined,
          chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
          userId: req.query?.userId as string,
          type: req.query.type
            ? req.query.type.toString().toUpperCase()
            : undefined,
          isFeatured: true,
        });
      } else {
        products = await super.getAllFeaturedProducts({
          limit: req.query.limit ? Number(req.query.limit) : undefined,
          chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
          type: req.query.type
            ? req.query.type.toString().toUpperCase()
            : undefined,
          isFeatured: true,
        });
      }

      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "All featured products fetched successfully",
        data: products,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  //search products
  public async searchProductsController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (!req.query.searchText) throw new Error("Search text is required");

      const products = await super.searchProducts({
        searchText: req.query.searchText as string,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
        type: req.query.type
          ? req.query.type.toString().toUpperCase()
          : undefined,
      });
      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  //product filter
  public async filterProductsController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (!req.query.filter) throw new Error("Filter is required");

      const products = await super.productFilter({
        userId: req.query?.userId as string,
        filter: req.query.filter as string,
        sortBy: req.query.sortBy as string,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
        type: req.query.type
          ? req.query.type.toString().toUpperCase()
          : undefined,
      });
      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  //delete product image
  public async deleteProductImageController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const productData = await ProductModel.findById(req.params.productId);
      if (!productData) throw new Error("Product not found");
      if (!req.body?.imagePath) throw new Error("Image path is required");
      const product = await new MediaLogic().deleteMedia(req.body?.imagePath);
      await ProductModel.findByIdAndUpdate(req.params.productId, {
        images: productData.images.filter(
          (image) => image?.path !== req.body?.imagePath
        ),
      });
      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Product image deleted successfully",
        data: product,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  //get all products ids for static site generation
  public async getAllProductsIdsController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const products = await super.getAllProductsIds(
        req.query.type ? req?.query?.type?.toString()?.toUpperCase() : undefined
      );
      // send response to client
      res.status(200).json({
        status: "SUCCESS",
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  /** fields validators for the product creation request */
  public validateCreateProductFields = [
    body("title")
      .isLength({ min: 3 })
      .withMessage("title must be at least 3 characters long")
      .isLength({ max: 20 })
      .withMessage("title must be at most 20 characters long"),
    body("shortDescription")
      .isLength({ min: 8 })
      .withMessage("Short description must be at least 8 characters long")
      .isLength({ max: 250 })
      .withMessage("Short description must be at most 250 characters long"),
    body("description")
      .optional()
      .isLength({ min: 11 })
      .withMessage("Description must be at least 11 characters long")
      .isLength({ max: 1600 })
      .withMessage("Description must be at most 1600 characters long"),
    body("stock").isNumeric().withMessage("Stock must be a number"),
    body("salePrice").isNumeric().withMessage("Sale price must be a number"),
    body("mrp").isNumeric().withMessage("MRP must be a number"),
    // body("condition")
    //   .isIn(["GOOD", "BETTER", "BEST"])
    //   .withMessage("Condition must be GOOD, BETTER, BEST"),
  ];

  /** fields validators for the product variant creation request */
  public validateCreateProductVariantFields = [
    body("title")
      .isLength({ min: 3 })
      .withMessage("title must be at least 3 characters long")
      .isLength({ max: 20 })
      .withMessage("title must be at most 20 characters long"),
    body("shortDescription")
      .isLength({ min: 8 })
      .withMessage("Short description must be at least 8 characters long")
      .isLength({ max: 51 })
      .withMessage("Short description must be at most 51 characters long"),
    body("description")
      .optional()
      .isLength({ min: 11 })
      .withMessage("Description must be at least 11 characters long")
      .isLength({ max: 501 })
      .withMessage("Description must be at most 501 characters long"),
    body("stock").isNumeric().withMessage("Stock must be a number"),
    body("salePrice").isNumeric().withMessage("Sale price must be a number"),
    body("mrp").isNumeric().withMessage("MRP must be a number"),

    body("variantOf", "variantOf is required")
      .custom((value) => {
        if (!Types.ObjectId.isValid(value)) {
          return false;
        }
        return true;
      })
      .withMessage("Invalid id provided for field variantOf"),
  ];

  /** fields validators for the product update request */
  public validateCreateProductUpdateFields = [
    body("title")
      .optional()
      .isLength({ min: 3 })
      .withMessage("title must be at least 3 characters long")
      .isLength({ max: 20 })
      .withMessage("title must be at most 20 characters long"),
    body("shortDescription")
      .optional()
      .isLength({ min: 8 })
      .withMessage("Short description must be at least 8 characters long")
      .isLength({ max: 51 })
      .withMessage("Short description must be at most 51 characters long"),
    body("description")
      .optional()
      .isLength({ min: 11 })
      .withMessage("Description must be at least 11 characters long")
      .isLength({ max: 501 })
      .withMessage("Description must be at most 501 characters long"),
    body("stock").optional().isNumeric().withMessage("Stock must be a number"),
    body("salePrice")
      .optional()
      .isNumeric()
      .withMessage("Sale price must be a number"),
    body("variantOf")
      .optional()
      .custom((value) => {
        if (!Types.ObjectId.isValid(value)) {
          return false;
        }
        return true;
      })
      .withMessage("Invalid id provided for field variantOf"),
  ];
}

export default Product;

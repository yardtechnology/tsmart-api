import { NextFunction, Response } from "express";
import { body, param } from "express-validator";
import { io } from "socket.io-client";
import { fieldValidateError } from "../helper";
import BillingLogic from "../logic/billing.logic";
import CartLogic from "../logic/cart.logic";
import OrderLogic from "../logic/order.logic";
import StripeLogic from "../logic/stripe.logic";
import { BillingModel } from "../models/billing.model";
import { CartItemModel } from "../models/cartItem.model";
import { ProductModel } from "../models/product.model";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";
import OrderType, { OrderStatus } from "../types/order";
import ServicePriceType from "../types/servicePrice";
import { OrderModel } from "./../models/order.model";
import { ServicePriceModel } from "./../models/servicePrice.model";
import MailController from "./mail.controller";

class Order extends OrderLogic {
  /** make order */
  public async placeInStoreOrderController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      //place Walk in Repairing Order [STORE]
      const orderData = await super.placeInStoreServiceOrder({
        storeId: req.body?.storeId,
        userId: req.currentUser?._id as string,
        serviceTime: req.body?.serviceTime,
        serviceIds: req.body?.serviceIds,
        modelId: req.body?.modelId,
        deviceId: req.body?.deviceId,
        makeId: req.body?.makeId,
      });
      const billingData = await new BillingLogic().createBill({
        orderIds: orderData?._id,
        status: "PENDING",
        price: orderData?.price,
      });
      await OrderModel?.findByIdAndUpdate(orderData?._id, {
        billing: billingData?._id,
      });

      res.status(200).json({
        status: "SUCCESS",
        message: "Order placed successfully",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }
  /** make mail in order */
  public async placeMailInOrderController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      //place Walk in Repairing Order [STORE]
      const orderData = await super.placeMailInServiceOrder({
        userId: req.currentUser?._id as string,
        addressId: req.body?.addressId,
        serviceIds: req.body?.serviceIds,
        modelId: req.body?.modelId,
        deviceId: req.body?.deviceId,
        makeId: req.body?.makeId,
      });
      const billingData = await new BillingLogic().createBill({
        orderIds: orderData?._id,
        status: "PENDING",
        price: orderData?.price,
      });
      await OrderModel?.findByIdAndUpdate(orderData?._id, {
        billing: billingData?._id,
      });

      res.status(200).json({
        status: "SUCCESS",
        message: "Order placed successfully",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }
  /** make call out order */
  public async placeCallOutOrderController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      //place Walk in Repairing Order [STORE]
      const orderData = await super.placeCallOutOrder({
        userId: req.currentUser?._id as string,
        latitude: req.body?.latitude,
        longitude: req.body?.longitude,
        street: req.body?.street,
        serviceIds: req.body?.serviceIds,
        modelId: req.body?.modelId,
        deviceId: req.body?.deviceId,
        makeId: req.body?.makeId,
      });
      const billingData = await new BillingLogic().createBill({
        orderIds: orderData?._id,
        status: "PENDING",
        price: orderData?.price,
      });
      await OrderModel?.findByIdAndUpdate(orderData?._id, {
        billing: billingData?._id,
      });

      res.status(200).json({
        status: "SUCCESS",
        message: "Order placed successfully",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }
  /** make call out order */
  public async placeSellOrderController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      //place Walk in Repairing Order [STORE]
      const orderData = await super.placeSellOrder({
        userId: req.currentUser?._id as string,
        addressId: req.body?.addressId,
        deviceId: req.body?.deviceId,
        makeId: req.body?.makeId,
        modelId: req.body?.modelId,
        falsyEvaluatedIds: req.body?.falsyEvaluatedIds,
        paymentMethod: req.body?.paymentMethod,
        bankDetails: req.body?.bankDetails,
        colorId: req.body?.colorId,
        memoryId: req.body?.memoryId,
        imei: req.body?.imei,
      });

      res.status(200).json({
        status: "SUCCESS",
        message: "Sell order placed successfully",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }

  /** get order details*/
  public async getOrderDetailsController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);

      const orderData = await super.getOrderDetails(req.params.orderId);
      // await new BillingLogic().createBill(orderData?._id, {
      //   status: "PAID",
      // });

      res.status(200).json({
        status: "SUCCESS",
        message: "Order details found successfully",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }

  //TODO: add extra charges
  public async addExtraChargesController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      fieldValidateError(req);
      const { serviceIds, accessoryIds } = req.body;
      const { orderId } = req.params;
      const servicesData = await ServicePriceModel.find({
        _id: { $in: serviceIds },
      });
      const accessoriesData = await ProductModel.find({
        _id: { $in: accessoryIds },
      });
      const orderPrevData = await OrderModel.findById(orderId);
      const extraServices = orderPrevData?.extraServices
        ? [...orderPrevData?.extraServices, ...servicesData]
        : servicesData;
      const accessory = orderPrevData?.accessory
        ? [...orderPrevData?.accessory, ...accessoriesData]
        : accessoriesData;
      const orderData = await OrderModel.findByIdAndUpdate(
        orderId,
        {
          extraServices,
          accessory,
        },
        { new: true }
      );
      const accessoryData = orderData?.accessory?.reduce((prev, curr) => {
        return (prev += curr?.salePrice);
      }, 0);
      const servicePriceData: number | undefined =
        orderData?.extraServices?.reduce(
          (prev: number, curr: ServicePriceType) => {
            return (prev += curr?.salePrice);
          },
          0
        );
      const basePrice = (accessoryData || 0) + (servicePriceData || 0);
      const extraBilling = await new BillingLogic().createExtraFeesBilling({
        orderId: [orderId],
        basePrice,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Extra charges added successfully",
        data: extraBilling,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * order status and ETA update
   */
  public async updateOrderStatusController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      const orderData = await super.updateOrderStatus({
        orderId: req.params.orderId,
        status: req.body.status as OrderStatus,
        eta: new Date(req.body.eta as string),
      });
      //send mail to user to notify about order status
      new MailController().sendMail({
        to: orderData.user.email,
        subject: "Order status updated",
        text: `
        Hi ${orderData.user.displayName},
        ${
          (req.body.status || orderData?.status?.replace(/_/g, " ")) &&
          `Your order ${orderData.id} has been updated to ${
            req.body.status || orderData?.status?.replace(/_/g, " ")
          }.`
        }
        ${
          orderData?.ETA &&
          `We will deliver your order by ${new Date(
            orderData?.ETA
          ).toLocaleString()}.`
        }
        Thanks,`,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Order status updated",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * order single product
   */
  public async placeProductOrderController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      //place order for product
      const orderData = await super.orderProduct({
        productId: req.body?.productId,
        userId: req.currentUser?._id as string,
        quantity: req.body?.quantity,
        shippedTo: req.body?.addressId,
        status: "PENDING",
      });
      const billingData = await new BillingLogic().createBill({
        orderIds: orderData?._id,
        status: "PENDING",
        price: orderData?.price,
      });
      //add billing id in order data
      OrderModel.findByIdAndUpdate(orderData?._id, {
        billing: billingData?._id,
      });

      res.status(200).json({
        status: "SUCCESS",
        message: "Order placed successfully",
        data: orderData,
      });
    } catch (error) {
      console.log({ error });
      next(error);
    }
  }

  /**
   * order card item
   */
  public async placeCartOrderController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      //place order for product
      const cartItemList = await new CartLogic().getCartItems(
        req.currentUser?._id
      );
      let orderedItems: OrderType[] = [];
      for (const cartItem of cartItemList.products) {
        const orderData = await super.orderProduct({
          productId: cartItem?.product?._id,
          userId: req.currentUser?._id as string,
          quantity: cartItem?.quantity,
          shippedTo: req.body?.addressId,
          status: "PENDING",
        });
        //add order item to array
        orderedItems.push(orderData);
      }
      const orderIds = orderedItems?.map((item) => item?._id);
      const price = orderedItems.reduce((acc, item) => acc + item.price, 0);
      const billingData = await new BillingLogic().createBill({
        orderIds,
        status: "PENDING",
        price,
      });
      //add billing id in order data
      OrderModel.updateMany([{ _id: { $in: orderIds } }], {
        billing: billingData?._id,
      });

      res.status(200).json({
        status: "SUCCESS",
        message: "Orders placed successfully",
        data: orderedItems,
      });
    } catch (error) {
      console.log({ error });
      next(error);
    }
  }

  /**
   * order payment
   */
  public async payOrderAmount(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      //charge amount to the customer\
      const { email, id } = req.body?.token;
      const { amount, currency, billingId } = req.body;
      const billingData = await BillingModel.findById(billingId).populate(
        "orders"
      );
      if (!billingData) throw new Error("billingData not found");
      const chargedData = await new StripeLogic().paymentSession({
        amount: billingData?.total,
        currency: "GBP",
        source: id,
        email,
        name: billingData?.orders[0]?.user?.displayName,
        address: {
          country: billingData.orders[0]?.address?.country,
          line1: billingData?.orders[0]?.address?.street,
        },
      });
      //update payment status on billing
      await BillingModel.findByIdAndUpdate(billingData?._id, {
        status: "PAID",
        metadata: {
          charged_id: chargedData?.id,
          balance_transaction: chargedData?.balance_transaction,
        },
      });
      //update payment status on order
      await OrderModel.findOneAndUpdate(
        { _id: { $in: billingData?.orders?.map((item) => item?._id) } },
        { status: "INITIATED" }
      );
    } catch (error) {
      next(error);
    }
  }

  /** order summery */
  public async productOrderSummery(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      let orderData;
      let totalMrp;
      let totalSalePrice;
      let discount;
      let billingData;
      switch (req.query.type?.toString()?.toUpperCase()) {
        case "PRODUCT":
          if (!req.query.productId) throw new Error("Product id is required");
          if (!req.query.quantity) throw new Error("Quantity is required");
          // get product data
          const productData = await ProductModel.findById(req.query?.productId);
          // check if product is available
          if (!productData) throw new Error("Product not found");
          let cartItemData;
          // find cart item
          cartItemData = await CartItemModel.findOneAndUpdate(
            {
              user: req.currentUser?._id,
              product: req.query.productId,
            },
            {
              quantity: req.query.quantity,
            },
            {
              new: true,
            }
          );
          // if cart item not found create new cart item
          if (!cartItemData) {
            //create cart item
            cartItemData = await new CartItemModel({
              user: req.currentUser?._id,
              product: req.query.productId,
              quantity: req.query.quantity,
            }).save();
          }
          billingData = await new BillingLogic().calculateItemBilling({
            productId: req.query.productId as string,
            quantity: Number(req.query.quantity),
            couponId: req.query.couponId as string,
            userId: req.currentUser?._id,
          });
          cartItemData.total = cartItemData.quantity * productData.salePrice;
          await cartItemData.populate("product");
          totalMrp = cartItemData.product?.mrp * cartItemData.quantity;
          totalSalePrice = billingData.amount;
          discount = totalMrp - totalSalePrice;
          orderData = {
            products: [cartItemData],
            totalMrp,
            totalSalePrice,
            discount,
            couponInfo: billingData?.couponInfo,
          };
          break;
        case "CART":
          const cartItem = await new CartLogic().getCartItems(
            req.currentUser?._id
          );
          totalMrp = cartItem.products.reduce(
            (acc, curr) => (acc += curr.product.mrp * curr.quantity),
            0
          );
          billingData = await new BillingLogic().calculateCartItemBilling({
            couponId: req.query.couponId as string,
            userId: req.currentUser?._id,
          });
          totalSalePrice = billingData.amount;
          discount = totalMrp - totalSalePrice;
          orderData = {
            products: cartItem.products,
            totalMrp,
            totalSalePrice,
            discount,
            couponInfo: billingData?.couponInfo,
          };
          break;

        default:
          throw new Error(
            "Type is required and must be either PRODUCT or CART"
          );
      }
      res.status(200).json({
        status: "SUCCESS",
        message: "Orders found successfully",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }
  /**get sell order summery */
  public async sellOrderSummery(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      const {} = req.query;

      res.status(200).json({
        status: "SUCCESS",
        message: "Sell summery fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  /** get job requests */
  public async getJobRequestController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      const jobRequests = await OrderModel.find({
        nearByTechnicians: req?.currentUser?._id,
      });
      res.json({
        status: "SUCCESS",
        message: "Job requests fetched successfully",
        data: jobRequests,
      });
    } catch (error) {
      next(error);
    }
  }
  /** accept job requests */
  public async acceptJobRequestController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      const technicianData = await UserModel.findById(
        req?.body?.technicianID
      ).select(
        "displayName phoneNumber country avatar email gender role reviews"
      );
      const jobRequests = await OrderModel.findByIdAndUpdate({
        nearByTechnicians: [],
        technicianID: technicianData?._id,
        technician: technicianData,
      });
      //send socket event to every
      const socket = io(`${process?.env?.SOCKET_URL}/incoming-job`);
      socket.on("connect", () => {
        for (const technicianId in jobRequests?.nearByTechnicians) {
          socket.emit("NEW-JOB-REQUEST", {
            technicianId,
          });
        }
      });
      res.json({
        status: "SUCCESS",
        message: "Job requests accepted successfully",
        data: jobRequests,
      });
    } catch (error) {
      next(error);
    }
  }

  public validateOrderPlaceFields = [
    body("storeId")
      .not()
      .isEmpty()
      .withMessage("Store Id is required")
      .isMongoId()
      .withMessage("Not a valid Store Id"),
    body("serviceTime").not().isEmpty().withMessage("Service time is required"),
    body("serviceIds.*")
      .isMongoId()
      .withMessage("serviceIds must be a valid service id"),
    body("modelId")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("modelId must be a valid service id"),
    body("makeId")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("makeId must be a valid service id"),
    body("deviceId")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("deviceId must be a valid service id"),
  ];
  public validateMailInOrderPlaceFields = [
    body("addressId")
      .not()
      .isEmpty()
      .withMessage("AddressId is required")
      .isMongoId()
      .withMessage("Not a valid Address Id"),
    body("serviceIds.*")
      .isMongoId()
      .withMessage("serviceIds must be a valid service id"),
    body("modelId")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("modelId must be a valid service id"),
    body("makeId")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("makeId must be a valid service id"),
    body("deviceId")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("deviceId must be a valid service id"),
  ];
  public validateCallOutOrderPlaceFields = [
    body("latitude").not().isEmpty().withMessage("latitude is required"),
    body("longitude").not().isEmpty().withMessage("longitude is required"),
    body("serviceIds.*")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("serviceIds must be a valid service id"),
    body("modelId")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("modelId must be a valid service id"),
    body("makeId")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("makeId must be a valid service id"),
    body("deviceId")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("deviceId must be a valid service id"),
  ];
  public validateProductOrderPlaceFields = [
    body("productId")
      .not()
      .isEmpty()
      .withMessage("productId is required")
      .isString()
      .withMessage("productId must be a string"),
    body("quantity")
      .not()
      .isEmpty()
      .withMessage("quantity is required")
      .isNumeric()
      .withMessage("quantity must be a number"),
    body("addressId")
      .not()
      .isEmpty()
      .withMessage("AddressId is required")
      .isString()
      .withMessage("AddressId must be a string"),
  ];
  public validateCartOrderPlaceFields = [
    body("addressId")
      .not()
      .isEmpty()
      .withMessage("AddressId is required")
      .isString()
      .withMessage("AddressId must be a string"),
  ];
  public validateOrderPaymentFields = [
    body("billingId")
      .not()
      .isEmpty()
      .withMessage("billingId is required")
      .isMongoId()
      .withMessage("not a valid billingId"),
    body("token.id").not().isEmpty().withMessage("token.id is required"),
    body("token.email").not().isEmpty().withMessage("token.email is required"),
    // body("amount").not().isEmpty().withMessage("amount is required"),
    // body("currency").not().isEmpty().withMessage("currency is required"),
  ];

  public validateGetOrderDetails = [
    param("orderId").isMongoId().withMessage("Not a valid order id"),
  ];
  public validateUpdateOrderStatus = [
    param("orderId").isMongoId().withMessage("Not a valid order id"),
    body("status")
      .isIn([
        "INITIATED",
        "COMPLETED",
        "CANCELLED",
        "CONFIRMED",
        "PACKED",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "RECEIVED",
        "PAID",
        "TECHNICIAN_ASSIGNED",
        "TECHNICIAN_REACHED",
        "REPAIRED",
        "ADD_ON_SERVICE",
      ])
      .withMessage("not a valid status"),
    body("eta")
      .optional()
      .custom((value) => !isNaN(new Date(value).getMonth()))
      .withMessage("not a valid date"),
  ];
  public validateSellOrderPlaceFields = [
    body("addressId")
      .not()
      .isEmpty()
      .withMessage("AddressId is required")
      .isMongoId()
      .withMessage("AddressId is not a valid id"),
    body("deviceId")
      .not()
      .isEmpty()
      .withMessage("deviceId is required")
      .isMongoId()
      .withMessage("deviceId is not a valid id"),
    body("makeId")
      .not()
      .isEmpty()
      .withMessage("makeId is required")
      .isMongoId()
      .withMessage("makeId is not a valid id"),
    body("modelId")
      .not()
      .isEmpty()
      .withMessage("modelId is required")
      .isMongoId()
      .withMessage("modelId is not a valid id"),
    body("colorId")
      .not()
      .isEmpty()
      .withMessage("colorId is required")
      .isMongoId()
      .withMessage("colorId is not a valid id"),
    body("memoryId")
      .not()
      .isEmpty()
      .withMessage("memoryId is required")
      .isMongoId()
      .withMessage("memoryId is not a valid id"),
    body("paymentMethod")
      .not()
      .isEmpty()
      .withMessage("paymentMethod is required")
      .isIn(["ONLINE", "CHEQUE"])
      .withMessage("paymentMethod can only be ONLINE, CHEQUE"),
    body("bankDetails.fullName")
      .if((value: string, { req }: any) => {
        return req?.body?.paymentMethod === "ONLINE";
      })
      .not()
      .isEmpty()
      .withMessage("bankDetails.fullName is required"),
    body("bankDetails.accountNumber")
      .if((value: string, { req }: any) => {
        return req?.body?.paymentMethod === "ONLINE";
      })
      .not()
      .isEmpty()
      .withMessage("bankDetails.accountNumber is required"),
    body("bankDetails.sortCode")
      .if((value: string, { req }: any) => {
        return req?.body?.paymentMethod === "ONLINE";
      })
      .not()
      .isEmpty()
      .withMessage("bankDetails.sortCode is required"),
    body("falsyEvaluatedIds")
      .not()
      .isEmpty()
      .withMessage("falsyEvaluatedIds is required")
      .isArray()
      .isMongoId()
      .withMessage("falsyEvaluatedIds must be an array of evaluatedPriceIds"),
    body("imei").not().isEmpty().withMessage("IMEI number is required"),
  ];
  public validateAddExtraChargesFields = [
    body("serviceIds")
      .not()
      .isEmpty()
      .withMessage("serviceIds is required")
      .isArray()
      .isMongoId()
      .withMessage("serviceIds must be an array of serviceId"),
    body("accessoryIds")
      .not()
      .isEmpty()
      .withMessage("accessoryIds is required")
      .isArray()
      .isMongoId()
      .withMessage("accessoryIds must be an array of accessoryId"),
  ];
}

export default Order;

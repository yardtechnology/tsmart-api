import { NextFunction, Response } from "express";
import { body, param } from "express-validator";
import { Types } from "mongoose";
import { io } from "socket.io-client";
import { fieldValidateError, paginationHelper } from "../helper";
import { getDistance } from "../helper/core.helper";
import BillingLogic from "../logic/billing.logic";
import CartLogic from "../logic/cart.logic";
import NotificationLogic from "../logic/notification.logics";
import OrderLogic from "../logic/order.logic";
import StripeLogic from "../logic/stripe.logic";
import { ConfigSchema } from "../models";
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
      let orderData = await super.placeInStoreServiceOrder({
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
      orderData = (await OrderModel?.findByIdAndUpdate(
        orderData?._id,
        {
          billing: billingData?._id,
        },
        { new: true }
      )) as OrderType;

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
      let orderData = await super.placeMailInServiceOrder({
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
      orderData = (await OrderModel?.findByIdAndUpdate(
        orderData?._id,
        {
          billing: billingData?._id,
        },
        { new: true }
      )) as OrderType;

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
      let orderData = await super.placeCallOutOrder({
        userId: req.currentUser?._id as string,
        address: req.body?.address,
        serviceIds: req.body?.serviceIds,
        modelId: req.body?.modelId,
        deviceId: req.body?.deviceId,
        makeId: req.body?.makeId,
        scheduledTime: req?.body?.scheduledTime,
      });
      const billingData = await new BillingLogic().createBill({
        orderIds: orderData?._id,
        status: "PENDING",
        price: orderData?.price,
      });
      orderData = (await OrderModel?.findByIdAndUpdate(
        orderData?._id,
        {
          billing: billingData?._id,
        },
        { new: true }
      )) as OrderType;

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
      res.status(200).json({
        status: "SUCCESS",
        message: "Order details found successfully",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }
  /** get order details*/
  public async getOrderInvoiceController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);

      super.sendInvoiceToMail({
        orderId: req.params.orderId,
        mail: req?.body?.email,
      });

      res.status(200).json({
        status: "SUCCESS",
        message: "Invoice send successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  /** get order details*/
  public async downloadOrderInvoiceController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);

      const data = await super.sendInvoiceToMail({
        orderId: req.params.orderId,
        mail: req?.body?.email,
        isDownload: true,
      });

      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  /** get order details*/
  public async updateOrderDetailsController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);

      const orderData = await super.updateOrderDetails({
        orderId: req.params.orderId,
        faceVideo: req?.files?.faceVideo,
        startImage: req?.files?.startImage,
        endImage: req?.files?.endImage,
      });

      res.status(200).json({
        status: "SUCCESS",
        message: "Order info updated successfully",
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
      const orderPrevData = await OrderModel.findById(orderId);
      if (!orderPrevData) throw new Error("order not found");

      const servicesData = await ServicePriceModel.find({
        _id: { $in: serviceIds },
      }).populate("service");
      const accessoriesData = await ProductModel.find({
        _id: { $in: accessoryIds },
      }).select("-images");
      const updateQuery: any = {};
      servicesData?.length &&
        (updateQuery["extraServices"] = JSON.parse(
          JSON.stringify(servicesData)
        ));
      accessoriesData?.length &&
        (updateQuery["accessory"] = JSON.parse(
          JSON.stringify(accessoriesData)
        ));
      console.log(updateQuery);
      const orderData = await OrderModel.findByIdAndUpdate(
        orderId,
        updateQuery,
        { new: true }
      );
      const accessoryData = orderData?.accessory?.reduce((prev, curr) => {
        prev = prev + curr?.salePrice;
        return prev;
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
      await OrderModel?.findByIdAndUpdate(orderId, {
        extraBilling: extraBilling?._id,
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
      const validETAData = req?.body?.eta
        ? new Date(req.body.eta as string)
        : undefined;
      const orderData = await super.updateOrderStatus({
        orderId: req.params.orderId,
        status: req.body.status as OrderStatus,
        eta: validETAData,
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
      switch (req.body.status?.toString().toUpperCase()) {
        case "DELIVERED":
          new NotificationLogic().pushNotification({
            userIds: [orderData?.user?._id],
            title: "Order Delivered",
            body: `Your order ${orderData?._id} is ${orderData?.status?.replace(
              /_/g,
              " "
            )}`,
          });
          break;
        case "COMPLETED":
          new NotificationLogic().pushNotification({
            userIds: [orderData?.user?._id],
            title: "Order COMPLETED",
            body: `Your order ${orderData?._id} is ${orderData?.status?.replace(
              /_/g,
              " "
            )}`,
          });
          break;
        case "CANCELLED":
          //add product stock
          await ProductModel.findByIdAndUpdate(orderData?.product?._id, {
            $inc: {
              stock: orderData?.quantity,
            },
          });
          new NotificationLogic().pushNotification({
            userIds: [orderData?.user?._id],
            title: "Order Cancelled",
            body: `Your order ${orderData?._id} is ${orderData?.status?.replace(
              /_/g,
              " "
            )}`,
          });
          break;

        default:
          new NotificationLogic().pushNotification({
            userIds: [orderData?.user?._id],
            title: "Order status updated",
            body: `Your order ${orderData?._id} is ${orderData?.status?.replace(
              /_/g,
              " "
            )}`,
          });
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
          break;
      }
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
   * verify otp
   */
  public async verifyOrderOtpController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      const orderData = await OrderModel.findById(req?.params?.orderId);
      if (!orderData) throw new Error("order not found");
      switch (req?.body?.type) {
        case "START_OTP":
          if (orderData?.startOTP?.otp === req?.body?.otp) {
            await OrderModel.findByIdAndUpdate(orderData?._id, {
              "startOTP.verifiedAt": new Date(),
              "startOTP.isVerified": true,
              status:
                req?.currentUser?.role === "TECHNICIAN"
                  ? "TECHNICIAN_REACHED"
                  : "REPAIRING_STATED",
            });
          } else {
            throw new Error("invalid startOtp");
          }
          break;
        case "END_OTP":
          if (orderData?.endOTP?.otp === req?.body?.otp) {
            await OrderModel.findByIdAndUpdate(orderData?._id, {
              "endOTP.verifiedAt": new Date(),
              "endOTP.isVerified": true,
              status: "COMPLETED",
            });
          } else {
            throw new Error("invalid endOtp");
          }
          break;

        default:
          throw new Error("type is required, and must be START_OTP, END_OTP");
      }
      res.status(200).json({
        status: "SUCCESS",
        message: "Order Otp verified Successfully",
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
      let orderData = await super.orderProduct({
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
      await OrderModel.findByIdAndUpdate(
        orderData?._id,
        {
          billing: billingData?._id,
        },
        { new: true }
      );

      res.status(200).json({
        status: "SUCCESS",
        message: "Order placed successfully",
        data: billingData,
      });
    } catch (error) {
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
      OrderModel.updateMany(
        [{ _id: { $in: orderIds } }],
        {
          billing: billingData?._id,
        },
        {
          new: true,
        }
      );

      res.status(200).json({
        status: "SUCCESS",
        message: "Orders placed successfully",
        data: billingData,
      });
    } catch (error) {
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
      const { email, id } = req.body?.paymentToken;
      const { amount, currency, billingId } = req.body;
      const billingData = await BillingModel.findById(billingId).populate(
        "orders"
      );
      if (!billingData) throw new Error("billingData not found");
      const chargedData = await new StripeLogic().paymentSession({
        amount: billingData?.total,
        currency: "INR",
        source: id,
        email,
        name: billingData?.orders[0]?.address?.name,
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
      let orderData = await OrderModel.findOneAndUpdate(
        { _id: { $in: billingData?.orders?.map((item) => item?._id) } },
        { status: billingData?.type !== "EXTRA" ? "INITIATED" : undefined }
      );

      ProductModel.updateMany(
        {
          _id: billingData?.orders?.map((order) => order?.accessory?._id),
        },
        {
          $inc: {
            stock: -1,
          },
        }
      );
      for (const order of billingData?.orders) {
        ProductModel?.findByIdAndUpdate(
          {
            _id: order?.product,
          },
          {
            $inc: {
              stock: -order?.quantity,
            },
          }
        );
      }

      // IF ORDER IS CALLOUT THE SEND REQUEST TO ALL NEAR BY TECHNICIAN
      if (
        billingData?.orders[0]?.serviceType === "CALL_OUT" &&
        billingData?.type !== "EXTRA"
      ) {
        //find all technician nearby
        const allTechnician = await UserModel.find({
          role: "TECHNICIAN",
          deviceType: billingData?.orders[0]?.device?._id,
          makeType: billingData?.orders[0]?.make?._id,
        });
        const nearByTechnicians: string[] = allTechnician
          .filter(
            (user: any) =>
              50 >=
              getDistance(
                billingData?.orders[0]?.address?.latitude as number,
                billingData?.orders[0]?.address?.longitude as number,
                user?.latitude,
                user?.longitude,
                "K"
              )
          )
          .map((user) => user?._id);
        const orderInfo = await OrderModel.findByIdAndUpdate(
          billingData?.orders[0]?._id,
          {
            nearByTechnicians,
          }
        );

        //send socket event to every
        const socket = io(`${process?.env?.SOCKET_URL}/incoming-job`);
        socket.on("connect", () => {
          for (const technicianId of nearByTechnicians) {
            socket.emit("NEW-JOB-REQUEST", {
              technicianId,
            });
          }
        });
      }
      res.status(200).json({
        status: "SUCCESS",
        message: "Order paid Successfully",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }
  /**
   * react-native specific PaymentIntents
   */
  public async reactNativePaymentIntentsController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      //charge amount to the customer\
      const { billingId } = req.body;
      const billingData = await BillingModel.findById(billingId).populate(
        "orders"
      );
      const data = await new StripeLogic().reactNativePaymentIntents({
        amount: billingData?.total as number,
        currency: "INR",
        address: {
          country: billingData?.orders[0]?.address?.country,
          line1: billingData?.orders[0]?.address?.street,
        },
        name: billingData?.orders[0]?.address?.name,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Payment initiated Successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * make order paid
   */
  public async makeOrderPaidController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // validator error handler
      fieldValidateError(req);
      //charge amount to the customer\
      const { billingId, paymentId, clientSecret } = req.body;
      const billingData = await BillingModel.findById(billingId).populate(
        "orders"
      );
      if (!billingData) throw new Error("billingData not found");
      //update payment status on billing
      await BillingModel.findByIdAndUpdate(billingData?._id, {
        status: "PAID",
        metadata: {
          paymentId,
          clientSecret,
        },
      });
      //update payment status on order
      let orderData = await OrderModel.updateMany(
        { _id: { $in: billingData?.orders?.map((item) => item?._id) } },
        { status: billingData?.type !== "EXTRA" ? "INITIATED" : undefined }
      );
      // IF ORDER IS CALLOUT THE SEND REQUEST TO ALL NEAR BY TECHNICIAN
      if (
        billingData?.orders[0]?.serviceType === "CALL_OUT" &&
        billingData?.type !== "EXTRA"
      ) {
        //find all technician nearby
        const allTechnician = await UserModel.find({
          role: "TECHNICIAN",
          deviceType: billingData?.orders[0]?.device?._id,
          makeType: billingData?.orders[0]?.make?._id,
        });
        const nearByTechnicians: string[] = allTechnician
          .filter(
            (user: any) =>
              50 >=
              getDistance(
                billingData?.orders[0]?.address?.latitude as number,
                billingData?.orders[0]?.address?.longitude as number,
                user?.latitude,
                user?.longitude,
                "K"
              )
          )
          .map((user) => user?._id);
        await OrderModel.findByIdAndUpdate(billingData?.orders[0]?._id, {
          nearByTechnicians,
        });
        //send socket event to every
        const socket = io(`${process?.env?.SOCKET_URL}/incoming-job`);
        socket.on("connect", () => {
          for (const technicianId of nearByTechnicians) {
            socket.emit("NEW-JOB-REQUEST", {
              technicianId,
            });
          }
        });
      }
      res.status(200).json({
        status: "SUCCESS",
        message: "Order paid Successfully",
        data: orderData,
      });
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
      const jobRequests = await OrderModel.aggregate([
        {
          $match: {
            nearByTechnicians: new Types.ObjectId(req?.currentUser?._id),
          },
        },
      ]);
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
      switch (req?.body?.type) {
        case "REJECT":
          const orderInfo = await OrderModel.findById(req?.params?.orderId);
          const newTech = orderInfo?.nearByTechnicians?.filter(
            (item) =>
              !(
                item?.toString() === req?.currentUser?._id ||
                item?.toString() === req?.body?.technicianId
              )
          );
          console.log({ newTech });
          const rejectedOrder = await OrderModel.findByIdAndUpdate(
            req?.params?.orderId,
            {
              nearByTechnicians: newTech,
            }
          );
          res.json({
            status: "SUCCESS",
            message: "Job requests rejected successfully",
            data: rejectedOrder,
          });
          break;

        default:
          const technicianData = await UserModel.findById(
            req?.currentUser?._id || req?.body?.technicianId
          ).select(
            "displayName phoneNumber country avatar email gender role reviews"
          );
          if (!technicianData) throw new Error("Technician not found");

          const jobRequests = await OrderModel.findByIdAndUpdate(
            req?.params?.orderId,
            {
              nearByTechnicians: [],
              technicianID: technicianData?._id,
              technician: technicianData,
              status: "TECHNICIAN_ASSIGNED",
            }
          );
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
          break;
      }
    } catch (error) {
      next(error);
    }
  }
  /**
   * get stores all orders
   * @param req
   * @param res
   * @param next
   */
  public async getAllOrdersController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      let query = {
        status:
          req?.query.status?.toString()?.toUpperCase() === "ONGOING"
            ? {
                $nin: ["PENDING", "COMPLETED", "CANCELLED", "DELIVERED"],
              }
            : req.query.status?.toString()?.toUpperCase(),
        userID: req?.currentUser?._id,
        storeID: req.currentUser?.store,
        technicianID: req.currentUser?._id,
        serviceType: req?.query?.serviceType,
        type: req?.query?.type
          ? {
              $in: Array.isArray(req?.query?.type)
                ? req?.query?.type
                : [req?.query?.type],
            }
          : undefined,
      };
      !req?.query?.status && delete query?.status;
      !req.query.serviceType && delete query?.serviceType;
      req?.currentUser?.role !== "MANAGER" && delete query?.storeID;
      req?.currentUser?.role !== "TECHNICIAN" && delete query?.technicianID;
      req?.currentUser?.role !== "USER" && delete query?.userID;
      !req.query.type && delete query?.type;
      const orderData = await paginationHelper({
        model: OrderModel,
        query,
        sort: { createdAt: -1 },
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
      });

      res.json({
        status: "SUCCESS",
        message: "Orders found successfully",
        data: orderData,
      });
    } catch (error) {
      next(error);
    }
  }
  /**
   * order cancelation
   */
  public async orderCancelationController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const configData = await ConfigSchema.findOne({});
      // orderCancelTime is in minutes
      let orderData = await OrderModel?.findById(req?.params?.orderId);
      if (!orderData) throw new Error("Order not found");
      const orderPlacedTime =
        new Date().getTime() -
        new Date(orderData?.createdAt).getTime() / (1000 * 60);
      if (configData?.orderCancelTime) {
        if (orderPlacedTime >= configData?.orderCancelTime)
          throw new Error(
            "Order cannot be canceled after order cancelation time has passed"
          );
      }
      orderData = await OrderModel.findByIdAndUpdate(req?.params?.orderId, {
        status: "CANCELLED",
      });
      BillingModel.updateMany(
        { orders: orderData?._id },
        {
          status: "CANCELLED",
        }
      );
      res.json({
        status: "SUCCESS",
        message: "Orders cancelled successfully",
        data: orderData,
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
      .withMessage("modelId is required")
      .isMongoId()
      .withMessage("modelId must be a valid modelId"),
    body("makeId")
      .not()
      .isEmpty()
      .withMessage("makeId is required")
      .isMongoId()
      .withMessage("makeId must be a valid makeId"),
    body("deviceId")
      .not()
      .isEmpty()
      .withMessage("deviceId is required")
      .isMongoId()
      .withMessage("deviceId must be a valid deviceId"),
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
      .withMessage("modelId is required")
      .isMongoId()
      .withMessage("modelId must be a valid modelId"),
    body("makeId")
      .not()
      .isEmpty()
      .withMessage("makeId is required")
      .isMongoId()
      .withMessage("makeId must be a valid makeId"),
    body("deviceId")
      .not()
      .isEmpty()
      .withMessage("deviceId is required")
      .isMongoId()
      .withMessage("deviceId must be a valid deviceId"),
  ];
  public validateCallOutOrderPlaceFields = [
    body("address.latitude")
      .not()
      .isEmpty()
      .withMessage("latitude is required"),
    body("address.longitude")
      .not()
      .isEmpty()
      .withMessage("longitude is required"),
    body("address.city")
      .optional()
      .isLength({ min: 3 })
      .withMessage("City must be at least 3 characters long")
      .isLength({ max: 21 })
      .withMessage("City must be at most 21 characters long"),
    body("address.houseNumber")
      .optional()
      .isLength({ min: 3 })
      .withMessage("houseNumber must be at least 3 characters long")
      .isLength({ max: 21 })
      .withMessage("houseNumber must be at most 21 characters long"),
    body("address.state")
      .optional()
      .isLength({ min: 3 })
      .withMessage("State must be at least 3 characters long")
      .isLength({ max: 25 })
      .withMessage("State must be at most 25 characters long"),
    body("address.country")
      .not()
      .isEmpty()
      .withMessage("country is required")
      .isLength({ min: 2 })
      .withMessage("Country must be at least 2 characters long")
      .isLength({ max: 25 })
      .withMessage("Country must be at most 25 characters long"),
    body("address.zip")
      .optional()
      .isInt()
      .isLength({ min: 5 })
      .withMessage("zip code must be grater then 5 digit")
      .isLength({ max: 11 })
      .withMessage("zip code must be at most 11 digit"),
    body("serviceIds.*")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("serviceIds must be a valid service id"),
    body("modelId")
      .not()
      .isEmpty()
      .withMessage("modelId is required")
      .isMongoId()
      .withMessage("modelId must be a valid modelId"),
    body("makeId")
      .not()
      .isEmpty()
      .withMessage("makeId is required")
      .isMongoId()
      .withMessage("makeId must be a valid makeId"),
    body("scheduledTime")
      .not()
      .isEmpty()
      .withMessage("Scheduled time is required"),
    body("deviceId")
      .not()
      .isEmpty()
      .withMessage("deviceId is required")
      .isMongoId()
      .withMessage("deviceId must be a valid deviceId"),
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
    body("paymentToken.id")
      .not()
      .isEmpty()
      .withMessage("paymentToken.id is required"),
    body("paymentToken.email")
      .not()
      .isEmpty()
      .withMessage("paymentToken.email is required"),
    // body("amount").not().isEmpty().withMessage("amount is required"),
    // body("currency").not().isEmpty().withMessage("currency is required"),
  ];

  public validateAcceptJobRequestFields = [
    body("type")
      .not()
      .isEmpty()
      .withMessage("type must be required.")
      .isIn(["ACCEPT", "REJECT"])
      .withMessage("type must be ACCEPT, REJECT"),
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
      .if((value: string, { req }: any) => {
        return req?.body?.paymentMethod === "CHEQUE";
      })
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
      .optional()
      .isArray()
      .isMongoId()
      .withMessage("serviceIds must be an array of serviceId"),
    body("accessoryIds")
      .optional()
      .isArray()
      .isMongoId()
      .withMessage("accessoryIds must be an array of accessoryId"),
  ];
  public validateGetOrderInvoice = [
    body("email")
      .not()
      .isEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("please enter a valid email"),
  ];
}

export default Order;

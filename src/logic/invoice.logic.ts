import { OrderModel } from "../models/order.model";
import OrderType from "../types/order";

class InvoiceLogic {
  /**
   * create coupon
   */
  public async getInvoiceHTML({ orderId }: { orderId: string }): Promise<{
    invoiceHTML: string;
    orderData: OrderType;
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const orderInfo = await OrderModel.findById(orderId).populate([
          {
            path: "user",
          },
          {
            path: "billing",
            populate: {
              path: "orders",
            },
          },
        ]);
        if (!orderInfo) throw new Error("Order not found");

        const subTotal = orderInfo?.billing?.orders?.reduce(
          (acc, curr) => (acc += curr?.totalPrice),
          0
        );

        const commonTemplet = `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>invoiceThree</title>
                    <link rel="stylesheet" href="invoice.css" />
                    <style>
                      * {
                        padding: 0%;
                        margin: 0%;
                        box-sizing: border-box;
                        font-family: Arial, Helvetica, sans-serif;
                      }
                
                      .container {
                        width: 100%;
                        max-width: 860px;
                        /* height: 100vh; */
                        padding: 0.5rem;
                        margin: auto;
                      }
                      table {
                        border-collapse: collapse;
                      }
                      .table_one {
                        height: 100%;
                        width: 100%;
                        background-color: white;
                        padding-top: 1rem;
                        padding-bottom: 1rem;
                      }
                
                      .img_one {
                        width: 100%;
                        max-width: 11rem;
                        padding: 1rem;
                        /* margin-left: 2rem; */
                      }
                
                      #td_2 {
                        /* float: right; */
                        /* margin-right: 2rem; */
                        /* background-color: #065934; */
                        color: white;
                        /* padding: 10px; */
                      }
                      .invoiceIdWarper {
                        background-color: #065934;
                        width: 100%;
                        padding: 1rem;
                      }
                      #td_3 {
                        background: #000;
                        width: 100%;
                        height: 1px;
                      }
                
                      #td_3 p {
                        font-size: 1px;
                      }
                
                      .td_5 {
                        float: left;
                        padding-left: 2rem;
                        padding-top: 1rem;
                        padding-bottom: 0.5rem;
                      }
                
                      .td_4 {
                        padding-left: 2rem;
                        padding-top: 1rem;
                        padding-bottom: 0.5rem;
                      }
                
                      #td_6 {
                        padding-left: 2rem;
                        padding-bottom: 0.5rem;
                        color: #065934;
                      }
                
                      #td_7 {
                        float: left;
                        padding-left: 2rem;
                        padding-bottom: 0.5rem;
                        color: #065934;
                      }
                
                      #td_8 {
                        padding-left: 2rem;
                        padding-bottom: 0.5rem;
                      }
                
                      #td_9 {
                        float: left;
                        padding-left: 2rem;
                        padding-bottom: 0.5rem;
                      }
                
                      #td_10 {
                        padding-left: 2rem;
                        padding-bottom: 0.5rem;
                      }
                
                      #td_11 {
                        float: left;
                        padding-left: 2rem;
                        padding-bottom: 0.5rem;
                      }
                
                      #td_12 {
                        padding-left: 2rem;
                        padding-bottom: 0.5rem;
                      }
                
                      #td_13 {
                        float: left;
                        padding-left: 2rem;
                        padding-bottom: 0.5rem;
                      }
                
                      #td_17 {
                        padding-left: 2rem;
                        padding-bottom: 0.5rem;
                        padding-top: 0.5rem;
                      }
                
                      #td_19 {
                        padding-left: 2rem;
                        padding-bottom: 0.5rem;
                      }
                
                      #td_18 {
                        float: left;
                        padding-left: 2rem;
                        padding-bottom: 0.5rem;
                        padding-top: 0.5rem;
                      }
                
                      #td_14 {
                        padding-left: 2rem;
                        padding-bottom: 1rem;
                        padding-top: 1rem;
                      }
                
                      #td_15 {
                        float: left;
                        padding-left: 2rem;
                        padding-bottom: 1rem;
                        padding-top: 1rem;
                      }
                
                      #td_16 {
                        background-color: black;
                        width: 100%;
                        width: 1px;
                        font-size: 1px;
                      }
                
                      .table_two {
                        height: 100%;
                        width: 100%;
                        background-color: white;
                        padding-top: 1rem;
                        padding-bottom: 1rem;
                      }
                
                      .description {
                        width: 40%;
                      }
                
                      #td-1 {
                        padding-left: 2rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        background: #065934;
                        color: white;
                        text-align: start;
                      }
                
                      #td-2 {
                        padding-left: 2rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        background: #065934;
                        color: white;
                        text-align: start;
                      }
                
                      #td-3 {
                        padding-left: 2rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        background: #065934;
                        color: white;
                        text-align: start;
                      }
                
                      #td-4 {
                        padding-left: 2rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        background: #065934;
                        color: white;
                        text-align: start;
                      }
                
                      #td-5 {
                        padding-left: 2rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        background: #065934;
                        color: white;
                        text-align: start;
                      }
                      .img_two {
                        height: 2.5rem;
                        width: 2.5rem;
                      }
                
                      #td-6 {
                        padding-left: 2rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                      }
                
                      #td-7 {
                        padding-left: 2rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                      }
                
                      #td-8 {
                        padding-left: 2rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                      }
                
                      #td-9 {
                        padding-left: 2rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                      }
                
                      #td-10 {
                        padding-left: 2rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                      }
                
                      #td-11 {
                        padding-left: 2rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                      }
                
                      #td-12 {
                        padding-left: 2rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                      }
                
                      #td-13 {
                        padding-left: 2rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                      }
                
                      #td-14 {
                        padding-left: 2rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                      }
                
                      #td-15 {
                        padding-left: 2rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                      }
                      .border {
                        background: #000;
                        width: 100%;
                        height: 1px;
                        font-size: 1px;
                      }
                      .heading {
                        background: #065934;
                      }
                      .table_head {
                        padding-left: 2rem;
                        text-align: start;
                        width:50%;
                      }
                      .table_three {
                        width: 100%;
                      }
                      .table_body {
                        padding-left: 2rem;
                        padding-top: 0.5rem;
                      }
                      .table_span {
                        padding: 5px;
                        border: 1px solid black;
                      }
                      #sign {
                        text-align: end;
                        padding-top: 7rem;
                        padding-bottom: 1rem;
                        padding-right: 2rem;
                      }
                      .finalCalc{
                        font-size: 1rem;
                        margin: 1em 0em 2em 0em;
                      }
                    </style>
                  </head>
                
                  <body>
                    <div class="container">
                      <table class="table_one">
                        <tr class="tr_one">
                          <td id="td_1">
                            <img
                              src="${process.env.LOGO_URL}"
                              alt=""
                              class="img_one"
                            />
                          </td>
                          <td id="td_2">
                            <div class="invoiceIdWarper">
                              <h1>INVOICE</h1>
                              <p>INVOICE NO: ${orderInfo?.billing?._id}</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" id="td_3">
                            <p>.</p>
                          </td>
                        </tr>
                        <tr>
                          <td class="td_4" style="text-transform: uppercase">
                            <h3>supplier :</h3>
                          </td>
                          <td class="td_5" style="text-transform: uppercase">
                            <h3>Client :</h3>
                          </td>
                        </tr>
                        <tr>
                          <td id="td_6">
                            
                          </td>
                          <td id="td_7">
                            <h3>${orderInfo?.address?.name}</h3>
                            ${
                              orderInfo?.address?.street
                                ? `<b>${orderInfo?.address?.street}, </b>`
                                : ""
                            }
                            ${
                              orderInfo?.address?.landmark
                                ? `<b>${orderInfo?.address?.landmark}, </b>`
                                : ""
                            }
                            ${
                              orderInfo?.address?.city
                                ? `<b>${orderInfo?.address?.city}, </b>`
                                : ""
                            }
                            ${
                              orderInfo?.address?.state
                                ? `<b>${orderInfo?.address?.state}, </b>`
                                : ""
                            }
                            ${
                              orderInfo?.address?.country
                                ? `<b>${orderInfo?.address?.country}, </b>`
                                : ""
                            }
                            ${
                              orderInfo?.address?.email
                                ? `<b>${orderInfo?.address?.email}, </b>`
                                : ""
                            }
                            <b>+${
                              (orderInfo?.address?.country,
                              orderInfo?.address?.phoneNumber)
                            }</b>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" id="td_16">.</td>
                        </tr>
                        <tr>
                          <td id="td_17">
                            <p><b>Payment Method : </b>ONLINE</p>
                          </td>
                          <td id="td_18">
                            <p><b>Issue Date : </b>${
                              new Date(orderInfo?.billing?.createdAt)
                                ?.toLocaleString()
                                .split(",")[0]
                            }</p>
                          </td>
                        </tr>
                        <tr>
                          <td id="td_19">
                            <p><b>Order Number : </b>${orderInfo?._id}</p>
                          </td>
                        </tr>
                      </table>
                      <table class="table_two">
                        <tr class="heading">
                          <th id="td-1">
                            <b>Item</b>
                          </th>
                          <th class="description" id="td-2">Description</th>
                          <th id="td-3">Price</th>
                          <th id="td-4">Quantity</th>
                          <th id="td-5">Total</th>
                        </tr>
                        <!-- item start -->
                        ${orderInfo?.billing?.orders?.map(
                          (order: OrderType) =>
                            `<tr>
                            <td id="td-6">
                              <img src="${
                                order.product?.displayImage?.url
                              }" alt="" class="img_two" />
                            </td>
                            <td class="description" id="td-7">
                              <p>
                                ${order?.product?.shortDescription}
                              </p>
                            </td>
                            <td id="td-8">${order.product?.salePrice?.toLocaleString(
                              "en-IN",
                              { style: "currency", currency: "INR" }
                            )}/-</td>
                            <td id="td-9">${order?.quantity}</td>
                            <td id="td-10">${order?.totalPrice?.toLocaleString(
                              "en-IN",
                              { style: "currency", currency: "INR" }
                            )}/-</td>
                          </tr>
                          <tr>
                            <td colspan="5" class="border">.</td>
                          </tr>`
                        )}
                        <!-- item end -->
                      </table>
                      <table class="table_three finalCalc">
                        <tr>
                          <th class="table_head headId">
                          </th>
                          <th class="table_head">
                            <h4>SubTotal</h4>
                            <p style="font-size: 0.8rem;">(Tax ${orderInfo?.billing?.tax?.toLocaleString(
                              "en-IN",
                              { style: "currency", currency: "INR" }
                            )}/-)</p>
                          </th>
                          <th class="table_head">
                            <h4>${subTotal.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}/-</h4>
                          </th>
                        </tr>
                        
                        <tr>
                        ${
                          orderInfo?.billing?.couponDiscount?.benefitAmount
                            ? `<th class="table_head headId">
                          </th>
                          <td class="table_body">
                            <h4>Coupon Discount</h4>
                          </td>
                          <td class="table_body">
                            <h4>${orderInfo?.billing?.couponDiscount?.benefitAmount.toLocaleString(
                              "en-IN",
                              { style: "currency", currency: "INR" }
                            )}/-</h4>
                          </td>
                        </tr>`
                            : ``
                        }
                        <tr>
                        <th class="table_head headId">
                        </th>
                          <td class="table_body">
                            <h4>Total</h4>
                          </td>
                          <td class="table_body">
                            <h4>${orderInfo?.billing?.total.toLocaleString(
                              "en-IN",
                              { style: "currency", currency: "INR" }
                            )}/-</h4>
                          </td>
                        </tr>
                      </table>
                      <table style="width: 100%; text-align: center">
                        <tr>
                          <td style="width: 30%">
                            <hr style="background-color: black" />
                          </td>
                          <td style="border: 1px solid black; padding: 5px">
                            Thank You
                          </td>
                          <td style="width: 30%">
                            <hr style="background-color: black" />
                          </td>
                        </tr>
                      </table>
                    </div>
                  </body>
                </html>
                `;
        resolve({
          invoiceHTML: commonTemplet,
          orderData: orderInfo,
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default InvoiceLogic;

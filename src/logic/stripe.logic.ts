import Stripe from "stripe";
import AddressType from "../types/address";

class StripeLogic {
  /**
   * payment
   */

  public paymentSession(Props: {
    amount: number;
    email: string;
    source: string;
    currency: string;
    name: string;
    address: {
      line1?: string;
      postal_code?: string;
      city?: string;
      state?: string;
      country?: string;
    };
  }): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const stripe = new Stripe(process.env.STRIPE_KEY as string, {
          apiVersion: "2022-08-01",
        });
        const stripeCustomerData = await stripe.customers.create({
          email: Props?.email,
          source: Props?.source,
          name: Props?.name,
          address: Props?.address,
          shipping: {
            address: Props?.address,
            name: Props?.name,
          },
        });
        console.log({ stripeCustomerData });
        const stripeChargeData = await stripe.charges.create({
          amount: Props.amount, // Charging Rs 25
          description: "tSmart Payment",
          currency: Props.currency,
          customer: stripeCustomerData.id,
          receipt_email: Props.email,
          shipping: {
            name: Props?.name,
            address: Props.address,
          },
        });
        console.log(stripeChargeData);
        if (stripeChargeData?.status !== "succeeded")
          throw new Error(
            "Something went wrong when creating the stripeCharge "
          );
        resolve(stripeChargeData);
      } catch (error) {
        reject(error);
      }
    });
  }
  public async reactNativePaymentIntents({
    amount,
    currency,
    address,
    name,
  }: {
    amount: number;
    currency: string;
    address: Partial<AddressType>;
    name: string;
  }) {
    // Use an existing Customer ID if this is a returning customer.
    const stripe = new Stripe(process.env.STRIPE_KEY as string, {
      apiVersion: "2022-08-01",
    });
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2022-08-01" }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency,
      customer: customer.id,
      shipping: {
        name: name,
        address,
      },
      payment_method_types: ["card"],
    });

    return {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: process?.env?.PUBLISHABLE_KEY,
    };
  }
}

export default StripeLogic;

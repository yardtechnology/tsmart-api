import Stripe from "stripe";

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
          // address: {
          //   line1: "TC 9/4 Old MES colony",
          //   postal_code: "452331",
          //   city: "Indore",
          //   state: "Madhya Pradesh",
          //   country: "United Kingdom",
          // },
          // shipping: {
          //   address: {
          //     line1: "TC 9/4 Old MES colony",
          //     postal_code: "452331",
          //     city: "Indore",
          //     state: "Madhya Pradesh",
          //     country: "United Kingdom",
          //   },
          //   name: "Lalit sekhar behera",
          // },
        });
        console.log({ stripeCustomerData });
        const stripeChargeData = await stripe.charges.create({
          amount: Props.amount, // Charging Rs 25
          description: "Web Development Product",
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
}

export default StripeLogic;

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
  }): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const stripe = new Stripe(
          "sk_test_ynNJNFQPgl35riWoTTRrYkrV00nXAXJieo",
          {
            apiVersion: "2022-08-01",
          }
        );
        const stripeCustomerData = await stripe.customers.create({
          email: Props?.email,
          source: Props?.source,
          name: "Lalit sekhar behera",
          // address: {
          //   line1: "TC 9/4 Old MES colony",
          //   postal_code: "452331",
          //   city: "Indore",
          //   state: "Madhya Pradesh",
          //   country: "India",
          // },
        });
        console.log({ stripeCustomerData });
        const stripeChargeData = await stripe.charges.create({
          amount: Props.amount, // Charging Rs 25
          description: "Web Development Product",
          currency: Props.currency,
          customer: stripeCustomerData.id,
        });
        console.log(stripeChargeData);
        resolve(stripeChargeData);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default StripeLogic;

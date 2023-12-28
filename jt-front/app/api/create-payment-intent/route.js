const stripe = require('stripe')(process.env.STRIPE_API_KEY)

export async function POST(request) {
    const {total} = await request.json()

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "kmf",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });


    return Response.json({clientSecret: paymentIntent.client_secret})
}
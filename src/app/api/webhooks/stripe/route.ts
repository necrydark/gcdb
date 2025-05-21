// app/api/webhooks/stripe/route.ts
import db from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req: NextRequest) {
  const buf = await req.text(); // Read raw body as text
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig!, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ message: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      const subscriptionId = checkoutSession.subscription as string;
      const customerId = checkoutSession.customer as string;
      const userId = checkoutSession.metadata?.userId;

      if (!userId) {
        console.warn("Checkout session completed without userId in metadata.");
        break;
      }

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const priceId = subscription.items.data[0]?.price.id;
      const currentPeriodEnd = new Date(subscription.items.data[0].current_period_end * 1000);

      await db.user.update({
        where: { id: userId },
        data: {
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          stripePriceId: priceId,
          stripeCurrentEndPeriod: currentPeriodEnd,
          subscriptionStatus: subscription.status,
        },
      });
      break;

    case "customer.subscription.updated":
      const updatedSubscription = event.data.object as Stripe.Subscription;
      const updatedCustomerId = updatedSubscription.customer as string;
      const updatedPriceId = updatedSubscription.items.data[0]?.price.id;
      const updatedCurrentPeriodEnd = new Date(updatedSubscription.items.data[0]?.current_period_end * 1000);

      const userToUpdate = await db.user.findFirst({
        where: { stripeCustomerId: updatedCustomerId },
      });

      if (userToUpdate) {
        await db.user.update({
          where: { id: userToUpdate.id },
          data: {
            stripeSubscriptionId: updatedSubscription.id,
            stripePriceId: updatedPriceId,
            stripeCurrentEndPeriod: updatedCurrentPeriodEnd,
            subscriptionStatus: updatedSubscription.status,
          },
        });
      }
      break;

    case "customer.subscription.deleted":
      const deletedSubscription = event.data.object as Stripe.Subscription;
      const deletedCustomerId = deletedSubscription.customer as string;

      const userToDeleteSubscription = await db.user.findFirst({
        where: { stripeCustomerId: deletedCustomerId },
      });

      if (userToDeleteSubscription) {
        await db.user.update({
          where: { id: userToDeleteSubscription.id },
          data: {
            stripeSubscriptionId: null,
            stripePriceId: null,
            stripeCurrentEndPeriod: null,
            subscriptionStatus: "canceled",
          },
        });
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
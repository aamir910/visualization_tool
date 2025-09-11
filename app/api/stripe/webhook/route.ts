
import Stripe from "stripe";
import { NextResponse } from "next/server";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const buf = await req.arrayBuffer();
  const sig = req.headers.get("stripe-signature")!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(Buffer.from(buf), sig, endpointSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("Payment completed for:", session.customer_email);
    // Save subscription info to Supabase here
  }

  return NextResponse.json({ received: true });
}

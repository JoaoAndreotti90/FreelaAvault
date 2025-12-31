import { db } from "@/lib/db"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {
  const body = await req.text()
  
  const headerList = await headers()
  const signature = headerList.get("Stripe-Signature") as string

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
    typescript: true,
  })

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    return new NextResponse("Webhook Error", { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    if (!session?.metadata?.userId || !session?.metadata?.projectId) {
      return new NextResponse("Webhook Error: Missing Metadata", { status: 400 })
    }

    await db.purchase.create({
      data: {
        clientId: session.metadata.userId,
        projectId: session.metadata.projectId,
        stripeSessionId: session.id,
        status: "PAID",
      },
    })
  }

  return new NextResponse(null, { status: 200 })
}
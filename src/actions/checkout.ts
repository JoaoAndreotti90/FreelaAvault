"use server"

import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Stripe from "stripe"

export async function buyProject(formData: FormData) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user?.id) {
    redirect("/login")
  }

  const projectId = formData.get("projectId") as string
  const project = await db.project.findUnique({
    where: { id: projectId },
  })

  if (!project) {
    throw new Error("Project not found")
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
    typescript: true,
  })

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: session.user.email!,
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: project.name,
            description: project.description,
          },
          unit_amount: Math.round(Number(project.price) * 100),
        },
        quantity: 1,
      },
    ],
    metadata: {
      projectId: project.id,
      userId: session.user.id,
    },
    success_url: `${process.env.NEXTAUTH_URL}/?success=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/`,
  })

  if (checkoutSession.url) {
    redirect(checkoutSession.url)
  }
}
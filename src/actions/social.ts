"use server"

import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function createReview(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.id) return { error: "Faça login para avaliar." }

  const projectId = formData.get("projectId") as string
  const rating = Number(formData.get("rating"))
  const comment = formData.get("comment") as string

  const hasPurchased = await db.purchase.findFirst({
    where: {
      clientId: session.user.id,
      projectId: projectId,
      status: "PAID"
    }
  })

  if (!hasPurchased) {
    return { error: "Você precisa comprar o produto para avaliar." }
  }

  await db.review.create({
    data: {
      rating,
      comment,
      projectId,
      userId: session.user.id
    }
  })

  revalidatePath(`/project/${projectId}`)
  return { success: true }
}

export async function updateBio(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.id) return { error: "Não autorizado" }

  const bio = formData.get("bio") as string

  await db.user.update({
    where: { id: session.user.id },
    data: { bio }
  })

  revalidatePath(`/u/${session.user.id}`)
  revalidatePath("/dashboard")
  return { success: true }
}
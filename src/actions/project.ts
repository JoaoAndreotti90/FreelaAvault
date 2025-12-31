"use server"

import { put } from "@vercel/blob"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function createProject(formData: FormData) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user?.id) {
    redirect("/login")
  }

  const file = formData.get("file") as File
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = formData.get("price") as string

  if (!file || !name || !price) {
    throw new Error("Missing fields")
  }

  const blob = await put(file.name, file, {
    access: "public",
  })

  await db.project.create({
    data: {
      name,
      description,
      price: Number(price),
      fileUrl: blob.url,
      freelancerId: session.user.id,
    },
  })

  redirect("/")
}
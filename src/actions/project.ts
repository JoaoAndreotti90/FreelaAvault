"use server"

import { put } from "@vercel/blob"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function createProject(formData: FormData) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user?.id) {
    redirect("/login")
  }

  const mainFile = formData.get("file") as File
  const imageFile = formData.get("image") as File 

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = formData.get("price") as string

  if (!mainFile || !imageFile || !name || !price) {
    throw new Error("Preencha todos os campos obrigatórios.")
  }

  const imageBlob = await put(`covers/${imageFile.name}`, imageFile, {
    access: "public",
  })

  const fileBlob = await put(`projects/${mainFile.name}`, mainFile, {
    access: "public",
  })

  await db.project.create({
    data: {
      name,
      description,
      price: Number(price),
      fileUrl: fileBlob.url,
      imageUrl: imageBlob.url, 
      freelancerId: session.user.id,
    },
  })

  revalidatePath("/")
  revalidatePath("/dashboard")

  return { success: true }
}

export async function deleteProject(projectId: string) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.id) return { error: "Não autorizado." }
  
  const project = await db.project.findUnique({ where: { id: projectId } })
  if (!project || project.freelancerId !== session.user.id) return { error: "Sem permissão." }
  
  await db.project.delete({ where: { id: projectId } })
  
  revalidatePath("/")
  revalidatePath("/dashboard")
  return { success: true }
}

export async function updateProject(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.id) return { error: "Não autorizado." }
  
  const projectId = formData.get("projectId") as string
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = formData.get("price") as string
  const imageFile = formData.get("image") as File

  const project = await db.project.findUnique({ where: { id: projectId } })
  if (!project || project.freelancerId !== session.user.id) return { error: "Sem permissão." }

  let imageUrl = project.imageUrl

  if (imageFile && imageFile.size > 0) {
    const imageBlob = await put(`covers/${imageFile.name}`, imageFile, {
      access: "public",
    })
    imageUrl = imageBlob.url
  }
  
  await db.project.update({
    where: { id: projectId },
    data: { 
      name, 
      description, 
      price: Number(price),
      imageUrl: imageUrl
    }
  })
  
  revalidatePath("/")
  revalidatePath("/dashboard")
  revalidatePath(`/project/${projectId}`)
  
  return { success: true }
}
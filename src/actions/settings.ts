"use server"

import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function deleteAccount() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    throw new Error("Não autorizado")
  }

  await db.account.deleteMany({
    where: { userId: session.user.id }
  })

  await db.user.update({
    where: { id: session.user.id },
    data: {
      name: "Usuário Excluído",
      email: `deleted-${session.user.id}@excluido.com`, 
      image: null,
      password: null,
      emailVerified: null,
    }
  })

  return { success: true }
}
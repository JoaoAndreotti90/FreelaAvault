"use server"

import { db } from "@/lib/db"
import { registerSchema, RegisterInput } from "@/lib/schemas"
import { hash } from "bcryptjs"

export async function registerUser(data: RegisterInput) {
  const result = registerSchema.safeParse(data)

  if (!result.success) {
    return { success: false, error: "Dados inválidos" }
  }

  const { name, email, password } = result.data

  const existingUser = await db.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { success: false, error: "Este e-mail já está cadastrado" }
  }

  const hashedPassword = await hash(password, 10)

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return { success: true }
}
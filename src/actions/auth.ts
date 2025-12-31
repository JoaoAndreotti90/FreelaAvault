"use server"

import { db } from "@/lib/db"
import { registerSchema, RegisterInput } from "@/lib/schemas"
import { hash } from "bcryptjs"

export async function registerUser(data: RegisterInput) {
  const result = registerSchema.safeParse(data)

  if (!result.success) {
    return { success: false, error: "Invalid data" }
  }

  const { name, email, password } = result.data

  const existingUser = await db.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { success: false, error: "User already exists" }
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
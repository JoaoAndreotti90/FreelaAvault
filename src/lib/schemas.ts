import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Insira um e-mail válido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
})

export type RegisterInput = z.infer<typeof registerSchema>
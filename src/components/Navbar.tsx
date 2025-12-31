"use client"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="border-b bg-white p-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-black">
          FreelaVault
        </Link>

        <div className="flex items-center gap-6">
          {session ? (
            <>
              <Link href="/orders" className="text-sm font-medium text-gray-600 hover:text-black">
                Meus Pedidos
              </Link>
              <div className="flex items-center gap-4 border-l pl-4">
                <span className="text-sm text-gray-600">
                  {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium text-red-600 hover:text-red-800"
                >
                  Sair
                </button>
              </div>
            </>
          ) : (
            <Link href="/login" className="text-sm font-medium text-black">
              Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
"use client"

import { useState } from "react"
import Link from "next/link"
import SignOutButton from "./SignOutButton"

export default function MobileMenu({ session }: { session: any }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-black focus:outline-none"
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-16 border-b border-gray-100 bg-white p-4 shadow-xl animate-in slide-in-from-top-5">
          <div className="flex flex-col space-y-4">
            {session ? (
              <>
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">{session.user?.name}</span>
                  </div>
                </div>

                <Link 
                  href="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Ir para Dashboard
                </Link>

                <div className="px-4">
                   <SignOutButton />
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Entrar
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg bg-black px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-800"
                >
                  Criar Conta
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
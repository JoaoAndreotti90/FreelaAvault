"use client"

import { signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

export default function SignOutButton() {
  const [showModal, setShowModal] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
      >
        Sair
      </button>

      {showModal && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-center">
            
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900">Sair da conta?</h3>
            <p className="text-sm text-gray-500 mt-2 mb-6">
              Você precisará fazer login novamente para acessar seus projetos.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors shadow-sm"
              >
                Sair Agora
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
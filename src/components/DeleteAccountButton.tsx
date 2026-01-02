"use client"

import { deleteAccount } from "@/actions/settings"
import { signOut } from "next-auth/react"
import { useState } from "react"

export default function DeleteAccountButton() {
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  async function handleDelete() {
    setLoading(true)
    try {
      await deleteAccount()
      await signOut({ callbackUrl: "/" })
    } catch (error) {
      alert("Erro ao excluir conta.")
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <div className="mt-12 border-t pt-6">
        <h3 className="text-lg font-bold text-red-600 mb-2">Zona de Perigo</h3>
        <p className="text-sm text-gray-500 mb-4">
          Excluir sua conta removerá seus dados de acesso. Seus produtos continuarão acessíveis para quem já comprou.
        </p>
        
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors"
        >
          Excluir Minha Conta
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold text-gray-900">Tem certeza absoluta?</h2>
            
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              Essa ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados de acesso.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              
              <button
                onClick={handleDelete}
                disabled={loading}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-70 transition-colors"
              >
                {loading ? "Excluindo..." : "Sim, excluir conta"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
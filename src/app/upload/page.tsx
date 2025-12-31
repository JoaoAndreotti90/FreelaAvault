"use client"

import { createProject } from "@/actions/project"
import Navbar from "@/components/Navbar"

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto max-w-xl p-8">
        <h1 className="mb-8 text-3xl font-bold">Vender Projeto</h1>

        <form action={createProject} className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome do Projeto</label>
            <input
              name="name"
              type="text"
              required
              placeholder="Ex: Dashboard Financeiro em React"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              name="description"
              required
              placeholder="Descreva o que seu código faz..."
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Preço (R$)</label>
            <input
              name="price"
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Arquivo do Projeto</label>
            <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 transition-colors hover:bg-gray-50">
              <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 hover:text-gray-500"
                  >
                    <input
                      id="file-upload"
                      name="file"
                      type="file"
                      required
                      className="block w-full text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-800"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">Zip, Rar, PDF ou Code</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-black px-4 py-3 font-bold text-white transition hover:bg-gray-800"
          >
            Publicar Projeto
          </button>
        </form>
      </div>
    </main>
  )
}
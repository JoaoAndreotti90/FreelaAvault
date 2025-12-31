import { db } from "@/lib/db"
import Navbar from "@/components/Navbar"
import Link from "next/link"
import { buyProject } from "@/actions/checkout"

export default async function Home() {
  const projects = await db.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      freelancer: true,
    },
  })

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Projetos Recentes</h1>
          <Link
            href="/upload"
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Vender Projeto
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm">
              <div>
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                  {project.description}
                </p>
                <p className="mt-4 text-xs text-gray-400">
                  Vendido por: {project.freelancer.name || "Anônimo"}
                </p>
              </div>
              
              <div className="mt-6 flex items-center justify-between border-t pt-4">
                <span className="text-lg font-bold text-green-600">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(project.price))}
                </span>
                
                <form action={buyProject}>
                  <input type="hidden" name="projectId" value={project.id} />
                  <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Comprar
                  </button>
                </form>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="col-span-full py-10 text-center text-gray-500">
              Nenhum projeto encontrado. Seja o primeiro a vender!
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
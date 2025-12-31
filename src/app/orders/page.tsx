import { db } from "@/lib/db"
import Navbar from "@/components/Navbar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function OrdersPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user?.id) {
    redirect("/login")
  }

  const purchases = await db.purchase.findMany({
    where: {
      clientId: session.user.id,
      status: "PAID",
    },
    include: {
      project: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto max-w-4xl p-8">
        <h1 className="mb-8 text-3xl font-bold">Meus Pedidos</h1>

        <div className="space-y-4">
          {purchases.map((purchase) => (
            <div key={purchase.id} className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm">
              <div>
                <h3 className="text-lg font-semibold">{purchase.project.name}</h3>
                <p className="text-sm text-gray-500">
                  Comprado em: {purchase.createdAt.toLocaleDateString("pt-BR")}
                </p>
              </div>

              <Link
                href={purchase.project.fileUrl}
                target="_blank"
                className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Download Arquivo
              </Link>
            </div>
          ))}

          {purchases.length === 0 && (
            <div className="rounded-lg bg-white p-12 text-center text-gray-500 shadow-sm">
              <p>Você ainda não comprou nenhum projeto.</p>
              <Link href="/" className="mt-4 inline-block text-black underline">
                Voltar para a loja
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
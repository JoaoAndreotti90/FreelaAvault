import { db } from "@/lib/db"
import Navbar from "@/components/Navbar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import DashboardTabs from "@/components/DashboardTabs"
import DeleteAccountButton from "@/components/DeleteAccountButton"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user?.id) {
    redirect("/login")
  }

  const myProjects = await db.project.findMany({
    where: { freelancerId: session.user.id },
    orderBy: { createdAt: "desc" }
  })
  const isSeller = myProjects.length > 0

  const purchases = await db.purchase.findMany({
    where: {
      clientId: session.user.id,
      status: "PAID",
    },
    include: { project: true },
    orderBy: { createdAt: "desc" },
  })

  let sales: any[] = []
  let totalRevenue = 0
  const graphData = Array(12).fill(0).map((_, i) => ({ 
    name: new Date(0, i).toLocaleString('pt-BR', { month: 'short' }), 
    total: 0 
  }))

  if (isSeller) {
    sales = await db.purchase.findMany({
      where: {
        project: { freelancerId: session.user.id },
        status: "PAID",
      },
      include: {
        project: true,
        client: true,
      },
      orderBy: { createdAt: "desc" },
    })

    sales.forEach((sale) => {
      const finalPrice = Number(sale.pricePaid) > 0 ? Number(sale.pricePaid) : Number(sale.project.price)
      
      totalRevenue += finalPrice

      const month = sale.createdAt.getMonth()
      graphData[month].total += finalPrice
      
      sale.finalPrice = finalPrice 
    })
  }

  const formattedSales = sales.map(s => ({
    ...s,
    pricePaid: Number(s.pricePaid),
    createdAt: s.createdAt.toISOString(),
    project: { 
      ...s.project, 
      price: Number(s.project.price)
    } 
  }))

  const formattedPurchases = purchases.map(p => ({
    ...p,
    pricePaid: Number(p.pricePaid),
    createdAt: p.createdAt.toISOString(),
    project: { 
      ...p.project, 
      price: Number(p.project.price) 
    }
  }))

  const formattedProjects = myProjects.map(p => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    price: Number(p.price)
  }))

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto max-w-5xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard</h1>
        
        <DashboardTabs 
          sales={formattedSales}
          purchases={formattedPurchases}
          isSeller={isSeller}
          totalRevenue={totalRevenue}
          graphData={graphData}
          myProjects={formattedProjects}
        />

        <DeleteAccountButton />
      </div>
    </main>
  )
}
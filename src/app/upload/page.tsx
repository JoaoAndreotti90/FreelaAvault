import Navbar from "@/components/Navbar"
import UploadForm from "@/components/UploadForm"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function UploadPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto max-w-xl p-8">
        <h1 className="mb-8 text-3xl font-bold">Vender Projeto</h1>
        <UploadForm />
      </div>
    </main>
  )
}
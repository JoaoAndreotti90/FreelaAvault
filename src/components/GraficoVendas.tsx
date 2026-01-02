"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface GraficoVendasProps {
  data: {
    name: string
    total: number
  }[]
}

export default function GraficoVendas({ data }: GraficoVendasProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis
          dataKey="name"
          stroke="#94a3b8"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          dy={10}
        />
        <YAxis
          stroke="#94a3b8"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$${value}`}
        />
        <Tooltip 
           cursor={{ fill: '#f8fafc' }}
           contentStyle={{ 
             backgroundColor: '#1e293b', 
             border: 'none', 
             borderRadius: '8px',
             color: '#fff',
             fontSize: '12px',
             boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
           }}
           itemStyle={{ color: '#fff' }}
           formatter={(value) => [`R$ ${value}`, 'Receita']}
        />
        <Bar
          dataKey="total"
          fill="#10b981" 
          radius={[4, 4, 0, 0]}
          barSize={32}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
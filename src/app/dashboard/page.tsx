'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [stats, setStats] = useState({ leads: 0, imoveis: 0, consultas: 0 })
  
  useEffect(() => {
    Promise.all([
      fetch('/api/leads').then(r => r.json()),
      fetch('/api/imoveis').then(r => r.json()),
      fetch('/api/consultas').then(r => r.json())
    ]).then(([leads, imoveis, consultas]) => {
      setStats({
        leads: leads.data?.length || 0,
        imoveis: imoveis.data?.length || 0,
        consultas: consultas.data?.length || 0
      })
    })
  }, [])

  return (
    <div className="container-custom py-8 animate-slide-in">
      <h1 className="text-4xl font-bold mb-8">🏢 Dashboard STR</h1>
      
      <div className="grid-responsive mb-8">
        <Link href="/leads" className="stat-card hover:scale-105 transition-transform cursor-pointer gradient-blue">
          <div className="stat-icon">👥</div>
          <div className="stat-label">LEADS</div>
          <div className="stat-value text-blue-600">{stats.leads}</div>
        </Link>
        
        <Link href="/imoveis" className="stat-card hover:scale-105 transition-transform cursor-pointer gradient-green">
          <div className="stat-icon">🏠</div>
          <div className="stat-label">IMÓVEIS</div>
          <div className="stat-value text-green-600">{stats.imoveis}</div>
        </Link>
        
        <Link href="/consultas" className="stat-card hover:scale-105 transition-transform cursor-pointer gradient-purple">
          <div className="stat-icon">📅</div>
          <div className="stat-label">CONSULTAS</div>
          <div className="stat-value text-purple-600">{stats.consultas}</div>
        </Link>
        
        <Link href="/analise-mercado" className="stat-card hover:scale-105 transition-transform cursor-pointer bg-gradient-to-r from-orange-50 to-yellow-50">
          <div className="stat-icon">📊</div>
          <div className="stat-label">ANÁLISES IA</div>
          <div className="stat-value text-orange-600">🤖</div>
        </Link>
      </div>

      <div className="grid-2col gap-6">
        <div className="card">
          <h2 className="card-title mb-4">🚀 Ações Rápidas</h2>
          <div className="space-y-3">
            <Link href="/leads/novo" className="btn btn-primary w-full">+ Novo Lead</Link>
            <Link href="/imoveis/novo" className="btn btn-success w-full">+ Novo Imóvel</Link>
            <Link href="/consultas/nova" className="btn btn-outline w-full">+ Nova Consulta</Link>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title mb-4">🤖 IA & Análises</h2>
          <div className="space-y-3">
            <Link href="/analise-mercado/nova" className="btn btn-primary w-full">Análise de Mercado</Link>
            <Link href="/leads/relatorio" className="btn btn-outline w-full">Relatório de Leads</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function ImoveisPage() {
  const [imoveis, setImoveis] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/imoveis')
      .then(r => r.json())
      .then(d => {
        setImoveis(d.data || [])
        setLoading(false)
      })
  }, [])

  return (
    <Container
      title="🏠 Imóveis"
      subtitle="Gerencie seu portfólio de imóveis"
      action={
        <Link href="/imoveis/novo" className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-md">
          + Novo Imóvel
        </Link>
      }
    >
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      ) : imoveis.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">🏚️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum imóvel cadastrado</h3>
          <p className="text-gray-600 mb-6">Adicione seu primeiro imóvel ao sistema!</p>
          <Link href="/imoveis/novo" className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
            Cadastrar Primeiro Imóvel
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imoveis.map((i: any) => (
            <div key={i.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group">
              <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <span className="text-6xl">🏠</span>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition">
                    {i.tipo}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    i.disponivel ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {i.disponivel ? 'Disponível' : 'Indisponível'}
                  </span>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📍</span>
                    <span>{i.cidade}/{i.estado}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🏘️</span>
                    <span className="truncate">{i.endereco}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📐</span>
                    <span>{i.metragem}m²</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-2xl font-bold text-green-600">
                    R$ {i.preco?.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    R$ {(i.preco / i.metragem).toFixed(2)}/m²
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}
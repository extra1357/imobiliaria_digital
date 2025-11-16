'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function ProprietariosPage() {
  const [props, setProps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/proprietarios')
      .then(r => r.json())
      .then(d => {
        setProps(d.data || [])
        setLoading(false)
      })
  }, [])

  return (
    <Container
      title="👤 Proprietários"
      subtitle="Gerencie os proprietários de imóveis"
      action={
        <Link href="/proprietarios/novo" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition shadow-md">
          + Novo Proprietário
        </Link>
      }
    >
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      ) : props.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum proprietário cadastrado</h3>
          <p className="text-gray-600 mb-6">Adicione o primeiro proprietário!</p>
          <Link href="/proprietarios/novo" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">
            Cadastrar Primeiro Proprietário
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {props.map((p: any) => (
            <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl mr-4">
                  👤
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{p.nome}</h3>
                  {p.cpf && <p className="text-xs text-gray-500">CPF: {p.cpf}</p>}
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <span className="mr-3 text-lg">✉️</span>
                  <span className="truncate">{p.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-3 text-lg">📱</span>
                  <span>{p.telefone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-3 text-lg">🏠</span>
                  <span>{p.imoveis?.length || 0} imóveis</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}
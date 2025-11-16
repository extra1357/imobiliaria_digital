'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ImoveisPublicos() {
  const [imoveis, setImoveis] = useState([])
  const [filtro, setFiltro] = useState({ tipo: 'todos', maxPreco: 9999999 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/imoveis')
      .then(r => r.json())
      .then(d => {
        setImoveis(d.data?.filter((i: any) => i.disponivel) || [])
        setLoading(false)
      })
  }, [])

  const imoveisFiltrados = imoveis.filter((i: any) => {
    if (filtro.tipo !== 'todos' && i.tipo !== filtro.tipo) return false
    if (i.preco > filtro.maxPreco) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com Menu Admin */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div>
              <h1 className="text-3xl font-bold">🏢 Imobiliária STR</h1>
              <p className="text-blue-200 text-sm">Encontre seu imóvel ideal</p>
            </div>
            
            {/* Botão Admin Discreto */}
            <Link 
              href="/dashboard"
              className="group relative px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                <span className="text-sm font-medium">⚙️</span>
                <span className="hidden group-hover:inline text-sm">Admin</span>
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Imóveis Disponíveis
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Encontre o imóvel perfeito para você
          </p>
          
          {/* Filtros */}
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo</label>
                <select 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filtro.tipo}
                  onChange={e => setFiltro({...filtro, tipo: e.target.value})}
                >
                  <option value="todos">Todos</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Casa">Casa</option>
                  <option value="Terreno">Terreno</option>
                  <option value="Comercial">Comercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preço Máximo</label>
                <select 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filtro.maxPreco}
                  onChange={e => setFiltro({...filtro, maxPreco: parseInt(e.target.value)})}
                >
                  <option value={9999999}>Qualquer valor</option>
                  <option value={200000}>Até R$ 200.000</option>
                  <option value={400000}>Até R$ 400.000</option>
                  <option value={600000}>Até R$ 600.000</option>
                  <option value={1000000}>Até R$ 1.000.000</option>
                </select>
              </div>

              <div className="flex items-end">
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
                  🔍 Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listagem de Imóveis */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900">
            {imoveisFiltrados.length} imóveis encontrados
          </h3>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
            <p className="mt-4 text-gray-600 text-lg">Carregando imóveis...</p>
          </div>
        ) : imoveisFiltrados.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <div className="text-8xl mb-6">🏚️</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-gray-600">Tente ajustar os filtros de busca</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {imoveisFiltrados.map((imovel: any) => (
              <div 
                key={imovel.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Imagem Placeholder */}
                <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center relative overflow-hidden">
                  <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                    {imovel.tipo === 'Apartamento' ? '🏢' :
                     imovel.tipo === 'Casa' ? '🏠' :
                     imovel.tipo === 'Terreno' ? '🏞️' : '🏪'}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-sm font-bold text-gray-900">{imovel.tipo}</span>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                      {imovel.tipo}
                    </h3>
                    <p className="text-gray-600 flex items-center">
                      <span className="mr-2">📍</span>
                      {imovel.cidade}/{imovel.estado}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-700">
                      <span className="mr-3 text-xl">📐</span>
                      <span className="font-semibold">{imovel.metragem}m²</span>
                    </div>
                    
                    {imovel.descricao && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {imovel.descricao}
                      </p>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <p className="text-3xl font-bold text-green-600">
                          R$ {imovel.preco?.toLocaleString('pt-BR')}
                        </p>
                        <p className="text-sm text-gray-500">
                          R$ {(imovel.preco / imovel.metragem).toFixed(2)}/m²
                        </p>
                      </div>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg">
                      📞 Entrar em Contato
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">🏢 STR Imóveis</h3>
              <p className="text-gray-400">
                Os melhores imóveis da região com atendimento personalizado.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 contato@str.com.br</p>
                <p>📱 (11) 9999-9999</p>
                <p>📍 São Paulo - SP</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                  📘
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                  📸
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                  🐦
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Imobiliária STR. Todos os direitos reservados.</p>
            <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block">
              Acesso Administrativo →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
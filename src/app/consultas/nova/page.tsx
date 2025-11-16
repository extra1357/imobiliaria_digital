'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NovaConsulta() {
  const router = useRouter()
  const [leads, setLeads] = useState([])
  const [imoveis, setImoveis] = useState([])
  const [form, setForm] = useState({
    leadId: '',
    imovelId: '',
    tipo: 'visita',
    observacoes: ''
  })

  useEffect(() => {
    fetch('/api/leads').then(r => r.json()).then(d => setLeads(d.data || []))
    fetch('/api/imoveis').then(r => r.json()).then(d => setImoveis(d.data || []))
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const res = await fetch('/api/consultas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (res.ok) router.push('/consultas')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nova Consulta</h1>
        <p className="text-gray-600 mb-8">Agende uma visita ou negociação</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lead
            </label>
            <select 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={form.leadId}
              onChange={e => setForm({...form, leadId: e.target.value})}
              required
            >
              <option value="">Selecione um lead...</option>
              {leads.map((l: any) => (
                <option key={l.id} value={l.id}>{l.nome} - {l.email}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Imóvel
            </label>
            <select 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={form.imovelId}
              onChange={e => setForm({...form, imovelId: e.target.value})}
              required
            >
              <option value="">Selecione um imóvel...</option>
              {imoveis.map((i: any) => (
                <option key={i.id} value={i.id}>
                  {i.tipo} - {i.cidade} - R$ {i.preco?.toLocaleString('pt-BR')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tipo de Consulta
            </label>
            <select 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={form.tipo}
              onChange={e => setForm({...form, tipo: e.target.value})}
            >
              <option value="visita">Visita</option>
              <option value="proposta">Proposta</option>
              <option value="negociacao">Negociação</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Observações
            </label>
            <textarea 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              rows={4}
              value={form.observacoes}
              onChange={e => setForm({...form, observacoes: e.target.value})}
              placeholder="Detalhes adicionais sobre a consulta..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="submit" 
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition transform"
            >
              Agendar Consulta
            </button>
            <button 
              type="button" 
              onClick={() => router.push('/consultas')}
              className="flex-1 border-2 border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 active:scale-95 transition transform"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
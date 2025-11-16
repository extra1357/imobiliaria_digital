'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NovoImovel() {
  const router = useRouter()
  const [props, setProps] = useState([])
  const [form, setForm] = useState({
    tipo: 'Apartamento',
    endereco: '',
    cidade: '',
    estado: 'SP',
    preco: 0,
    metragem: 0,
    proprietarioId: ''
  })

  useEffect(() => {
    fetch('/api/proprietarios').then(r => r.json()).then(d => setProps(d.data || []))
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await fetch('/api/imoveis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    router.push('/imoveis')
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Novo Imóvel</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Tipo</label>
          <select 
            className="w-full p-2 border rounded"
            value={form.tipo}
            onChange={e => setForm({...form, tipo: e.target.value})}
          >
            <option>Apartamento</option>
            <option>Casa</option>
            <option>Terreno</option>
            <option>Comercial</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Endereço</label>
          <input 
            className="w-full p-2 border rounded"
            value={form.endereco}
            onChange={e => setForm({...form, endereco: e.target.value})}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Cidade</label>
            <input 
              className="w-full p-2 border rounded"
              value={form.cidade}
              onChange={e => setForm({...form, cidade: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Estado</label>
            <input 
              className="w-full p-2 border rounded"
              value={form.estado}
              onChange={e => setForm({...form, estado: e.target.value})}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Preço</label>
            <input 
              type="number"
              className="w-full p-2 border rounded"
              value={form.preco}
              onChange={e => setForm({...form, preco: parseFloat(e.target.value)})}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Metragem</label>
            <input 
              type="number"
              className="w-full p-2 border rounded"
              value={form.metragem}
              onChange={e => setForm({...form, metragem: parseFloat(e.target.value)})}
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-2">Proprietário</label>
          <select 
            className="w-full p-2 border rounded"
            value={form.proprietarioId}
            onChange={e => setForm({...form, proprietarioId: e.target.value})}
            required
          >
            <option value="">Selecione...</option>
            {props.map((p: any) => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded">
          Criar Imóvel
        </button>
      </form>
    </div>
  )
}
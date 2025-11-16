'use client'
import { useEffect, useState } from 'react'

export default function ImoveisDisponiveis() {
  const [imoveis, setImoveis] = useState([])

  useEffect(() => {
    fetch('/api/imoveis?disponivel=true').then(r => r.json()).then(d => {
      const disponiveis = (d.data || []).filter((i: any) => i.disponivel)
      setImoveis(disponiveis)
    })
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Imóveis Disponíveis</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {imoveis.map((i: any) => (
          <div key={i.id} className="p-4 border rounded">
            <h3 className="font-bold">{i.tipo}</h3>
            <p>{i.cidade}</p>
            <p className="text-xl font-bold mt-2">R$ {i.preco?.toLocaleString('pt-BR')}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
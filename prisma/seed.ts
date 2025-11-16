import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

async function main() {
  // Usuário admin
  await prisma.usuario.create({
    data: {
      nome: 'Admin',
      email: 'admin@str.com',
      senha: await bcrypt.hash('admin123', 10),
      role: 'admin'
    }
  })

  // Proprietário
  const prop = await prisma.proprietario.create({
    data: {
      nome: 'João Silva',
      telefone: '11987654321',
      email: 'joao@email.com',
      cpf: '12345678900'
    }
  })

  // Imóvel
  const imovel = await prisma.imovel.create({
    data: {
      tipo: 'Apartamento',
      endereco: 'Rua A, 123',
      cidade: 'São Paulo',
      estado: 'SP',
      preco: 450000,
      metragem: 80,
      proprietarioId: prop.id
    }
  })

  // Leads
  const leads = await prisma.lead.createMany({
    data: [
      { nome: 'Maria Santos', email: 'maria@gmail.com', telefone: '11999999999', origem: 'site', status: 'quente' },
      { nome: 'Pedro Costa', email: 'pedro@hotmail.com', telefone: '11988888888', origem: 'redes-sociais', status: 'morno' }
    ]
  })

  // Análise de mercado
  await prisma.analiseMercado.create({
    data: {
      cidade: 'São Paulo',
      estado: 'SP',
      valorM2: 8500,
      valorMinimo: 7000,
      valorMaximo: 12000,
      fonte: 'sistema',
      tendencia: 'alta'
    }
  })

  // Relatório
  await prisma.relatorio.create({
    data: {
      titulo: 'Relatório Mensal de Leads',
      tipo: 'leads',
      conteudo: 'Total de 2 leads captados este mês',
      periodo: 'mensal',
      geradoPor: 'sistema'
    }
  })

  console.log('✅ Seed completo!')
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
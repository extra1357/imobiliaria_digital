'use client'
import React from 'react';

export default function HomePage() {
  const sections = [
    {
      title: 'Dashboard',
      emoji: '📊',
      color: '#3B82F6',
      items: [
        { name: 'Painel Principal', path: '/dashboard', emoji: '📈' }
      ]
    },
    {
      title: 'Leads',
      emoji: '👥',
      color: '#10B981',
      items: [
        { name: 'Lista de Leads', path: '/leads', emoji: '📋' },
        { name: 'Novo Lead', path: '/leads/novo', emoji: '➕' },
        { name: 'Relatório de Leads', path: '/leads/relatorio', emoji: '📄' }
      ]
    },
    {
      title: 'Imóveis',
      emoji: '🏠',
      color: '#8B5CF6',
      items: [
        { name: 'Lista de Imóveis', path: '/imoveis', emoji: '📋' },
        { name: 'Novo Imóvel', path: '/imoveis/novo', emoji: '➕' },
        { name: 'Imóveis Disponíveis', path: '/imoveis/disponiveis', emoji: '🏘️' }
      ]
    },
    {
      title: 'Proprietários',
      emoji: '👤',
      color: '#F97316',
      items: [
        { name: 'Lista de Proprietários', path: '/proprietarios', emoji: '📋' },
        { name: 'Novo Proprietário', path: '/proprietarios/novo', emoji: '➕' }
      ]
    },
    {
      title: 'Consultas',
      emoji: '📅',
      color: '#EF4444',
      items: [
        { name: 'Agenda de Consultas', path: '/consultas', emoji: '🗓️' },
        { name: 'Nova Consulta', path: '/consultas/nova', emoji: '➕' },
        { name: 'Histórico', path: '/consultas/historico', emoji: '📋' }
      ]
    },
    {
      title: 'Análise de Mercado',
      emoji: '📈',
      color: '#06B6D4',
      items: [
        { name: 'Análises', path: '/analise-mercado', emoji: '💹' },
        { name: 'Nova Análise', path: '/analise-mercado/nova', emoji: '➕' },
        { name: 'Relatórios', path: '/analise-mercado/relatorios', emoji: '📄' }
      ]
    }
  ];

  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #F9FAFB, #E5E7EB)',
      padding: '32px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#1F2937',
            marginBottom: '8px' 
          }}>
            🏢 IMOBILIARIA STR
          </h1>
          <p style={{ color: '#6B7280' }}>
            Painel de Navegação - Acesse todas as funcionalidades
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {sections.map((section, idx) => (
            <div 
              key={idx}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{
                backgroundColor: section.color,
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{ fontSize: '28px' }}>{section.emoji}</span>
                <h2 style={{ 
                  fontSize: '20px', 
                  fontWeight: 'bold', 
                  color: 'white',
                  margin: 0
                }}>
                  {section.title}
                </h2>
              </div>
              
              <div style={{ padding: '16px' }}>
                {section.items.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    onClick={() => handleNavigate(item.path)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      marginBottom: itemIdx < section.items.length - 1 ? '8px' : '0',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{
                      padding: '8px',
                      borderRadius: '8px',
                      backgroundColor: '#F3F4F6'
                    }}>
                      <span style={{ fontSize: '20px' }}>{item.emoji}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ 
                        fontWeight: '500', 
                        color: '#1F2937',
                        margin: 0,
                        marginBottom: '2px'
                      }}>
                        {item.name}
                      </p>
                      <p style={{ 
                        fontSize: '12px', 
                        color: '#6B7280',
                        margin: 0
                      }}>
                        {item.path}
                      </p>
                    </div>
                    <span style={{ color: '#9CA3AF', fontSize: '20px' }}>→</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '24px'
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: '#1F2937',
            marginBottom: '16px',
            marginTop: 0
          }}>
            🔌 Rotas da API
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            {[
              { method: 'GET /api/leads', desc: 'Listar todos os leads', color: '#3B82F6' },
              { method: 'POST /api/leads', desc: 'Criar novo lead', color: '#10B981' },
              { method: 'GET /api/imoveis', desc: 'Listar todos os imóveis', color: '#8B5CF6' },
              { method: 'GET /api/proprietarios', desc: 'Listar proprietários', color: '#F97316' },
              { method: 'GET /api/consultas', desc: 'Listar consultas', color: '#EF4444' },
              { method: 'GET /api/analise-mercado', desc: 'Análises de mercado', color: '#06B6D4' }
            ].map((api, idx) => (
              <div 
                key={idx}
                style={{
                  borderLeft: `4px solid ${api.color}`,
                  paddingLeft: '16px',
                  paddingTop: '8px',
                  paddingBottom: '8px'
                }}
              >
                <p style={{ 
                  fontWeight: '600', 
                  color: '#1F2937',
                  margin: 0,
                  marginBottom: '4px'
                }}>
                  {api.method}
                </p>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#6B7280',
                  margin: 0
                }}>
                  {api.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
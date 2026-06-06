import React, { useState } from 'react';
import { PaginaAtiva } from './types';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import './custom.scss';

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState<PaginaAtiva>('vendas');

  // Função que decide qual página renderizar na tela central
  const renderizarPagina = () => {
    switch (paginaAtiva) {
      case 'vendas':
        return <div className="p-4"><h2>🛒 Tela de Vendas (PDV)</h2><p>O coração do sistema vai nascer aqui na Etapa 2.</p></div>;
      case 'estoque':
        return <div className="p-4"><h2>📦 Painel de Estoque</h2><p>Aqui controlaremos as quantidades e alertas de estoque baixo.</p></div>;
      case 'cadastro':
        return <div className="p-4"><h2>➕ Cadastro de Produtos</h2><p>Formulário para dar entrada em novas mercadorias.</p></div>;
      default:
        return <div className="p-4"><h2>Erro 404</h2><p>Página não encontrada.</p></div>;
    }
  };

  return (
    <div className="d-flex w-100 min-vh-100 overflow-hidden">
      {/* 1. Menu Lateral Fixo */}
      <Sidebar paginaAtiva={paginaAtiva} setPaginaAtiva={setPaginaAtiva} />

      {/* 2. Área do Conteúdo Direita */}
      <div className="d-flex flex-column flex-grow-1 bg-light overflow-auto">
        {/* Barra Superior */}
        <Navbar />

        {/* Conteúdo Dinâmico da Página Ativa */}
        <main className="flex-grow-1">
          {renderizarPagina()}
        </main>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import { PaginaAtiva } from '../types';

interface SidebarProps {
    paginaAtiva: PaginaAtiva;
    setPaginaAtiva: (pagina: PaginaAtiva) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ paginaAtiva, setPaginaAtiva }) => {
    const botaoClasse = (pagina: PaginaAtiva) => {
        return `nav-link text-white w-100 text-start py-3 px-4 rounded-0 d-flex align-items-center gap-3 ${paginaAtiva === pagina ? 'bg-primary fw-bold' : 'hover-sidebar'
            }`;
    }

    return (
        <aside className="bg-dark text-white min-vh-100 d-flex flex-column" style={{ width: '260px' }}>
      {/* Branding da empresa */}
      <div className="p-4 border-bottom border-secondary text-center">
        <h2 className="h5 m-0 fw-bold tracking-wide">PAI & FILHO</h2>
        <small className="text-muted text-uppercase fs-7">Sistema de Gestão</small>
      </div>

      {/* Links do Menu */}
      <nav className="nav flex-column flex-grow-1 mt-3">
        <button className={botaoClasse('vendas')} onClick={() => setPaginaAtiva('vendas')}>
          <span>🛒</span> Frente de Caixa (PDV)
        </button>
        <button className={botaoClasse('estoque')} onClick={() => setPaginaAtiva('estoque')}>
          <span>📦</span> Controle de Estoque
        </button>
        <button className={botaoClasse('cadastro')} onClick={() => setPaginaAtiva('cadastro')}>
          <span>➕</span> Cadastrar Produto
        </button>
      </nav>

      {/* Rodapé do Menu */}
      <div className="p-3 border-top border-secondary text-center">
        <small className="text-muted">v1.0.0 — 2026</small>
      </div>
    </aside>
    )
}
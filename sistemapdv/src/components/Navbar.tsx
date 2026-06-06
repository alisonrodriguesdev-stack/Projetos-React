import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="navbar navbar-expand bg-white border-bottom px-4 py-3 shadow-sm">
      <div className="container-fluid p-0">
        <div className="navbar-brand fw-semibold text-secondary fs-5">
          Painel de Controle
        </div>
        <div className="d-flex align-items-center gap-4">
          {/* Status do Caixa */}
          <div className="d-flex align-items-center gap-2">
            <span className="spinner-grow spinner-grow-sm text-success" role="status"></span>
            <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
              Caixa Operacional
            </span>
          </div>
          {/* Identificação do Operador */}
          <div className="text-end border-start ps-4">
            <p className="m-0 fw-semibold text-dark fs-6">Alison Rodrigues</p>
            <small className="text-muted fs-7">Operador / Administrador</small>
          </div>
        </div>
      </div>
    </header>
  );
};
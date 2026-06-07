import React, { useState, useRef, useEffect } from 'react';
import { Produto, ItemVenda } from '../../types';

// Banco de dados temporário para testes na Mercearia
const PRODUTOS_MOCK: Produto[] = [
    { id: '1', codigoBarras: '789100010', nome: 'Arroz Integral Tio João 1kg', precoVenda: 6.50, estoqueAtual: 20 },
    { id: '2', codigoBarras: '789100020', nome: 'Feijão Carioca Kicaldo 1kg', precoVenda: 8.90, estoqueAtual: 15 },
    { id: '3', codigoBarras: '789100030', nome: 'Óleo de Soja Liza 900ml', precoVenda: 5.20, estoqueAtual: 8 },
    { id: '4', codigoBarras: '789100040', nome: 'Café Santa Clara 250g', precoVenda: 4.80, estoqueAtual: 30 },
];

export const Vendas: React.FC = () => {
    const [carrinho, setCarrinho] = useState<ItemVenda[]>([]);
    const [codigoInput, setCodigoInput] = useState('');
    const [quantidadeInput, setQuantidadeInput] = useState(1);
    const [erro, setErro] = useState('');

    const codigoRef = useRef<HTMLInputElement>(null);

    //Foca o cursor no campo de código de barras assim que a tela abre
    useEffect(() => {
        codigoRef.current?.focus();
    }, []);

    //Calcula o valor total geral do carrinho
    const totalGeral = carrinho.reduce((acc, item) => acc + item.subtotal, 0);

    const handLeAdicionarProduto = (e: React.FormEvent) => {
        e.preventDefault();
        setErro('');

        // Busca o produto pelo código de barras
        const produtoEncontrado = PRODUTOS_MOCK.find(p => p.codigoBarras === codigoInput);

        if (!produtoEncontrado) {
            setErro('Produto não encontrado');
            return;
        }

        // Verifica se o produto já existe no carrinho
        const indexItemExistente = carrinho.findIndex(
            item => item.produto.codigoBarras === produtoEncontrado.codigoBarras
        );

        if (indexItemExistente !== -1) {
            // Atualiza quantidade e subtotal do item existente
            const carrinhoAtualizado = [...carrinho];
            const itemExistente = carrinhoAtualizado[indexItemExistente];
            const novaQuantidade = itemExistente.quantidade + quantidadeInput;

            carrinhoAtualizado[indexItemExistente] = {
                ...itemExistente,
                quantidade: novaQuantidade,
                subtotal: itemExistente.produto.precoVenda * novaQuantidade
            };

            setCarrinho(carrinhoAtualizado);
        } else {
            // Adiciona novo item ao carrinho
            const novoItem: ItemVenda = {
                id: carrinho.length + 1,
                produto: produtoEncontrado,
                quantidade: quantidadeInput,
                subtotal: produtoEncontrado.precoVenda * quantidadeInput,
            };

            setCarrinho([...carrinho, novoItem]);
        }

        // Limpa inputs e retorna o foco
        setCodigoInput('');
        setQuantidadeInput(1);
        codigoRef.current?.focus();
    };

    const handleLimparVenda = () => {
        if (window.confirm('Tem certeza que deseja limpar a venda?')) {
            setCarrinho([]);
            setErro('');
            codigoRef.current?.focus();
        }
    };

        return (
            <div className="container-fluid p-4">
                <div className="row g-4">

                    {/*Coluna da Esquerda: Registro e Inputs */}
                    <div className="col-lg-5">
                        <div className="card pdv-card">
                            <div className="card-header">🛒 Registrar Mercadoria</div>
                            <div className="card-body">
                                <form onSubmit={handLeAdicionarProduto}>

                                    {/* Input de Código de Barras */}
                                    <div className="mb-3">
                                        <label htmlFor="codigo" className="form-label fw-semibold">Código de Barras</label>
                                        <input
                                            type="text"
                                            id="codigo"
                                            ref={codigoRef}
                                            className={`form-control form-control-lg bg-light ${erro ? 'is-invalid' : ''}`}
                                            placeholder="Digite ou bip o código..."
                                            value={codigoInput}
                                            onChange={(e) => setCodigoInput(e.target.value)}
                                        />
                                        {erro && <div className="invalid-feedback">{erro}</div>}
                                    </div>

                                    {/* Input de Quantidade */}
                                    <div className="mb-4">
                                        <label htmlFor="quantidade" className="form-label fw-semibold">Quantidade</label>
                                        <input
                                            type="number"
                                            id="quantidade"
                                            className="form-control form-control-lg bg-light"
                                            min={1}
                                            value={quantidadeInput}
                                            onChange={(e) => setQuantidadeInput(parseInt(e.target.value) || 1)}
                                        />
                                    </div>
                                    {/* Dica de teste rápida para o desenvolvedor */}
                                    <div className="alert alert-info py-2 fs-7 mb-4">
                                        <strong>💡 Códigos para testar:</strong> 789100010, 789100020, 789100030
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold py-3">
                                        Confirmar Item (Enter)
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>

                    {/* COLUNA DA DIREITA: Cupom Fiscal e Total */}
                    <div className="col-lg-7 d-flex flex-column gap-4">
                        <div className="card pdv-card flex-grow-1" style={{ minHeight: '400px' }}>
                            <div className="card-header">📄 Cupom Fiscal</div>
                            <div className="card-body d-flex flex-column justify-content-between p-0">

                                {/*Tabela de Itens (Cupom Fiscal) */}
                                <div className="table-responsive p-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    <table className="table table-hover align-middle">
                                        <thead className="table-dark sticky-top">
                                            <tr>
                                                <th scope="col" style={{ width: '60px' }}>Item</th>
                                                <th scope="col">Descrição</th>
                                                <th scope="col" className="text-center">Qtd</th>
                                                <th scope="col" className="text-end">Unit.</th>
                                                <th scope="col" className="text-end">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {carrinho.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="text-center text-muted py-5">
                                                        Caixa aguardando produtos...
                                                    </td>
                                                </tr>
                                            ) : (
                                                carrinho.map((item) => (
                                                    <tr key={item.id}>
                                                        <td className="fw-bold text-secondary text-center">{item.id}</td>
                                                        <td>{item.produto.nome}</td>
                                                        <td className="text-center">{item.quantidade}</td>
                                                        <td className="text-end">R$ {item.produto.precoVenda.toFixed(2)}</td>
                                                        <td className="text-end fw-bold">R$ {item.subtotal.toFixed(2)}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/*Bloco de fechamento de Venda */}
                                <div className="p-3 border-top bg-light mt-auto">
                                    <div className="painel-total mb-3">
                                        TOTAL: R$ {totalGeral.toFixed(2)}
                                    </div>

                                    <div className="d-flex gap-3">
                                        <button
                                            onClick={handleLimparVenda}
                                            className="btn btn-outline-danger btn-lg w-50 fw-semibold"
                                            disabled={carrinho.length === 0}
                                        >
                                            Cancelar Cupom
                                        </button>
                                        <button
                                            className="btn btn-success btn-lg w-50 fw-bold shadow-sm"
                                            disabled={carrinho.length === 0}
                                            onClick={() => alert('Venda finalizada com sucesso! (Integraremos com o caixa e banco em breve)')}
                                        >
                                            Pagar (F10)
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )

    }
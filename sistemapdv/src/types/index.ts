export type PaginaAtiva = 'vendas' | 'estoque' | 'cadastro'

// Como o produto está salvo no banco de dados, ele tem um id do tipo string, mas quando é adicionado à venda, o id é convertido para number. Por isso, o id do item de venda é do tipo number.
export interface Produto{
    id: string;
    codigoBarras: string;
    nome: string;
    precoVenda: number;
    estoqueAtual: number;
}

export interface ItemVenda{
    id: number;
    produto: Produto;
    quantidade: number;
    subtotal: number;
}
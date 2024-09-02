export interface Produto{
    id?:         any;
    descricao:   string;
    unidade:     string;
    valor_custo: number|string;
    valor_venda: number|string;
    valor_promocional: number|string;
}
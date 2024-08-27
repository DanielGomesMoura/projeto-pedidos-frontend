export interface ItenPedido {
  id?:        any;
  quantidade: number;
  valor_unitario: number;
  produto_fk: number;
  descricao_produto: string;
}
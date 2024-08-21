export interface Pedido{
    id?:             any;
    data_registro:   string;
    valor_total:     number|string;
    cliente_id:      number;
    status:          string;
    nomeCliente:     string;
}

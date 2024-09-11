export interface MovimentoCaixa{

    id?: any;
    descricao: string;
    recebimento_fk: number;
    conta: string;
    tipo_recebimento: string;
    data_registro: string;
    tipo: string;
    valor: number|string;
}
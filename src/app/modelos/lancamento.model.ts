import { Tipo } from "./tipo.model";

export interface Lancamento {
    id: number;
    nome: string;
    descricao: string;
    valor: number;
    dataCadastro: string;
    sugestao: boolean;
    tipo: Tipo;
}
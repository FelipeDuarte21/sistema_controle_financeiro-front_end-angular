import { Balanco } from "./balanco.model";
import { Tipo } from "./tipo.model";

export interface Lancamento {
    id: number;
    nome: string;
    descricao: string;
    valor: number;
    data: string;
    dataRegistro: string;
    tipo: Tipo;
    balanco: Balanco
}
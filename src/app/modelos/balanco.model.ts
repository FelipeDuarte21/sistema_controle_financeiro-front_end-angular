import { Categoria } from "./categoria.model";

export interface Balanco{
    id: number;
    mes: number,
    ano: number,
    saldoAnterior: number;
    saldoAtual: number;
    fechado: boolean;
    categoria: Categoria;
}
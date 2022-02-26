import { Categoria } from "./categoria.model";

export interface AnotacaoCategoria{
    id: number,
    data:string,
    titulo:string,
    descricao:string,
    riscado:boolean,
    categoria: Categoria
}
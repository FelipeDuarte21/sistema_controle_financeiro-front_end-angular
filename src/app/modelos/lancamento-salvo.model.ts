import { Categoria } from "./categoria.model";
import { Tipo } from "./tipo.model";

export interface LancamentoSalvo{
    id: number,
    nome: string,
    descricao:string,
    valor: string,
    tipo: Tipo,
    categoria: Categoria
}
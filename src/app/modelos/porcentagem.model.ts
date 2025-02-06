import { CategoriaPorcentageDados } from "./categoriaPorcentagemDados.model";

export interface Porcentagem {
    rendaMensal: number,
    idConta: number,
    categorias: CategoriaPorcentageDados[]
}

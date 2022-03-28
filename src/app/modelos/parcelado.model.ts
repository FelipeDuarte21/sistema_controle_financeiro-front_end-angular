import { Categoria } from "./categoria.model";
import { Parcela } from "./parcela.model";

export interface Parcelado{
	id:number;
	titulo:string;
	descricao:string;
    data:string;
    dataRegistro:string;
    quitado:boolean;
	categoria: Categoria;
	parcelas: Array<Parcela>
}
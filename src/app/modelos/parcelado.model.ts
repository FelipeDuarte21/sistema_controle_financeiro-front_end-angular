import { Parcela } from "./parcela.model";

export interface Parcelado{
	id:number;
	titulo:string;
	descricao:string;
    data:string;
    dataRegistro:string;
    valorTotal:number,
    valorPago:number,
    totalParcelas:number,
    totalParcelasPagas:number,
    quitado:boolean;
    parcelas: Parcela[]
}

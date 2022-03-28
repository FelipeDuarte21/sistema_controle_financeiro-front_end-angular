export interface Parcela{
    id:number;
    numero:number;
	valor:number;
	dataVencimento:string;
	dataPagamento:string;
	pago: boolean;
	primeiro: boolean;
	ultimo: boolean;
}
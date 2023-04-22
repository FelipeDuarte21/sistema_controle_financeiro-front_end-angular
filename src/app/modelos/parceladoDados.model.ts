export interface ParcelaDados{
    valor: number,
    dataVencimentoPrimeiraParcela: string
}

export interface ParceladoDados{
    titulo:string;
	descricao:string;
	data:string;
	totalParcela:number;
    parcelaDados: ParcelaDados
}

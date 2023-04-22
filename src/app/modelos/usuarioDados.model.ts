export interface CategoriaCadastro{
    nome:string;
	descricao:string;
	porcentagem:number;
}

export interface UsuarioDados{
    nome: string,
    email: string,
    senha: string,
    rendaMensalTotal: number,
    categorias: CategoriaCadastro[]
}

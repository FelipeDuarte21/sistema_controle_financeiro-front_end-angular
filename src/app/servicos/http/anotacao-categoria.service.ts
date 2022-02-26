import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AnotacaoCategoriaSalvar } from "src/app/modelos/anotacao-categoria-salvar.model";
import { AnotacaoCategoria } from "src/app/modelos/anotacao-categoria.model";
import { PaginaAnotacaoCategoria } from "src/app/modelos/pagina-anotacao-categoria.model";
import { environment } from "src/environments/environment";

@Injectable()
export class AnotacaoCategoriaService{

    private baseURL:string = `${environment.apiURL}/api/categorias/`;
    private recurso:string = "/anotacoes";

    constructor(
        private http: HttpClient
    ){}

    public salvar(idCategoria:number,id:number, anotacao: AnotacaoCategoriaSalvar):Observable<AnotacaoCategoria>{

        let url = this.getURL(idCategoria);

        if(id == 0){ //Cadastrar

            return this.http.post<AnotacaoCategoria>(url,anotacao);

        }else{//Atualizar

            url = `${url}/${id}`;

            return this.http.put<AnotacaoCategoria>(url,anotacao);

        }

    }

    public riscar(idCategoria:number,id:number):Observable<AnotacaoCategoria>{
        let url = `${this.getURL(idCategoria)}/riscado/${id}`;
        return this.http.patch<AnotacaoCategoria>(url,null);
    }

    public excluir(idCategoria:number,id:number):Observable<any>{
        let url = `${this.getURL(idCategoria)}/${id}`;
        return this.http.delete(url);
    }

    public buscarPorId(idCategoria:number,id:number):Observable<AnotacaoCategoria>{
        let url = `${this.getURL(idCategoria)}/${id}`;
        return this.http.get<AnotacaoCategoria>(url);
    }

    public listar(idCategoria:number,pagina:number,quantidade:number,ordem:number):Observable<PaginaAnotacaoCategoria>{
        let url = `${this.getURL(idCategoria)}?page=${pagina}&size=${quantidade}&order=${ordem}`;
        return this.http.get<PaginaAnotacaoCategoria>(url);
    }

    private getURL(idCategoria:number):string{
        return `${this.baseURL}${idCategoria}${this.recurso}`;
    }

}
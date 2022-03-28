import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LancamentoSalvoSalvar } from "src/app/modelos/lancamento-salvo-salvar.model";
import { LancamentoSalvo } from "src/app/modelos/lancamento-salvo.model";
import { PaginaLancamentoSalvo } from "src/app/modelos/pagina-lancamento-salvo.model";
import { environment } from "src/environments/environment";

@Injectable()
export class LancamentoSalvoService{
    
    private baseURL:string = `${environment.apiURL}/api/categorias/`;
    private recurso:string = '/lancamentos-salvos';

    constructor(
        private http: HttpClient
    ){}

    public salvar(idCategoria:number, id:number, lancamentoSalvoSalvar: LancamentoSalvoSalvar): Observable<LancamentoSalvo>{

        let url = this.getURL(idCategoria);

        if(id == 0){ //Cadastrar 
            url = `${url}?idCategoria=${idCategoria}`;
            return this.http.post<LancamentoSalvo>(url,lancamentoSalvoSalvar);

        }else{ //Atualizar
            url = `${url}/${id}`;
            return this.http.put<LancamentoSalvo>(url,lancamentoSalvoSalvar);
        }

    }

    public buscarPorId(idCategoria:number, id:number):Observable<LancamentoSalvo>{
        let url = `${this.getURL(idCategoria)}/${id}`;
        return this.http.get<LancamentoSalvo>(url);
    }

    public excluir(idCategoria:number, id:number):Observable<any>{
        let url = `${this.getURL(idCategoria)}/${id}`;
        return this.http.delete(url);
    }

    public listar(idCategoria:number,page:number,size:number):Observable<PaginaLancamentoSalvo>{
        let url = `${this.getURL(idCategoria)}?page=${page}&size=${size}`;
        return this.http.get<PaginaLancamentoSalvo>(url);
    }

    private getURL(idCategoria:number):string{
        return `${this.baseURL}${idCategoria}${this.recurso}`;
    }

}
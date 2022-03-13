import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LancamentoSalvar } from "src/app/modelos/lancamento-salvar.model";
import { Lancamento } from "src/app/modelos/lancamento.model";
import { Transferencia } from "src/app/modelos/transferencia.model";
import { environment } from "src/environments/environment";
import { PaginaLancamento } from "../../modelos/pagina-lancamento.model";

@Injectable()
export class LancamentoService{

    private baseURL:string = `${environment.apiURL}/api/categorias/`;
    private recursoBalanco = `/balancos/`;
    private recurso = `/lancamentos`;

    constructor(
        private http: HttpClient
    ){}

    public salvar(idCategoria:number, idBalanco:number, id:number, lancamento: LancamentoSalvar):
        Observable<Lancamento>{

        let url = this.getURL(idCategoria,idBalanco);

        if(id == 0){//Cadastrar
            return this.http.post<Lancamento>(url,lancamento);

        }else{//Atualizar
            return this.http.put<Lancamento>(`${url}/${id}`,lancamento);

        }

    }

    public excluir(idCategoria:number, idBalanco:number, id:number):Observable<any>{
        let url = this.getURL(idCategoria,idBalanco);
        return this.http.delete(`${url}/${id}`);
    }

    public buscarPorId(idCategoria:number, idBalanco:number, id:number):Observable<Lancamento>{
        let url = this.getURL(idCategoria,idBalanco);
        return this.http.get<Lancamento>(`${url}/${id}`);
    }

    public listarPorBalanco(idCategoria:number, idBalanco:number,page:number,size:number,order:number):Observable<PaginaLancamento>{
        let url = this.getURL(idCategoria,idBalanco);
        return this.http.get<PaginaLancamento>(`${url}?page=${page}&size=${size}&order=${order}`);
    }

    public buscarArquivoCSV(idCategoria:number, idBalanco:number):Observable<any>{
        let url = this.getURL(idCategoria,idBalanco);
        return this.http.get(`${url}/arquivo`,{responseType: "blob",observe: 'response'});
    }

    public transferir(idCategoria:number, idBalanco:number,transferencia: Transferencia): Observable<any>{
        let url = this.getURL(idCategoria,idBalanco);
        return this.http.post(`${url}/transferencia`,transferencia);
    }

    private getURL(idCategoria:number, idBalanco:number):string{
        return `${this.baseURL}${idCategoria}${this.recursoBalanco}${idBalanco}${this.recurso}`;
    }

}
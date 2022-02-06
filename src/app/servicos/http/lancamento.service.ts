import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Transferencia } from "src/app/modelos/transferencia.model";
import { environment } from "src/environments/environment";
import { Lancamento, LancamentoSalvar } from "../../modelos/lancamento.model";
import { PaginaLancamento } from "../../modelos/pagina-lancamento.model";

@Injectable()
export class LancamentoService{

    private baseURL:string = `${environment.apiURL}/lancamento`;

    constructor(
        private http: HttpClient
    ){}

    public salvar(lancamento: LancamentoSalvar):Observable<Lancamento>{

        //Cadastrar
        if(!lancamento.id)
            return this.http.post<Lancamento>(this.baseURL,lancamento);

        //Alterar
        return this.http.put<Lancamento>(this.baseURL,lancamento);

    }

    public excluir(id: number):Observable<any>{
        return this.http.delete(`${this.baseURL}/${id}`);
    }

    public buscarPorId(id:number):Observable<Lancamento>{
        return this.http.get<Lancamento>(`${this.baseURL}/${id}`);
    }

    public buscarPorBalanco(idBalanco:number,page:number,size:number,order:number):Observable<PaginaLancamento>{
        return this.http.get<PaginaLancamento>(`${this.baseURL}/balanco?balanco=${idBalanco}&page=${page}&size=${size}&order=${order}`);
    }

    public buscarArquivoCSV(idBalanco:number):Observable<any>{
        return this.http.get(`${this.baseURL}/arquivo?balanco=${idBalanco}`,{responseType: "blob",observe: 'response'});
    }

    public transferir(transferencia: Transferencia): Observable<any>{
        return this.http.post(`${this.baseURL}/transferencia`,transferencia);
    }

}
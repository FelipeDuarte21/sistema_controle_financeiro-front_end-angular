import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Lancamento } from "../modelos/lancamento.model";

@Injectable()
export class LancamentoService{

    private baseURL:string = `${environment.apiURL}/lancamento`;

    constructor(
        private http: HttpClient
    ){}

    public cadastrar(lancamento: Lancamento):Observable<Lancamento>{
        return this.http.post<Lancamento>(this.baseURL,lancamento);
    }

    public alterar(lancamento: Lancamento):Observable<Lancamento>{
        return this.http.put<Lancamento>(this.baseURL,lancamento);
    }

    public excluir(id: number):Observable<any>{
        return this.http.delete(`${this.baseURL}/${id}`);
    }

    public buscarPorId(id:number):Observable<Lancamento>{
        return this.http.get<Lancamento>(`${this.baseURL}/${id}`);
    }

}
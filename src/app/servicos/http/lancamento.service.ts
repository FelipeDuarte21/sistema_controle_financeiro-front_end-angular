import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Lancamento } from "src/app/modelos/lancamento.model";
import { environment } from "src/environments/environment";

@Injectable()
export class LancamentoService{

    private baseURL:string = `${environment.apiURL}/api/v1/lancamento`;

    constructor(
        private http: HttpClient
    ){}

    public buscarPorId(idLancamento:number):Observable<Lancamento>{
        return this.http.get<Lancamento>(`${this.baseURL}/${idLancamento}`);
    }

    public listar(idFolha: number):Observable<Lancamento[]>{
        return this.http.get<Lancamento[]>(`${this.baseURL}?folha=${idFolha}`);
    }

}

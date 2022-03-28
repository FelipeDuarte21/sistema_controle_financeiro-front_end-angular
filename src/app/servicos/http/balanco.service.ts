import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BalancoFaixa } from "src/app/modelos/balanco-faixa";

import { environment } from "src/environments/environment";
import { Balanco } from "../../modelos/balanco.model";

@Injectable()
export class BalancoService{

    private baseURL:string = `${environment.apiURL}/api/categorias/`;
    private recursoURL:string = `/balancos`;

    constructor(
        private http: HttpClient
    ){}

    public buscarAtual(idCategoria:number):Observable<Balanco>{
        let url = this.getURL(idCategoria);
        return this.http.get<Balanco>(`${url}/atual`);
    }

    public buscarPorData(idCategoria:number, mes:number,ano:number):Observable<Balanco>{
        let url = this.getURL(idCategoria);
        return this.http.get<Balanco>(`${url}/data?mes=${mes}&ano=${ano}`);
    }

    public buscarResumo(idCategoria:number, ano:number, mes: number, qtdMes: number):Observable<BalancoFaixa[]>{
        let url = this.getURL(idCategoria);
        return this.http.get<BalancoFaixa[]>(`${url}/faixa?ano=${ano}&mes=${mes}&qtdMes=${qtdMes}`);
    }

    private getURL(idCategoria:number):string{
        return `${this.baseURL}${idCategoria}${this.recursoURL}`;
    }

}
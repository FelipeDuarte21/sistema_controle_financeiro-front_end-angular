import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BalancoDTO } from "src/app/modelos/balancoDTO.models";
import { environment } from "src/environments/environment";
import { Balanco } from "../../modelos/balanco.model";

@Injectable()
export class BalancoService{

    private baseURL:string = `${environment.apiURL}/balanco`;

    constructor(
        private http: HttpClient
    ){}

    public buscarAtual(idCategoria:number):Observable<Balanco>{
        return this.http.get<Balanco>(`${this.baseURL}/atual?categoria=${idCategoria}`);
    }

    public buscarPorData(idCategoria:number, mes:number,ano:number):Observable<Balanco>{
        return this.http.get<Balanco>(`${this.baseURL}/data?categoria=${idCategoria}&mes=${mes}&ano=${ano}`);
    }

    public buscarResumo(idCategoria:number, ano:number, mes: number, qtdMes: number): Observable<BalancoDTO[]>{
        return this.http.get<BalancoDTO[]>(
            `${this.baseURL}/resumo?categoria=${idCategoria}&ano=${ano}&mes=${mes}&qtdMes=${qtdMes}`);
    }

}
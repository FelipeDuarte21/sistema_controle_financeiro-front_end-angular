import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Balanco } from "../modelos/balanco.model";

@Injectable()
export class BalancoService{

    constructor(
        private http: HttpClient
    ){}

    public buscarAtual():Observable<Balanco>{
        return null;
    }

    public buscarPorData(mes:number,ano:number):Observable<Balanco>{
        return null;
    }

}
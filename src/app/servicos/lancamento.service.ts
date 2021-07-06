import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Lancamento } from "../modelos/lancamento.model";

@Injectable()
export class LancamentoService{

    constructor(
        private http: HttpClient
    ){}

    public cadastrar(lancamento: Lancamento):Observable<Lancamento>{
        return null;
    }

    public alterar(lancamento: Lancamento):Observable<Lancamento>{
        return null;
    }

    public excluir(id: number):Observable<any>{
        return null;
    }

    public buscarPorId(id:number):Observable<Lancamento>{
        return null;
    }

}
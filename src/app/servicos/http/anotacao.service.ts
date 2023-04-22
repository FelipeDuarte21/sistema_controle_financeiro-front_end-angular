import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Anotacao } from "src/app/modelos/anotacao.model";
import { AnotacaoDados } from "src/app/modelos/anotacaoDados.model";
import { environment } from "src/environments/environment";

@Injectable()
export class AnotacaoService{

    private baseURL:string = `${environment.apiURL}/api/v1/anotacao`;

    constructor(
        private http: HttpClient
    ){}

    public salvar(idCategoria:number,id:number, anotacao: AnotacaoDados):Observable<Anotacao>{

        if(id == 0){ //Cadastrar
            return this.http.post<Anotacao>(`${this.baseURL}?categoria=${idCategoria}`,anotacao);

        }else{//Atualizar
            return this.http.put<Anotacao>(`${this.baseURL}/${id}`,anotacao);

        }

    }

    public riscar(id:number):Observable<Anotacao>{
        return this.http.patch<Anotacao>(`${this.baseURL}/${id}/riscado`,null);
    }

    public excluir(id:number):Observable<any>{
        return this.http.delete(`${this.baseURL}/${id}`);
    }

    public buscarPorId(id:number):Observable<Anotacao>{
        return this.http.get<Anotacao>(`${this.baseURL}/${id}`);
    }

    public listar(idCategoria:number):Observable<Anotacao[]>{
        return this.http.get<Anotacao[]>(`${this.baseURL}?categoria=${idCategoria}`);
    }

}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LancamentoDados } from "src/app/modelos/lancamentoDados.model";
import { LancamentoFixo } from "src/app/modelos/lancamentoFixo.model";
import { LancamentoFixoDados } from "src/app/modelos/lancamentoFixoDados.model";
import { environment } from "src/environments/environment";

@Injectable()
export class LancamentoFixoService{

    private baseURL:string = `${environment.apiURL}/api/v1/lancamento-fixo`;

    constructor(
        private http: HttpClient
    ){}

    public salvar(idCategoria:number, id:number, lancamentoFixoDados: LancamentoFixoDados): Observable<LancamentoFixo>{

        if(id == 0){ //Cadastrar
            return this.http.post<LancamentoFixo>(`${this.baseURL}?categoria=${idCategoria}`,lancamentoFixoDados);

        }else{ //Atualizar
            return this.http.put<LancamentoFixo>(`${this.baseURL}/${id}`,lancamentoFixoDados);
        }

    }

    public listar(idCategoria:number):Observable<LancamentoFixo[]>{
        return this.http.get<LancamentoFixo[]>(`${this.baseURL}?categoria=${idCategoria}`);
    }

    public excluir(id:number):Observable<any>{
        return this.http.delete(`${this.baseURL}/${id}`);
    }

    public buscarPorId(id:number):Observable<LancamentoFixo>{
        return this.http.get<LancamentoFixo>(`${this.baseURL}/${id}`);
    }

}

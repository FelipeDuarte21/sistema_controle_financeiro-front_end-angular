import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Parcela } from "src/app/modelos/parcela.model";
import { Parcelado } from "src/app/modelos/parcelado.model";
import { ParceladoDados } from "src/app/modelos/parceladoDados.model";
import { environment } from "src/environments/environment";

@Injectable()
export class ParceladoService{

    private baseURL:string = `${environment.apiURL}/api/v1/parcelado`;

    constructor(
        private http: HttpClient
    ){}

    public listarNaoQuitados(idCategoria: number): Observable<Parcelado[]>{
        return this.http.get<Parcelado[]>(`${this.baseURL}/nao-quitados?categoria=${idCategoria}`);
    }

    public listar(idCategoria: number):Observable<Parcelado[]>{
        return this.http.get<Parcelado[]>(`${this.baseURL}?categoria=${idCategoria}`);
    }

    public buscarPorId(id: number): Observable<Parcelado>{
        return this.http.get<Parcelado>(`${this.baseURL}/${id}`);
    }

    public salvar(id: number, idCategoria:number, parcelado: ParceladoDados): Observable<Parcelado>{

        if(id == 0){ // cadastrar

           return this.http.post<Parcelado>(`${this.baseURL}?categoria=${idCategoria}`,parcelado);

        }else{ //Atualizar

            return this.http.put<Parcelado>(`${this.baseURL}/${id}`,parcelado);

        }

    }

    public listarParcelas(idParcelado:number): Observable<Parcela[]>{
        return this.http.get<Parcela[]>(`${this.baseURL}/${idParcelado}/parcelas`);
    }

    public excluir(id: number): Observable<any>{
        return this.http.delete<any>(`${this.baseURL}/${id}`);
    }

}

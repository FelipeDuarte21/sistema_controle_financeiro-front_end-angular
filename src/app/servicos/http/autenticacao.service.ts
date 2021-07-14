import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Autenticacao } from "../../modelos/autenticacao.model";


@Injectable()
export class AutenticacaoService{

    private baseURL = `${environment.apiURL}`;

    constructor(
        private http: HttpClient
    ){}

    public login(autenticacao: Autenticacao):Observable<any>{
        return this.http.post<any>(`${this.baseURL}/login`,autenticacao,{observe: 'response'});
    }

}
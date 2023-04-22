import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Token } from "src/app/modelos/token.model";
import { environment } from "src/environments/environment";
import { Autenticacao } from "../../modelos/autenticacao.model";


@Injectable()
export class AutenticacaoService{

    private baseURL = `${environment.apiURL}/api/v1/auth`;

    constructor(
        private http: HttpClient
    ){}

    public login(autenticacao: Autenticacao):Observable<Token>{
        return this.http.post<any>(`${this.baseURL}/login`,autenticacao);
    }

}

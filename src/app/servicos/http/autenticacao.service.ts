import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RecuperaSenha } from "src/app/modelos/recupera-senha.model";
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

    public refreshToken():Observable<any>{
        return this.http.post<any>(`${this.baseURL}/api/auth/refresh-token`,null, {observe: 'response'});
    }

    public recuperarSenha(email: RecuperaSenha):Observable<any>{
        return this.http.post<any>(`${this.baseURL}/api/auth/reset-senha`,email);
    }

}
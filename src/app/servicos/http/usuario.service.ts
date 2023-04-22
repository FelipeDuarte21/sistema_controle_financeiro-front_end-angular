import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UsuarioDados } from "../../modelos/usuarioDados.model";
import { Usuario } from "../../modelos/usuario.model";

@Injectable()
export class UsuarioService{

    private baseURL = `${environment.apiURL}/api/v1/usuario`;

    constructor(
        private http: HttpClient
    ){}

    public cadastrar(usuario: UsuarioDados):Observable<Usuario>{
        return this.http.post<Usuario>(this.baseURL,usuario);
    }

    public atualizar(id:number,usuario: UsuarioDados):Observable<Usuario>{
        return this.http.put<Usuario>(`${this.baseURL}/${id}`,usuario);
    }

    public buscarPorId(id:number):Observable<Usuario>{
        return this.http.get<Usuario>(`${this.baseURL}/${id}`);
    }

    public excluir(id:number):Observable<any>{
        return this.http.delete<any>(`${this.baseURL}/${id}`);
    }

}

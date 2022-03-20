import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UsuarioSalvar } from "../../modelos/usuario-salvar.model";
import { Usuario } from "../../modelos/usuario.model";

@Injectable()
export class UsuarioService{

    private baseURL = `${environment.apiURL}/api/usuarios`;

    constructor(
        private http: HttpClient
    ){}

    public cadastrar(usuario: UsuarioSalvar):Observable<Usuario>{
        return this.http.post<Usuario>(this.baseURL,usuario);
    }

    public atualizar(id:number,usuario: UsuarioSalvar):Observable<Usuario>{
        return this.http.put<Usuario>(`${this.baseURL}/${id}`,usuario);
    }

    public buscarPorEmail(email:string):Observable<Usuario>{
        return this.http.get<Usuario>(`${this.baseURL}/email/${email}`);
    }

    public buscarPorId(id:number):Observable<Usuario>{
        return this.http.get<Usuario>(`${this.baseURL}/${id}`);
    }

    public excluir(id:number):Observable<any>{
        return this.http.delete<any>(`${this.baseURL}/${id}`);
    }

}
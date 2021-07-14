import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UsuarioCadastro } from "../../modelos/usuario-cadastro.model";
import { Usuario } from "../../modelos/usuario.model";

@Injectable()
export class UsuarioService{

    private baseURL = `${environment.apiURL}/usuario`;

    constructor(
        private http: HttpClient
    ){}

    public cadastrar(usuario: UsuarioCadastro):Observable<Usuario>{
        return this.http.post<Usuario>(this.baseURL,usuario);
    }

    public buscarPorEmail(email:string):Observable<Usuario>{
        return this.http.get<Usuario>(`${this.baseURL}/email?email=${email}`);
    }

}
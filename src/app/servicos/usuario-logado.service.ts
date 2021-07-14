import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Usuario } from "../modelos/usuario.model";
import { TokenService } from "./token.service";
import { UsuarioService } from "./usuario.service";

@Injectable({providedIn: 'root'})
export class UsuarioLogadoService{

    private usuarioSubject = new BehaviorSubject<Usuario>(null);

    constructor(
        private tokenService: TokenService,
        private usuarioService: UsuarioService
    ){}

    public logarUsuario(email:string, token:string){
        this.tokenService.setToken(token);
        window.sessionStorage.setItem("email",email);
        this.buscarUsuario(email);
    }

    private buscarUsuario(email:string){
        this.usuarioService.buscarPorEmail(email).subscribe(
            usuario => {
                this.usuarioSubject.next(usuario);
            }
        );
    }

    public recuperarUsuario(): Observable<Usuario>{
        return this.usuarioSubject.asObservable();
    }

    public isUsuarioLogado(): boolean{
        if(!this.tokenService.temToken()) return false;
        let email = window.sessionStorage.getItem("email");
        this.buscarUsuario(email);
        return true;
    }

    public deslogarUsuario(){
        this.usuarioSubject.next(null);
        this.tokenService.excluirToken();
    }

}
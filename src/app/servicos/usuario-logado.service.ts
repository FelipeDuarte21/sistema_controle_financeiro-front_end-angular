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

    logarUsuario(email:string, token:string){
        this.tokenService.setToken(token);
        this.usuarioService.buscarPorEmail(email).subscribe(
            usuario => {
                this.usuarioSubject.next(usuario);
            }
        );
    }

    recuperarUsuario(): Observable<Usuario>{
        return this.usuarioSubject.asObservable();
    }

    recuperarToken(): string{
        if(!this.tokenService.temToken()) return null;
        return this.tokenService.getToken();
    }

    deslogarUsuario(){
        this.usuarioSubject.next(null);
        this.tokenService.excluirToken();
    }

}
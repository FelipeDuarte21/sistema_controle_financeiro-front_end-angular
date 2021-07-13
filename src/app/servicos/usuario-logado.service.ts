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
        let usuario: Usuario = null;
        this.recuperarUsuario().subscribe(usu => {
            usuario = usu;
        });
        return (usuario != null) ? true: false;
    }

    public deslogarUsuario(){
        this.usuarioSubject.next(null);
        this.tokenService.excluirToken();
    }

}
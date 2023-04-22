import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Usuario } from "../../modelos/usuario.model";
import { TokenService } from "./token.service";
import { UsuarioService } from '../http/usuario.service';

@Injectable({providedIn: 'root'})
export class UsuarioLogadoService{

    private usuarioSubject = new BehaviorSubject<Usuario | null>(null);

    private ATRIBUTO_USUARIO:string = "id";

    constructor(
        private tokenService: TokenService,
        private usuarioService: UsuarioService
    ){}

    public logarUsuario(id:number, token:string){
        this.tokenService.setToken(token);
        window.sessionStorage.setItem(this.ATRIBUTO_USUARIO,id.toString());
        this.buscarUsuario(id);
    }

    private buscarUsuario(id:number){
        this.usuarioService.buscarPorId(id).subscribe({
            next: usuario => {
                this.usuarioSubject.next(usuario);
            }
        });
    }

    public recuperarUsuario(): Observable<Usuario | null>{
        return this.usuarioSubject.asObservable();
    }

    public isUsuarioLogado(): boolean{
        if(!this.tokenService.temToken()) return false;
        let id = window.sessionStorage.getItem(this.ATRIBUTO_USUARIO) as string;
        this.buscarUsuario(parseInt(id));
        return true;
    }

    public deslogarUsuario(){
        this.usuarioSubject.next(null);
        this.tokenService.excluirToken();
        window.sessionStorage.removeItem(this.ATRIBUTO_USUARIO);
    }

}

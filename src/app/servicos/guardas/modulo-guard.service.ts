import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UsuarioLogadoService } from "../internos/usuario-logado.service";

@Injectable()
export class ModuloGuardService implements CanActivate{

    constructor(
        private usuarioLogadoService: UsuarioLogadoService,
        private router: Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        window.sessionStorage.setItem("rota",state.url);

        if(!this.usuarioLogadoService.isUsuarioLogado()){
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }

}
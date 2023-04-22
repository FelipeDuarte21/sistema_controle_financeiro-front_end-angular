import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UsuarioLogadoService } from "../internos/usuario-logado.service";

@Injectable()
export class AutenticacaoGuardService implements CanActivate{

    constructor(
        private usuarioLogado: UsuarioLogadoService,
        private router: Router,
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if(this.usuarioLogado.isUsuarioLogado()){

            this.router.navigate(['/categoria']);

            return false;
        }

        return true;
    }

}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AutenticacaoService } from "../http/autenticacao.service";
import { TokenService } from "./token.service";
import { UsuarioLogadoService } from "./usuario-logado.service";

@Injectable({providedIn: 'root'})
export class InterceptorService implements HttpInterceptor{

    constructor(
        private tokenService: TokenService,
        private router: Router,
        private autenticacaoService: AutenticacaoService,
        private usuarioLogadoService: UsuarioLogadoService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(req.url.match('/api/auth/refresh-token')){

            let token = this.tokenService.getToken();

            req = req.clone({
                setHeaders: {
                    "Authorization":token
                }
            });

            return next.handle(req);
        }

        if(!req.url.match('/login')){

            let token = this.tokenService.getToken();

            this.autenticacaoService.refreshToken().subscribe(
                resp => {
                    
                    token = resp.headers.get('Authorization');

                    this.tokenService.setToken(token);
                    
                },
                error => {
                    this.usuarioLogadoService.deslogarUsuario();
                    this.router.navigate(['/login']);
                }
            );

            req = req.clone({
                setHeaders: {
                    "Authorization":token
                }
            });

        }

        return next.handle(req);
    }

}
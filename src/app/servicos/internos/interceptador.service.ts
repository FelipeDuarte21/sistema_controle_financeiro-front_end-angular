import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";

@Injectable({providedIn: 'root'})
export class InterceptorService implements HttpInterceptor {

    constructor(
        private tokenService: TokenService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.match('/api/v1/usuario') && req.method.match('POST')) {
            return next.handle(req);
        }

        if (req.url.match('/api/v1/auth/login')) {
            return next.handle(req);
        }

        //Para as demais requisições http

        let token = this.tokenService.getToken() as string;

        req = req.clone({
            setHeaders: {
                "Authorization": token
            }
        });

        return next.handle(req);

    }

}

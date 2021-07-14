import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";

@Injectable({providedIn: 'root'})
export class InterceptorService implements HttpInterceptor{

    constructor(
        private tokenService: TokenService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
        if(!req.url.match('/login')){

            let token = this.tokenService.getToken();

            req = req.clone({
                setHeaders: {
                    "Authorization":token
                }
            });

        }

        return next.handle(req);
    }

}
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class TokenService{

    private NOME_TOKEN = "token";

    constructor(){}

    setToken(token: string){
        window.sessionStorage.setItem(this.NOME_TOKEN, token);
    }

    getToken():string{
        return window.sessionStorage.getItem(this.NOME_TOKEN);
    }

    excluirToken(){
        return window.sessionStorage.removeItem(this.NOME_TOKEN);
    }

    temToken():boolean{
        return !!this.getToken();
    }

}
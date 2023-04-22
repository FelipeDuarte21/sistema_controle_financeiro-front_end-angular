import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class TokenService{

    private NOME_TOKEN = "token";

    constructor(){}

    public setToken(token: string){
        window.sessionStorage.setItem(this.NOME_TOKEN, token);
    }

    public getToken():string | null{
        return window.sessionStorage.getItem(this.NOME_TOKEN);
    }

    public excluirToken(){
        return window.sessionStorage.removeItem(this.NOME_TOKEN);
    }

    public temToken():boolean{
        return !!this.getToken();
    }

}

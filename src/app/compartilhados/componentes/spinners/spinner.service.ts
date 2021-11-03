import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class SpinnerService{

    private controleSpinner = new Subject<boolean>();

    private controle:boolean = false;

    private opcao:number = 0;

    public startSpinner(){
        this.controle = true;
        this.controleSpinner.next(true);
    }
    
    public stopSpinner(){
        this.controle = false;
        this.controleSpinner.next(false);
    }

    public getControle():boolean{
        return this.controle;
    }

    public getOpcao():number{
        return this.opcao;
    }

    public setOpcao(opcao:number){
        this.opcao = opcao;
    }

    public getControleSpinner():Observable<boolean>{
        return this.controleSpinner.asObservable();
    }

}
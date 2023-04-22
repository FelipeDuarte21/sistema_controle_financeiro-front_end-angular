import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class SpinnerService{

    private eventoSpinner = new Subject<boolean>();

    private ativa:boolean = false;

    public ativarSpinner(){
        this.ativa = true;
        this.setEventoSpinner(this.ativa);
    }
    
    public desativarSpinner(){
        this.ativa = false;
        this.setEventoSpinner(this.ativa);
    }

    private setEventoSpinner(ativa: boolean){
        this.eventoSpinner.next(ativa);
    }

    public getEventoSpinner():Observable<boolean>{
        return this.eventoSpinner.asObservable();
    }

}
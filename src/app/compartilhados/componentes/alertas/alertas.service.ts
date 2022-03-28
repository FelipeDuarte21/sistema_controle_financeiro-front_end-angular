import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { TipoAlerta } from "./alertas.enum";
import { AlertasModel } from "./alertas.model";

@Injectable()
export class AlertasService{

    private TEMPO_FECHAMENTO_ALERTA: number = 4000;

    private eventoAlerta = new Subject<AlertasModel>();

    private setEventoAlerta(ativo:boolean,mensagem:string,tipo: TipoAlerta, tempo:boolean, qtdTempo:number){
        let evento = {tipo,mensagem,ativo} as AlertasModel;
        this.eventoAlerta.next(evento);
        if(tempo) this.fechaAlerta(evento,qtdTempo);
    }

    private fechaAlerta(evento: AlertasModel, qtdTempo:number){
        setTimeout(() => {
            evento.ativo = false;
            this.eventoAlerta.next(evento);
        }, qtdTempo);
    }

    public getEventoAlerta():Observable<AlertasModel>{
        return this.eventoAlerta.asObservable();
    }

    public alertaSucesso(mensagem:string, tempo:boolean = true, qtdTempo = this.TEMPO_FECHAMENTO_ALERTA){
        this.setEventoAlerta(true,mensagem,TipoAlerta.SUCESSO, tempo, qtdTempo);
    }

    public alertaAviso(mensagem:string, tempo:boolean = true, qtdTempo = this.TEMPO_FECHAMENTO_ALERTA){
        this.setEventoAlerta(true,mensagem,TipoAlerta.AVISO, tempo, qtdTempo);
    }

    public alertaErro(mensagem:string, tempo:boolean = true, qtdTempo = this.TEMPO_FECHAMENTO_ALERTA){
        this.setEventoAlerta(true,mensagem,TipoAlerta.ERRO, tempo, qtdTempo);
    }

}
import { Component, OnInit } from "@angular/core";
import { AlertasModel } from "./alertas.model";
import { AlertasService } from "./alertas.service";
import { TipoAlerta } from "./alertas.enum";

@Component({
    selector: 'alertas',
    templateUrl: './alertas.component.html',
    styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit{

    private CLASSES_ALERTAS: Array<string> = ['alert-success','alert-warning','alert-danger'];
    private CLASSES_ICONES: Array<string> = ['fa-smile','fa-exclamation-triangle','fa-frown'];

    public exibe: boolean = false;
    public alerta:string = '';
    public icone:string = '';
    public mensagem:string = '';

    constructor(
        private alertasService: AlertasService
    ){}

    ngOnInit(): void {
        this.alertasService.getEventoAlerta().subscribe({
            next: alerta => {
                this.organizarExibicao(alerta);
            },
            error: error => {
                console.log(error);
            }
        });
    }

    private organizarExibicao(alerta: AlertasModel){
        this.exibe = alerta.ativo;
        this.mensagem = alerta.mensagem;
        switch(alerta.tipo){
            case TipoAlerta.SUCESSO:
                this.alerta = this.CLASSES_ALERTAS[0];
                this.icone = this.CLASSES_ICONES[0];
                break;
            case TipoAlerta.AVISO:
                this.alerta = this.CLASSES_ALERTAS[1];
                this.icone = this.CLASSES_ICONES[1];
                break;
            case TipoAlerta.ERRO:
                this.alerta = this.CLASSES_ALERTAS[2];
                this.icone = this.CLASSES_ICONES[2];
                break
        }
    }

}

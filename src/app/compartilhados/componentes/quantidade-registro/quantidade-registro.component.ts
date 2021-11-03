import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'quantidade-registro',
    templateUrl: './quantidade-registro.component.html',
    styleUrls: ['./quantidade-registro.component.css']
})
export class QuantidadeRegistroComponent{
    
    @Input() qtdOpcoes:Array<number>;
    @Input() opcaoEscolhida:number = 0;

    @Output() change:EventEmitter<number> = new EventEmitter();

    onChange(evento:any){
        this.change.emit(evento.value);
    }

}
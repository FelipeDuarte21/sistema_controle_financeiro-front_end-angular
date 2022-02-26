import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'barra-navegacao',
    templateUrl: './barra-navegacao.component.html',
    styleUrls: ['./barra-navegacao.component.css']
})
export class BarraNavegacaoComponent{

    @Input() qtdOpcoes:Array<number>;
    @Input() qtdAtual:number;
    @Output() mudarQuantidade:EventEmitter<number> = new EventEmitter();

    @Input() totalPagina:number;
    @Input() paginaAtual:number;
    @Output() mudarPagina:EventEmitter<number> = new EventEmitter();


    onMudarQuantidade(opcao:number){
        this.mudarQuantidade.emit(opcao);
    }

    onMudarPagina(pagina:number){
        console.log(pagina);
        this.mudarPagina.emit(pagina);
    }

}
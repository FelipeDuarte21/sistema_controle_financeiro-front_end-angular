import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'barra-navegacao',
    templateUrl: './barra-navegacao.component.html',
    styleUrls: ['./barra-navegacao.component.css']
})
export class BarraNavegacaoComponent{

    //Quantidade Por Página
    @Input() qtdOpcoes:Array<number>;
    @Input() quantidadeAtual: number;
    @Output() mudarQuantidade: EventEmitter<number> = new EventEmitter();

    //Paginação
    @Input() paginaAtual:number;
    @Input() totalPagina:number;
    @Output() mudarPagina: EventEmitter<number> = new EventEmitter();

    //Grid
    @Input() escolhaGrid:object;
    @Output() alternarGrid:EventEmitter<object> = new EventEmitter();

    onMudarQuantidade(qtd: number){
        this.mudarQuantidade.emit(qtd);
    }

    onMudarPagina(pagina:number){
        this.mudarPagina.emit(pagina);
    }
    
    onAlternarGrid(opcao:object){
        this.alternarGrid.emit(opcao);
    }


}
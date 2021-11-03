import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'paginacao',
    templateUrl: './paginacao.component.html',
    styleUrls: ['./paginacao.component.css']
})
export class PaginacaoComponent{

    @Input() totalPagina:number;
    @Input() paginaAtual:number;

    @Output() anterior: EventEmitter<number> = new EventEmitter();
    @Output() proximo: EventEmitter<number> = new EventEmitter();

    onAnterior(){
        let pagina = this.paginaAtual-1;
        this.anterior.emit(pagina);
    }

    onProximo(){
        let pagina = this.paginaAtual+1;
        this.anterior.emit(pagina);
    }

}
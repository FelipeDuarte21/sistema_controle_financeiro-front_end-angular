import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Categoria } from "src/app/modelos/categoria.model";

@Component({
    selector: 'grid-tabela',
    templateUrl: './grid-tabela.component.html',
    styleUrls: ['./grid-tabela.component.css']
})
export class GridTabelaComponent{

    @Input() categorias: Array<Categoria>;
    @Output() excluir: EventEmitter<number> = new EventEmitter();

    onClick(id:number){
        this.excluir.emit(id);
    }

}
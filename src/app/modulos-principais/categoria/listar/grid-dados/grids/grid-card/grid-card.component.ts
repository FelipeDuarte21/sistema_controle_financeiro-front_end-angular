import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Categoria } from "src/app/modelos/categoria.model";

@Component({
    selector: 'grid-card',
    templateUrl: './grid-card.component.html',
    styleUrls: ['./grid-card.component.css']
})
export class GridCardComponent{

    @Input() categorias:Array<Categoria>;
    @Output() excluir: EventEmitter<number> = new EventEmitter();

    onClick(id:number){
        this.excluir.emit(id);
    }

}
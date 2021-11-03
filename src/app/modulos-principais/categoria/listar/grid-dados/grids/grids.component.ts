import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Categoria } from "src/app/modelos/categoria.model";

@Component({
    selector: 'grids',
    templateUrl: './grids.component.html',
    styleUrls: ['./grids.component.css']
})
export class GridsComponent{
    
    @Input() escolhaGrid:object;
    @Input() categorias: Array<Categoria>;
    @Output() excluir: EventEmitter<number> = new EventEmitter();

    onExcluir(id:number){
        this.excluir.emit(id);
    }

}
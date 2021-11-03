import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Lancamento } from "src/app/modelos/lancamento.model";
import { EnumTipo } from "src/app/modelos/tipo.model";

@Component({
    selector: 'grid-card',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class GridCardComponent{

    @Input() lancamentos: Array<Lancamento>;
    @Input() balancoFechado:boolean;
    @Input() parametrosEditar:object;
    @Output() excluir: EventEmitter<number> = new EventEmitter();

    public PROVENTO:number = EnumTipo.Provento;
    public DESPESA:number = EnumTipo.Despesa;

    onExcluir(id:number){
        this.excluir.emit(id);
    }

}
import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'btn-excluir',
    templateUrl: './btn-excluir.component.html',
    styleUrls: ['./btn-excluir.component.css']
})
export class BtnExcluirComponent{

    @Input() id:number;
    @Output() excluir: EventEmitter<number> = new EventEmitter();

    onClick(){
        this.excluir.emit(this.id);
    }

}
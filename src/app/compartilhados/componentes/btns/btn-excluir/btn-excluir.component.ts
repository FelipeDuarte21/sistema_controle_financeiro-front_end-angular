import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'btn-excluir',
    templateUrl: './btn-excluir.component.html',
    styleUrls: ['./btn-excluir.component.css']
})
export class BtnExcluirComponent{

    @Input() id:number | undefined = 0;
    @Output() excluir: EventEmitter<number> = new EventEmitter();
    @Input() desativado:boolean | undefined = false;

    onClick(){
        this.excluir.emit(this.id);
    }

}

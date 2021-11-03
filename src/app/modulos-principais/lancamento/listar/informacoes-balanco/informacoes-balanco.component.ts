import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Balanco } from "src/app/modelos/balanco.model";

@Component({
    selector: 'info-balanco',
    templateUrl: './informacoes-balanco.component.html',
    styleUrls: ['./informacoes-balanco.component.css']
})
export class InformacoesBalancoComponent{

    @Input() balanco: Balanco;
    @Output() mudarBalanco: EventEmitter<object> = new EventEmitter();

    public balancoAnterior:boolean = true;
    public balancoPosterior:boolean = true;
    public balancoAtual:boolean = true;
 
    public isAnterior():boolean{
        if(this.balanco == null) return false;
        return true;
    }

    public isPosteriorEAtual():boolean{
        let dataAtual = new Date();
        if(this.balanco.mes == dataAtual.getMonth()+1) return false;
        return true;
    }

    public buscarPorMesAnterior(){
        let data = new Date(this.balanco.ano,this.balanco.mes-1,1);
        data.setMonth(data.getMonth()-1);
        this.mudarBalanco.emit({mes:data.getMonth()+1,ano:data.getFullYear()});
    }

    public buscarPorMesPosterior(){
        let data = new Date(this.balanco.ano,this.balanco.mes-1,1);
        data.setMonth(data.getMonth()+1);
        this.mudarBalanco.emit({mes:data.getMonth()+1,ano:data.getFullYear()});
    }

    public buscarBalancoAtual(){
        let data = new Date();
        this.mudarBalanco.emit({mes:data.getMonth()+1,ano:data.getFullYear()});
    }

}
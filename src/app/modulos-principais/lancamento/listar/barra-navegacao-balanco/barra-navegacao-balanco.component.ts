import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BalancoFaixa } from "src/app/modelos/balanco-faixa";
import { Balanco } from "src/app/modelos/balanco.model";

@Component({
    selector: 'barra-navegacao-balanco',
    templateUrl: './barra-navegacao-balanco.component.html',
    styleUrls: ['./barra-navegacao-balanco.component.css']
})
export class BarraNavegacaoBalancoComponent implements OnInit{
    
    @Input() balancos: BalancoFaixa[] = [];
    @Input() balancoAtual: Balanco = null;

    @Output() mudarBalanco:EventEmitter<Object> = new EventEmitter();

    public formBuscaBalanco: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ){}

    ngOnInit(): void {
        this.formBuscaBalanco = this.formBuilder.group({
            data: ['']
        });
    }

    public navegarBalanco(ano:number, mes: number){
        let data = {ano,mes};
        this.mudarBalanco.emit(data);
    }

    public escolheBalanco(){
        let dataValor = this.formBuscaBalanco.get('data').value as string;
        let dataParte = dataValor.split('-');
        this.navegarBalanco(parseInt(dataParte[0]),parseInt(dataParte[1]));
    }

}
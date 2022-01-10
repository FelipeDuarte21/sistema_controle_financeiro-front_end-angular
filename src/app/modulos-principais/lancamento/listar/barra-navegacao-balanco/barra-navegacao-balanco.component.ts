import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Balanco } from "src/app/modelos/balanco.model";
import { BalancoDTO } from "src/app/modelos/balancoDTO.models";
import { BalancoService } from "src/app/servicos/http/balanco.service";

@Component({
    selector: 'barra-navegacao-balanco',
    templateUrl: './barra-navegacao-balanco.component.html',
    styleUrls: ['./barra-navegacao-balanco.component.css']
})
export class BarraNavegacaoBalancoComponent implements OnInit{
    
    @Input() balancos: BalancoDTO[] = [];
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

    public navegarBalanco(ano:number,mes:number){
        let data = {ano:ano,mes:mes};
        this.mudarBalanco.emit(data);
    }

    public escolheBalanco(){
        let dataValor = this.formBuscaBalanco.get('data').value as string;
        let dataParte = dataValor.split('-');
        this.navegarBalanco(parseInt(dataParte[0]),parseInt(dataParte[1]));
    }

}
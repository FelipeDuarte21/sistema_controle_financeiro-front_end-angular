import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Balanco } from "src/app/modelos/balanco.model";

@Component({
    selector: 'info-balanco',
    templateUrl: './informacoes-balanco.component.html',
    styleUrls: ['./informacoes-balanco.component.css']
})
export class InformacoesBalancoComponent implements OnInit{

    @Input() balanco: Balanco;
    @Output() mudarBalanco: EventEmitter<object> = new EventEmitter();

    public balancoAnterior:boolean = true;
    public balancoPosterior:boolean = true;
    public balancoAtual:boolean = true;

    public formPesquisaBalanco: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ){}

    ngOnInit(): void {
        this.formPesquisaBalanco = this.formBuilder.group({
            mesAno: []
        });
    }

    public buscarBalancoAtual(){
        let data = new Date();
        this.mudarBalanco.emit({mes:data.getMonth()+1,ano:data.getFullYear()});
    }

    public pesquisarBalanco(){
        let anoMes = this.formPesquisaBalanco.get("mesAno").value as string;
        let partes = anoMes.split("-");
        this.mudarBalanco.emit({ano: partes[0], mes: partes[1]});
    }

}
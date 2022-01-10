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
    
    constructor(){}

    ngOnInit(): void {
       
    }

}
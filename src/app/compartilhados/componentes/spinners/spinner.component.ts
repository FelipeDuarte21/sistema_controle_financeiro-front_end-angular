import { Component, Input, OnInit } from "@angular/core";
import { SpinnerService } from "./spinner.service";

@Component({
    selector: 'spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit{

    public opcao:number = 0;
    public exibe:boolean = false;

    constructor(
        private service:SpinnerService
    ){}

    ngOnInit(): void {
        this.opcao = this.service.getOpcao();
        this.service.getControleSpinner().subscribe(
            controle => {
                this.exibe = controle;
            }
        );
        console.log(this.opcao);
        console.log(this.exibe);
    }

}
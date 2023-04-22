import { Component, Input, OnInit } from "@angular/core";
import { SpinnerService } from "./spinner.service";

@Component({
    selector: 'spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit{

    public ativo:boolean = false;

    constructor(
        private service:SpinnerService
    ){}

    ngOnInit(): void {
        this.service.getEventoSpinner().subscribe({
            next: ativa => this.ativo = ativa
        });
    }

}

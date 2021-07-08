import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'lancamento',
    templateUrl: './lancamento.component.html',
    styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit{

    constructor(
        private activedRoute: ActivatedRoute
    ){}

    ngOnInit(): void {
        this.activedRoute.params.subscribe(resp => {
            let id = resp.idCategoria;
            localStorage.setItem("categoria",id);
        });
    }

}
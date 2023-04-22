import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'lancamento-salvar',
    templateUrl: './lancamento-salvar.component.html',
    styleUrls: ['./lancamento-salvar.component.css']
})
export class LancamentoSalvarComponent implements OnInit {

    public titulo: string = "Lancamentos - Fazer Lançamento";

    public idCategoria: number = 0;
    public idFolha:number = 0;
    public id:number = 0;

    constructor(
        private router: Router,
        private activedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {

        this.activedRoute.queryParams.subscribe({
            next: queryParams => {

                this.idCategoria = queryParams?.['categoria'];
                this.idFolha = queryParams?.['folha'];

                if (this.idCategoria == undefined || this.idCategoria == null || this.idCategoria == 0)
                    this.router.navigate(['/categoria']);

                if (this.idFolha == undefined || this.idFolha == null || this.idFolha == 0)
                    this.router.navigate(['/lancamentos'], { queryParams: { categoria: this.idCategoria } });

            },
            error: error => {
                this.router.navigate(['/categoria']);
            }
        })

        this.activedRoute.params.subscribe({
            next: params => {

                let id = params?.['id'];

                if (id != null) {
                    this.id = id;
                    this.titulo = "Lançamento - Atualizar";
                }

            },
            error: error => {
                this.router.navigate(['/categoria']);
            }
        });

    }

}

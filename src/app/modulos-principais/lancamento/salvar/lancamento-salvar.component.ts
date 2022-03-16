import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'lancamento-salvar',
    templateUrl: './lancamento-salvar.component.html',
    styleUrls: ['./lancamento-salvar.component.css']
})
export class LancamentoSalvarComponent implements OnInit {

    public titulo: string = "Lancamentos - Lançar";

    public idCategoria: number = 0;
    public idBalanco:number = 0;
    public id:number = 0;

    constructor(
        private router: Router,
        private activedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {

        this.activedRoute.queryParams.subscribe(
            queryParams => {
                
                this.idCategoria = queryParams.categoria;
                this.idBalanco = queryParams.balanco;
                 
                if (this.idCategoria == undefined || this.idCategoria == null || this.idCategoria == 0)
                    this.router.navigate(['/categorias']);

                if (this.idBalanco == undefined || this.idBalanco == null || this.idBalanco == 0)
                    this.router.navigate(['/lancamentos'], { queryParams: { categoria: this.idBalanco } });

            },
            error => {
                this.router.navigate(['/categorias']); 
            }
        )

        this.activedRoute.params.subscribe(
            params => {

                let id = params.id;

                if (id != null) {
                    this.id = id;
                    this.titulo = "Lançamentos - Atualizar";
                }

            },
            error => {
                this.router.navigate(['/categorias']);   
            }
        );

    }

}
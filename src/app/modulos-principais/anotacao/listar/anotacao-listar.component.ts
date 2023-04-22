import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { Anotacao } from "src/app/modelos/anotacao.model";
import { Categoria } from "src/app/modelos/categoria.model";
import { AnotacaoService } from "src/app/servicos/http/anotacao.service";
import { CategoriaService } from "src/app/servicos/http/categoria.service";

@Component({
    templateUrl: './anotacao-listar.component.html',
    styleUrls: ['./anotacao-listar.component.css']
})
export class AnotacaoListarComponent implements OnInit{

    public idCategoria:number = 0;

    public anotacoes: Anotacao[] = [];

    public categoria:Categoria | undefined;

    constructor(
        private activetedRoute: ActivatedRoute,
        private router: Router,
        private spinnerService: SpinnerService,
        private anotacaoService: AnotacaoService,
        private categoriaService: CategoriaService,
        private alertaService: AlertasService
    ){}


    ngOnInit(): void {

        this.spinnerService.ativarSpinner();

        this.activetedRoute.queryParams.subscribe(queryParams => {

            this.idCategoria = queryParams?.['categoria'];

            if(this.idCategoria==undefined || this.idCategoria==null || this.idCategoria==0) {
                this.spinnerService.desativarSpinner();
                this.router.navigate(['/categoria']);
            }

            this.categoriaService.buscarPorId(this.idCategoria).subscribe({
                next: categoria => {
                    this.categoria = categoria;
                },
                error: error => {
                    console.log(error);
                }
            });

            this.buscarAnotacoes();

        });

    }

    private buscarAnotacoes(){

        this.spinnerService.ativarSpinner();

        this.anotacaoService.listar(this.idCategoria).subscribe({
            next: anotacoes => {
                this.anotacoes = anotacoes;
                this.spinnerService.desativarSpinner();
            },
            error: error => {
                this.router.navigate(['/categoria']);
                this.spinnerService.desativarSpinner();
            }
        });

    }

    public riscar(id:number){

        this.spinnerService.ativarSpinner();

        this.anotacaoService.riscar(id).subscribe({
            next: resp => {
                this.buscarAnotacoes();
                this.spinnerService.desativarSpinner();
            },
            error: error => {
                console.log(error);
                this.spinnerService.desativarSpinner();
            }
        });

    }

    public excluir(id:number){

        let c = confirm("Deseja realmente excluir a anotação?");

        if(c){

            this.spinnerService.ativarSpinner();

            this.anotacaoService.excluir(id).subscribe({
                next: () => {
                    this.buscarAnotacoes();
                    this.alertaService.alertaSucesso("Sucesso ao excluir anotação!");
                    this.spinnerService.desativarSpinner();
                },
                error: () => {
                    this.alertaService.alertaErro("Erro ao excluir anotação!");
                    this.spinnerService.desativarSpinner();
                }
            });

        }

    }

}

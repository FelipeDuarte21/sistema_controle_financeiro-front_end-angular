import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { Categoria } from "src/app/modelos/categoria.model";
import { Parcelado } from "src/app/modelos/parcelado.model";
import { CategoriaService } from "src/app/servicos/http/categoria.service";
import { ParceladoService } from "src/app/servicos/http/parcelado.service";

@Component({
    templateUrl: './parcelados-listar.component.html',
    styleUrls: ['./parcelados-listar.component.css']
})
export class ParceladosListarComponent implements OnInit{

    public idCategoria:number = 0;

    public parcelados: Parcelado[] = [];

    public categoria:Categoria | undefined;

    constructor(
        private activetedRoute: ActivatedRoute,
        private router: Router,
        private spinnerService: SpinnerService,
        private parceladoService: ParceladoService,
        private categoriaService: CategoriaService,
        private alertaService: AlertasService
    ){}

    ngOnInit(): void {

        this.spinnerService.ativarSpinner();

        this.activetedRoute.queryParams.subscribe({
            next: queryParams => {

                this.idCategoria = queryParams?.['categoria'];

                if(this.idCategoria==undefined || this.idCategoria==null || this.idCategoria==0) {
                    this.spinnerService.desativarSpinner();
                    this.router.navigate(['/categoria']);
                }

                this.spinnerService.ativarSpinner();

                this.categoriaService.buscarPorId(this.idCategoria).subscribe({
                    next: categoria => {
                        this.categoria = categoria;
                        this.spinnerService.desativarSpinner();
                    },
                    error: error => {
                        console.log(error);
                        this.spinnerService.desativarSpinner();
                    }
                });

                this.buscarParcelados();

            }
        });

    }

    private buscarParcelados(){

        this.spinnerService.ativarSpinner();

        this.parceladoService.listar(this.idCategoria).subscribe({
            next: parcelados => {

                this.parcelados = parcelados;

                this.spinnerService.desativarSpinner();
            },
            error: error => {
                this.router.navigate(['/categoria']);
                this.spinnerService.desativarSpinner();
            }
        });

    }

    public excluir(id:number){

        let c = confirm("Deseja realmente excluir o parcelado?");

        if(c){

            this.spinnerService.ativarSpinner();

            this.parceladoService.excluir(id).subscribe({
                next: () => {
                    this.alertaService.alertaSucesso("Sucesso ao excluir parcelado!");
                    this.buscarParcelados();
                },
                error: () => {
                    this.alertaService.alertaErro("Erro ao excluir anotação!");
                    this.spinnerService.desativarSpinner();
                }
            });

        }

    }

}

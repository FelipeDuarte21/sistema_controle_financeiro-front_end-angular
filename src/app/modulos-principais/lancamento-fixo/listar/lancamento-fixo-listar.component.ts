import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { LancamentoFixo } from "src/app/modelos/lancamentoFixo.model";
import { CategoriaService } from "src/app/servicos/http/categoria.service";
import { LancamentoFixoService } from "src/app/servicos/http/lancamento-fixo.service";

@Component({
    selector: 'lancamento-fixo-listar',
    templateUrl: './lancamento-fixo-listar.component.html',
    styleUrls: ['./lancamento-fixo-listar.component.css']
})
export class LancamentoFixoListarComponent implements OnInit{

    public idCategoria:number = 0;

    public lancamentosFixos: LancamentoFixo[] = [];

    public nomeCategoria:string = '';

    constructor(
        private activedRoute: ActivatedRoute,
        private router: Router,
        private lancamentoFixosService: LancamentoFixoService,
        private spinnerService: SpinnerService,
        private alertaService: AlertasService,
        private categoriaService: CategoriaService
    ){}

    ngOnInit(): void {

        this.spinnerService.ativarSpinner();

        this.activedRoute.queryParams.subscribe({
            next: queryParams => {

                this.idCategoria = queryParams?.['categoria'];

                if(this.idCategoria==undefined || this.idCategoria==null || this.idCategoria==0) {
                    this.spinnerService.desativarSpinner();
                    this.router.navigate(['/categoria']);
                }

                this.spinnerService.ativarSpinner();
                this.categoriaService.buscarPorId(this.idCategoria).subscribe({
                    next: categoria => {
                        this.nomeCategoria = categoria.nome;
                        this.spinnerService.desativarSpinner();
                    },
                    error: error => {
                        console.log(error);
                        this.spinnerService.desativarSpinner();
                    }
                });

                this.buscarLancamentosFixos();

            }
        });

    }

    private buscarLancamentosFixos(){

        this.spinnerService.ativarSpinner();

        this.lancamentoFixosService.listar(this.idCategoria).subscribe({
            next: lancamentosFixos => {
                this.lancamentosFixos = lancamentosFixos;
                this.spinnerService.desativarSpinner();
            },
            error: error => {
                this.router.navigate(['/categoria']);
                this.spinnerService.desativarSpinner();
            }
        });

    }

    public excluir(id:number){

        let c = confirm("Deseja realmente excluir o lancamento?");

        if(c){

            this.lancamentoFixosService.excluir(id).subscribe({
                next: resp => {
                    this.buscarLancamentosFixos();
                    this.alertaService.alertaSucesso("Sucesso ao excluir lançamento!");
                },
                error: error => {
                    this.alertaService.alertaErro("Erro ao excluir lançamento!");
                }
            });

        }

    }

}

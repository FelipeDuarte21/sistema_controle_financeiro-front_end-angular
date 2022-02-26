import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { Categoria } from "src/app/modelos/categoria.model";
import { PaginaAnotacaoCategoria } from "src/app/modelos/pagina-anotacao-categoria.model";
import { AnotacaoCategoriaService } from "src/app/servicos/http/anotacao-categoria.service";
import { CategoriaService } from "src/app/servicos/http/categoria.service";

@Component({
    templateUrl: './anotacao-categoria-listar.component.html',
    styleUrls: ['./anotacao-categoria-listar.component.css']
})
export class AnotacaoCategoriaListarComponent implements OnInit{

    public idCategoria:number = 0;

    public paginaAnotacoes: PaginaAnotacaoCategoria;

    public categoria:Categoria;

    public qtdOpcoes = [10,20,30];
    public quantidadeAtual = this.qtdOpcoes[0];

    private paginaAtual = 0;
    
    private ordem = 2;

    constructor(
        private activetedRoute: ActivatedRoute,
        private router: Router,
        private spinnerService: SpinnerService,
        private anotacaoService: AnotacaoCategoriaService,
        private categoriaService: CategoriaService,
        private alertaService: AlertasService
    ){}


    ngOnInit(): void {
        
        this.spinnerService.ativarSpinner();

        this.activetedRoute.queryParams.subscribe(queryParams => {

            this.idCategoria = queryParams.categoria

            if(this.idCategoria==undefined || this.idCategoria==null || this.idCategoria==0) {
                this.spinnerService.desativarSpinner();
                this.router.navigate(['/categoria']);
            }

            this.categoriaService.buscarPorId(this.idCategoria).subscribe(
                categoria => {
                    this.categoria = categoria;
                },
                error => {
                    console.log(error);
                }
            );

            this.buscarAnotacoes();

        });

    }

    private buscarAnotacoes(){

        this.anotacaoService.listar(this.idCategoria,this.paginaAtual,this.quantidadeAtual,this.ordem).subscribe(
            paginaAnotacoes => {
                this.paginaAnotacoes = paginaAnotacoes;
                this.spinnerService.desativarSpinner();
            },
            error => {
                this.router.navigate(['/categoria']);
                this.spinnerService.desativarSpinner();
            }
        );

    }

    public mudarQuantidade(quantidade:number){
        this.paginaAtual = 0;
        this.quantidadeAtual = quantidade;
        this.buscarAnotacoes();
    }

    public mudarPagina(pagina:number){
        this.paginaAtual = pagina;
        this.buscarAnotacoes();
    }

    public riscar(id:number){
        this.anotacaoService.riscar(this.idCategoria,id).subscribe(
            resp => {
                this.paginaAtual = 0;
                this.quantidadeAtual = this.qtdOpcoes[0];
                this.buscarAnotacoes();
            },
            error => {
                console.log(error);
            }
        );
    }

    public excluir(id:number){

        let c = confirm("Deseja realmente excluir a anotação?");

        if(c){

            this.anotacaoService.excluir(this.idCategoria,id).subscribe(
                resp => {
                    this.paginaAtual = 0;
                    this.quantidadeAtual = this.qtdOpcoes[0];
                    this.buscarAnotacoes();
                    this.alertaService.alertaSucesso("Sucesso ao excluir anotação!");
                },
                error => {
                    this.alertaService.alertaErro("Erro ao excluir anotação!");
                }
            );

        }

    }

}
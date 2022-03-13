import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { PaginaParcela } from "src/app/modelos/pagina-parcelas.model";
import { Parcelado } from "src/app/modelos/parcelado.model";
import { ParceladoService } from "src/app/servicos/http/parcelados.service";

@Component({
    templateUrl: './parcelas-listar.component.html',
    styleUrls: ['./parcelas-listar.component.css']
})
export class ParcelasListarComponent implements OnInit{

    public idCategoria:number = 0;

    public idParcelado: number = 0;

    public parcelado: Parcelado;

    public paginaParcelas: PaginaParcela;

    public qtdOpcoes = [10,20,30];
    public quantidadeAtual = this.qtdOpcoes[0];

    private paginaAtual = 0;
    
    private ordem = 1;

    constructor(
        private parceladoService: ParceladoService,
        private spinnerService: SpinnerService,
        private activetedRoute: ActivatedRoute,
        private router: Router
    ){}

    ngOnInit(): void {

        this.spinnerService.ativarSpinner();

        this.activetedRoute.queryParams.subscribe(queryParams => {

            this.idCategoria = queryParams.categoria;

            this.idParcelado = queryParams.parcelado;

            if(this.idCategoria==undefined || this.idCategoria==null || this.idCategoria==0) {
                this.spinnerService.desativarSpinner();
                this.router.navigate(['/categoria']);
            }

            if(this.idParcelado ==undefined || this.idParcelado ==null || this.idParcelado ==0) {
                this.spinnerService.desativarSpinner();
                this.router.navigate(['/categoria']);
            }

            this.buscarParcelado();
            this.buscarPaginaParcelas();

        });
        
    }

    private buscarParcelado(){

        this.parceladoService.buscarPorId(this.idCategoria,this.idParcelado).subscribe(
            parcelado => {
                this.parcelado = parcelado;
                this.spinnerService.desativarSpinner();
            },
            error => {
                this.router.navigate(['/categoria']);
                this.spinnerService.desativarSpinner();
            }
        );

    }

    private buscarPaginaParcelas(){

        this.parceladoService.listarParcelas(this.idParcelado,this.idCategoria, this.paginaAtual,
            this.quantidadeAtual,this.ordem).subscribe(
                pagParcelas => {
                    this.paginaParcelas = pagParcelas;
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
        this.buscarPaginaParcelas();
    }

    public mudarPagina(pagina:number){
        this.paginaAtual = pagina;
        this.buscarPaginaParcelas();
    }

}
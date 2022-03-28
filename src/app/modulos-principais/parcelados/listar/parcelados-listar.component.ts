import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { Categoria } from "src/app/modelos/categoria.model";
import { PaginaParcelado } from "src/app/modelos/pagina-parcelados.model";
import { Parcelado } from "src/app/modelos/parcelado.model";
import { CategoriaService } from "src/app/servicos/http/categoria.service";
import { ParceladoService } from "src/app/servicos/http/parcelados.service";

@Component({
    templateUrl: './parcelados-listar.component.html',
    styleUrls: ['./parcelados-listar.component.css']
})
export class ParceladosListarComponent implements OnInit{

    public idCategoria:number = 0;

    public paginaParcelados: PaginaParcelado;

    public categoria:Categoria;

    public qtdOpcoes = [10,20,30];
    public quantidadeAtual = this.qtdOpcoes[0];

    private paginaAtual = 0;

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

        this.activetedRoute.queryParams.subscribe(queryParams => {

            this.idCategoria = queryParams.categoria

            if(this.idCategoria==undefined || this.idCategoria==null || this.idCategoria==0) {
                this.spinnerService.desativarSpinner();
                this.router.navigate(['/categorias']);
            }

            this.categoriaService.buscarPorId(this.idCategoria).subscribe(
                categoria => {
                    this.categoria = categoria;
                },
                error => {
                    console.log(error);
                }
            );

            this.buscarParcelados();

        });

    }

    private buscarParcelados(){

        this.parceladoService.listar(this.idCategoria,this.paginaAtual,this.quantidadeAtual).subscribe(
            paginaParcelados => {
                this.paginaParcelados = paginaParcelados;
                this.spinnerService.desativarSpinner();
            },
            error => {
                this.router.navigate(['/categorias']);
                this.spinnerService.desativarSpinner();
            }
        );

    }

    public mudarQuantidade(quantidade:number){
        this.paginaAtual = 0;
        this.quantidadeAtual = quantidade;
        this.buscarParcelados();
    }

    public mudarPagina(pagina:number){
        this.paginaAtual = pagina;
        this.buscarParcelados();
    }

    public excluir(id:number){

        let c = confirm("Deseja realmente excluir o parcelado?");

        if(c){

            this.parceladoService.excluir(this.idCategoria,id).subscribe(
                resp => {
                    this.paginaAtual = 0;
                    this.quantidadeAtual = this.qtdOpcoes[0];
                    this.buscarParcelados();
                    this.alertaService.alertaSucesso("Sucesso ao excluir anotação!");
                },
                error => {
                    this.alertaService.alertaErro("Erro ao excluir anotação!");
                }
            );

        }

    }

    public calculaValorTotal(parcelado: Parcelado):number{
        let total = 0;
        parcelado.parcelas.forEach(p => total += p.valor);
        return total;
    }

}
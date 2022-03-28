import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { PaginaLancamentoSalvo } from "src/app/modelos/pagina-lancamento-salvo.model";
import { EnumTipo } from "src/app/modelos/tipo.model";
import { CategoriaService } from "src/app/servicos/http/categoria.service";
import { LancamentoSalvoService } from "src/app/servicos/http/lancamento-salvo.service";

@Component({
    selector: 'lancamento-salvo-listar',
    templateUrl: './lancamento-salvo-listar.component.html',
    styleUrls: ['./lancamento-salvo-listar.component.css']
})
export class LancamentoSalvoListarComponent implements OnInit{

    public idCategoria:number = 0;

    public qtdOpcoes = [10,20,30];
    public quantidadeAtual = this.qtdOpcoes[0];

    private paginaAtual = 0;

    public paginaLancamentosSalvos: PaginaLancamentoSalvo;

    public PROVENTO:number = EnumTipo.Provento;
    public DESPESA:number = EnumTipo.Despesa;

    public nomeCategoria:string = '';

    constructor(
        private activedRoute: ActivatedRoute, 
        private router: Router,
        private lancamentoSalvoService: LancamentoSalvoService,
        private spinnerService: SpinnerService,
        private alertaService: AlertasService,
        private categoriaService: CategoriaService
    ){}

    ngOnInit(): void {

        this.spinnerService.ativarSpinner();

        this.activedRoute.queryParams.subscribe(
            queryParams => {

                this.idCategoria = queryParams.categoria;

                if(this.idCategoria==undefined || this.idCategoria==null || this.idCategoria==0) {
                    this.spinnerService.desativarSpinner();
                    this.router.navigate(['/categorias']);
                }

                this.categoriaService.buscarPorId(this.idCategoria).subscribe(
                    categoria => {
                        this.nomeCategoria = categoria.nome;
                    },
                    error => {
                        console.log(error);
                    }
                );

                this.buscarLancamentosSalvos();

            }
        );

    }

    private buscarLancamentosSalvos(){

        this.lancamentoSalvoService.listar(this.idCategoria,this.paginaAtual,this.quantidadeAtual)
        .subscribe(
            paginaLancamentoSalvo => {
                this.paginaLancamentosSalvos = paginaLancamentoSalvo;
                if(paginaLancamentoSalvo.content.length != 0){
                    this.nomeCategoria = this.paginaLancamentosSalvos.content[0].categoria.nome;
                }
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
        this.buscarLancamentosSalvos();
    }

    public mudarPagina(pagina:number){
        this.paginaAtual = pagina;
        this.buscarLancamentosSalvos();
    }

    public excluir(id:number){

        let c = confirm("Deseja realmente excluir o lancamento?");

        if(c){

            this.lancamentoSalvoService.excluir(this.idCategoria,id).subscribe(
                resp => {
                    this.paginaAtual = 0;
                    this.quantidadeAtual = this.qtdOpcoes[0];
                    this.buscarLancamentosSalvos();
                    this.alertaService.alertaSucesso("Sucesso ao excluir lançamento!");
                },
                error => {
                    this.alertaService.alertaErro("Erro ao excluir lançamento!");
                }
            );

        }

    }

}
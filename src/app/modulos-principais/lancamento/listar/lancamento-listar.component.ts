import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { Categoria } from "src/app/modelos/categoria.model";
import { Folha } from "src/app/modelos/folha.model";
import { Lancamento } from "src/app/modelos/lancamento.model";
import { CategoriaService } from "src/app/servicos/http/categoria.service";
import { FolhaService } from "src/app/servicos/http/folha.service";
import { LancamentoService } from "src/app/servicos/http/lancamento.service";

@Component({
    selector: 'lancamento-listar',
    templateUrl: './lancamento-listar.component.html',
    styleUrls: ['./lancamento-listar.component.css']
})
export class LancamentoListarComponent implements OnInit{

    public idCategoria:number = 0;

    public folha: Folha | undefined;

    public categoria: Categoria | undefined;

    public folhas: Folha[] = [];

    public lancamentos: Lancamento[] = [];

    constructor(
        private folhaService: FolhaService,
        private activetedRoute: ActivatedRoute,
        private router: Router,
        private spinnerService: SpinnerService,
        private alertaService: AlertasService,
        private categoriaService: CategoriaService,
        private lancamentoService: LancamentoService
    ){}

    ngOnInit(): void {

        this.spinnerService.ativarSpinner();

        this.activetedRoute.queryParams.subscribe(queryParams => {

            this.idCategoria = queryParams?.['categoria'];

            if(this.idCategoria == undefined || this.idCategoria == null || this.idCategoria == 0) {
                this.spinnerService.desativarSpinner();
                this.router.navigate(['/categoria']);
            }

            this.spinnerService.desativarSpinner();

            this.buscarCategoria(this.idCategoria);

            this.buscarFolhaAtual(this.idCategoria);

            this.listarFolhasAnteriores(this.idCategoria);

        });

    }

    private buscarCategoria(idCategoria: number){
        this.spinnerService.ativarSpinner();
        this.categoriaService.buscarPorId(idCategoria).subscribe({
            next: categoria => {
                this.categoria = categoria;
                this.spinnerService.desativarSpinner();
            }
        });
    }

    private buscarFolhaAtual(idCategoria: number){
        this.spinnerService.ativarSpinner();
        this.folhaService.buscarAtual(idCategoria).subscribe({
            next: folha => {
                this.folha = folha;
                this.spinnerService.desativarSpinner();
                this.listarLancamentos(folha.id);
            },
            error: error => {
                this.router.navigate(['/categoria']);
            }
        });
    }

    private listarLancamentos(idFolha: number){
        this.spinnerService.ativarSpinner();
        this.lancamentoService.listar(idFolha).subscribe({
            next: lancamentos => {
                this.lancamentos = lancamentos;
                this.spinnerService.desativarSpinner();
            },
            error: error => {}
        })
    }

    private listarFolhasAnteriores(idCategoria: number){
        this.spinnerService.ativarSpinner();
        this.folhaService.listar(idCategoria).subscribe({
            next: folhas => {
                this.folhas = folhas;
                this.spinnerService.desativarSpinner();
            },
            error: () => {}
        });
    }

    public mudarFolha(folha: Folha){
        this.spinnerService.ativarSpinner();
        this.folha = folha;
        this.listarLancamentos(folha.id);
        this.spinnerService.desativarSpinner();
    }

    public excluir(id:number){

        let c = confirm("Deseja Realmente Excluir Lançamento?");

        if(c == true){

            this.spinnerService.ativarSpinner();

            this.folhaService.excluirLancamento(id,this.folha?.id).subscribe({
                next: () => {
                    this.spinnerService.desativarSpinner();
                    this.alertaService.alertaSucesso("Lançamento excluído com sucesso!");
                    this.buscarFolhaAtual(this.idCategoria);
                },
                error: error => {
                    this.spinnerService.desativarSpinner();
                    this.alertaService.alertaErro("Erro ao excluir alerta!");
                }
            });

        }

    }

    getStatusSaldoAtual(): number{
        if(this.folha){
            if(this.folha.saldoAtual > 0) return 1
            else if(this.folha.saldoAtual < 0) return -1
            else return 0
        }
        return 0
    }

}

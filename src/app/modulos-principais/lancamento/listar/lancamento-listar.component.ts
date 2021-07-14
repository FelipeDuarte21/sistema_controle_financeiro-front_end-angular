import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Balanco } from "src/app/modelos/balanco.model";
import { PaginaLancamento } from "src/app/modelos/pagina-lancamento.model";
import { EnumTipo } from "src/app/modelos/tipo.model";
import { BalancoService } from "src/app/servicos/balanco.service";
import { LancamentoService } from "src/app/servicos/lancamento.service";

@Component({
    selector: 'lancamento-listar',
    templateUrl: './lancamento-listar.component.html',
    styleUrls: ['./lancamento-listar.component.css']
})
export class LancamentoListarComponent implements OnInit{

    public balanco: Balanco;
    public paginaLancamentos: PaginaLancamento;

    public qtdOpcoes = [10,20,30];

    private paginaAtual = 0;
    private quantidadeAtual = this.qtdOpcoes[0];
    private ordem = 2;

    public PROVENTO:number = EnumTipo.Provento;
    public DESPESA:number = EnumTipo.Despesa;

    public idCategoria:number = 0;

    constructor(
        private balancoService: BalancoService,
        private lancamentoService: LancamentoService,
        private activetedRoute: ActivatedRoute,
        private router: Router,
    ){}

    ngOnInit(): void {
        this.activetedRoute.queryParams.subscribe(queryParams => {

            this.idCategoria = queryParams.categoria

            if(this.idCategoria==undefined || this.idCategoria==null 
                || this.idCategoria==0) this.router.navigate(['/categoria']);

            this.balancoService.buscarAtual(this.idCategoria).subscribe(
                balanco => {
                    this.balanco = balanco;
                    this.listarLancamentos();
                },
                error => {
                    this.router.navigate(['/categoria']);
                }
            );

        });
    }

    private listarLancamentos(){
        this.lancamentoService.buscarPorBalanco(this.balanco.id,this.paginaAtual,this.quantidadeAtual,this.ordem).subscribe(
            paginaLancamentos => {
                this.paginaLancamentos = paginaLancamentos;
            }
        );
    }

    public retrocederAnterior(){
        this.paginaAtual -= 1;
        this.listarLancamentos();
    }
    
    public avancarPagina(){
        this.paginaAtual += 1;
        this.listarLancamentos();
    }

    public mudarQuantidade(evento:any){
        this.paginaAtual = 0;
        this.quantidadeAtual = evento.value;
        this.listarLancamentos();
    }

    public excluir(id:number){
       
        let c = confirm("Deseja Realmente Excluir Lançamento?");

        if(c == true){

            this.lancamentoService.excluir(id).subscribe(
                resp => {
                    alert("Lançamento Excluído Com Sucesso!");
                    this.paginaAtual = 0;
                    this.quantidadeAtual = this.qtdOpcoes[0];
                    this.listarLancamentos();
                },
                error => {
                    console.log(error);
                    alert("Erro ao excluir Lançamento");
                }
            );

        }

    }

}
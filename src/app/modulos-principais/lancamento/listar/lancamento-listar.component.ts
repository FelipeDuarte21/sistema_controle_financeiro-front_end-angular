import { Component, OnInit } from "@angular/core";
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

    constructor(
        private balancoService: BalancoService,
        private lancamentoService: LancamentoService
    ){}

    ngOnInit(): void {
        let idCategoria = parseInt(localStorage.getItem("categoria"));

        this.balancoService.buscarAtual(idCategoria).subscribe(balanco => {
            this.balanco = balanco;
            localStorage.setItem("balanco",this.balanco.id.toString());
            this.listarLancamentos();
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

}
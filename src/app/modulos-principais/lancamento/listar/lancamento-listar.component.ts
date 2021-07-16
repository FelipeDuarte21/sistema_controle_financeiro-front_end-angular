import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Balanco } from "src/app/modelos/balanco.model";
import { PaginaLancamento } from "src/app/modelos/pagina-lancamento.model";
import { EnumTipo } from "src/app/modelos/tipo.model";
import { BalancoService } from "src/app/servicos/http/balanco.service";
import { LancamentoService } from "src/app/servicos/http/lancamento.service";

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

    public balancoAnterior:boolean = true;
    public balancoPosterior:boolean = true;
    public balancoAtual:boolean = true;

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

            this.buscarBalancoAtual();

        });
    }

    public buscarBalancoAtual(){
        this.balancoService.buscarAtual(this.idCategoria).subscribe(
            balanco => {
                this.balanco = balanco;
                this.controlaNavegacaoBalanco(balanco);
                this.listarLancamentos();
            },
            error => {
                this.router.navigate(['/categoria']);
            }
        );
    }

    private buscarBalancoPorData(idCategoria:number,mes:number,ano:number){
        this.balancoService.buscarPorData(idCategoria,mes,ano).subscribe(
            balanco => {
                this.balanco = balanco;
                this.paginaAtual = 0;
                this.quantidadeAtual = this.qtdOpcoes[0];
                this.controlaNavegacaoBalanco(balanco);
                this.listarLancamentos();
            },
            error => {
                console.log(error);
                this.controlaNavegacaoBalanco(null);
            }
        );
    }

    private controlaNavegacaoBalanco(balanco:Balanco){
        let dataAtual = new Date();

        if(balanco == null){
            this.balancoAnterior = false;
        }else{

            this.balancoAnterior = true;

            if(balanco.mes == dataAtual.getMonth()+1){
                this.balancoPosterior = false;
                this.balancoAtual = false;
            }else{
                this.balancoPosterior = true;
                this.balancoAtual = true;
            }
            
        }
    }

    private listarLancamentos(){
        this.lancamentoService.buscarPorBalanco(this.balanco.id,this.paginaAtual,this.quantidadeAtual,this.ordem).subscribe(
            paginaLancamentos => {
                this.paginaLancamentos = paginaLancamentos;
            }
        );
    }

    public buscarPorMesAnterior(){
        let data = new Date(this.balanco.ano,this.balanco.mes-1,1);
        data.setMonth(data.getMonth()-1);

        this.buscarBalancoPorData(this.idCategoria,data.getMonth()+1,data.getFullYear());
    }

    public buscarPorMesPosterior(){
        let data = new Date(this.balanco.ano,this.balanco.mes-1,1);
        data.setMonth(data.getMonth()+1);

        this.buscarBalancoPorData(this.idCategoria,data.getMonth()+1,data.getFullYear());
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

    public redirecionar(opcao:number,id:number){

        let rota = '';

        if(opcao == 1){
            rota = 'lancamento/lancar';
        }else if(opcao == 2){
            rota = `lancamento/atualizar/${id}`;
        }

        this.router.navigate([`${rota}`],{queryParams:{categoria:this.idCategoria,balanco:this.balanco?.id}});

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
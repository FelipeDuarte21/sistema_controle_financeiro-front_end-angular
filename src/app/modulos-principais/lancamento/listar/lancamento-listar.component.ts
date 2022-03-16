import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { BalancoFaixa } from "src/app/modelos/balanco-faixa";
import { Balanco } from "src/app/modelos/balanco.model";
import { PaginaLancamento } from "src/app/modelos/pagina-lancamento.model";
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
    public quantidadeAtual = this.qtdOpcoes[0];

    private paginaAtual = 0;
    
    private ordem = 2;

    public idCategoria:number = 0;

    public balancosFaixas:BalancoFaixa[] = [];

    constructor(
        private balancoService: BalancoService,
        private lancamentoService: LancamentoService,
        private activetedRoute: ActivatedRoute,
        private router: Router,
        private spinnerService: SpinnerService,
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

            this.buscarBalancoAtual(this.idCategoria);

        });

    }

    private buscarBalancoAtual(idCategoria: number){
       
        this.balancoService.buscarAtual(idCategoria).subscribe(
            balanco => {
                this.balanco = balanco;
                this.spinnerService.desativarSpinner();
                this.buscarFaixasBalanco(this.idCategoria,balanco.ano,balanco.mes);
                this.listarLancamentos();
            },
            error => {
                this.router.navigate(['/categoria']);
                this.spinnerService.desativarSpinner();
            }
        );
    }

    private listarLancamentos(){
        this.spinnerService.ativarSpinner();
        this.lancamentoService.listarPorBalanco(this.idCategoria,this.balanco.id,this.paginaAtual,
            this.quantidadeAtual,this.ordem).subscribe(
            paginaLancamentos => {
                this.paginaLancamentos = paginaLancamentos;
                this.spinnerService.desativarSpinner();
            },
            error => {
                console.log(error);
                this.spinnerService.desativarSpinner();
            }
        );
    }

    private buscarFaixasBalanco(idCategoria: number,ano:number, mes:number){

        this.spinnerService.ativarSpinner();
 
        const qtdMes = 3; //Quantidade mês para aparacer na barra de navegação

        this.balancoService.buscarResumo(idCategoria,ano,mes,qtdMes).subscribe(
            balancosFaixas => {
                this.balancosFaixas = balancosFaixas;
                this.spinnerService.desativarSpinner();
            },
            error => {
                this.spinnerService.desativarSpinner();
                console.log(error);
            }
        );
    }

    public mudarBalanco(data:object){

        let dataAgora = new Date();
        dataAgora.setDate(1);

        let dataRecebida = new Date(`${data['ano']}/${data['mes']}/1`);
        
        if(dataRecebida.getTime() > dataAgora.getTime()){
            this.alertaService.alertaAviso("Aviso! Mês/Ano ainda não cadastrado!");
            this.buscarBalancoAtual(this.idCategoria);
            return;
        }

        this.spinnerService.ativarSpinner();

        this.balancoService.buscarPorData(this.idCategoria,data['mes'],data['ano']).subscribe(
            balanco => {

                if(balanco.id){

                    this.balanco = balanco;
                    this.paginaAtual = 0;
                    this.quantidadeAtual = this.qtdOpcoes[0];
                    
                    this.buscarFaixasBalanco(this.idCategoria,balanco.ano,balanco.mes)
                    this.listarLancamentos();

                }else{
                    this.spinnerService.desativarSpinner();
                    this.buscarFaixasBalanco(this.idCategoria,this.balanco.ano,this.balanco.mes)
                    this.listarLancamentos();
                    this.alertaService.alertaAviso("Aviso! Mês/Ano não encontrado!");
                }

            },
            respError => {
                this.spinnerService.desativarSpinner();
                if(respError.error.code == 404){
                    this.alertaService.alertaAviso("Aviso! Mês/Ano não encontrado!");
                    this.buscarBalancoAtual(this.idCategoria);
                }
                console.log(respError);
            }
        );
    }

    public mudarQuantidade(id:number){
        this.paginaAtual = 0;
        this.quantidadeAtual = id;
        this.listarLancamentos();
    }

    public mudarPagina(pagina:number){
        this.paginaAtual = pagina;
        this.listarLancamentos();
    }

    public excluir(id:number){
       
        let c = confirm("Deseja Realmente Excluir Lançamento?");

        if(c == true){

            this.spinnerService.ativarSpinner();

            this.lancamentoService.excluir(this.idCategoria, this.balanco.id,id).subscribe(
                resp => {
                    this.spinnerService.desativarSpinner();
                    this.alertaService.alertaSucesso("Lançamento excluído com sucesso!");
                    this.paginaAtual = 0;
                    this.quantidadeAtual = this.qtdOpcoes[0];
                    this.buscarBalancoAtual(this.idCategoria);
                },
                error => {
                    this.spinnerService.desativarSpinner();
                    this.alertaService.alertaErro("Erro ao excluir alerta!");
                }
            );

        }

    }

}
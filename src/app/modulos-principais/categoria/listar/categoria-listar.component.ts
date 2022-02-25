import { NumberFormatStyle } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { PaginaCategoria } from "src/app/modelos/pagina-categoria.model";
import { CategoriaService } from "src/app/servicos/http/categoria.service";

@Component({
    selector: 'categoria-listar',
    templateUrl: './categoria-listar.component.html',
    styleUrls: ['./categoria-listar.component.css']
})
export class CategoriaListarComponent implements OnInit {

    public paginaCategoria: PaginaCategoria;

    public qtdOpcoes = [4, 8, 12];
    public quantidadeAtual = this.qtdOpcoes[0];

    private paginaAtual = 0;
    private ordem = 1;

    public tamanho: number = 0;

    constructor(
        private categoriaService: CategoriaService,
        private spinnerService: SpinnerService,
        private alertaService: AlertasService
    ) { }

    ngOnInit(): void {
        this.spinnerService.ativarSpinner();
        
        this.listarCategorias();
    }

    private listarCategorias() {
        this.categoriaService.listar(this.paginaAtual, this.quantidadeAtual, this.ordem).subscribe(
            pgCategoria => {
                this.paginaCategoria = pgCategoria;
                this.spinnerService.desativarSpinner();
            },
            error => {
                console.log(error);
                this.spinnerService.desativarSpinner();
            }
        );
    }

    public mudarPagina(pagina: number) {
        this.paginaAtual = pagina;
        this.listarCategorias();
    }

    public mudarQuantidade(opcao: number) {
        this.paginaAtual = 0;
        this.quantidadeAtual = opcao;
        this.listarCategorias();
    }

    public excluir(id: number) {

        let c = confirm("Deseja Realmente Excluir a Categoria?");

        if (c == true) {

            this.categoriaService.excluir(id).subscribe(
                resp => {
                    this.alertaService.alertaSucesso("Categoria excluída com sucesso!");
                    this.paginaAtual = 0;
                    this.quantidadeAtual = this.qtdOpcoes[0];
                    this.listarCategorias();
                },
                error => {
                    this.alertaService.alertaErro("Erro ao excluir categoria!");
                }
            );

        }

    }

}
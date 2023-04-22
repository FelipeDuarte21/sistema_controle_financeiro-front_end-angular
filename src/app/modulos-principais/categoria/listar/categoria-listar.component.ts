import { NumberFormatStyle } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { Categoria } from "src/app/modelos/categoria.model";
import { CategoriaService } from "src/app/servicos/http/categoria.service";
import { FolhaService } from "src/app/servicos/http/folha.service";

@Component({
    selector: 'categoria-listar',
    templateUrl: './categoria-listar.component.html',
    styleUrls: ['./categoria-listar.component.css']
})
export class CategoriaListarComponent implements OnInit {

    public categorias: Categoria[] = [];

    private idConta:number = 0;

    constructor(
        private categoriaService: CategoriaService,
        private spinnerService: SpinnerService,
        private alertaService: AlertasService,
        private folhaService: FolhaService
    ) { }

    ngOnInit(): void {
        this.spinnerService.ativarSpinner();

        this.idConta = parseInt(window.sessionStorage.getItem("idConta") as string);

        this.listarCategorias(this.idConta);

    }

    private listarCategorias(idConta: number) {

        this.categoriaService.listar(idConta).subscribe({
            next: categorias => {
                this.categorias = categorias;
                this.spinnerService.desativarSpinner();
            },
            error: error => {
                console.log(error);
                this.spinnerService.desativarSpinner();
            }
        });

    }

    public excluir(id: number) {

        let c = confirm("Deseja Realmente Excluir a Categoria?");

        if (c == true) {

            this.categoriaService.excluir(id).subscribe({
                next: resp => {
                    this.alertaService.alertaSucesso("Categoria excluída com sucesso!");
                    this.listarCategorias(this.idConta);
                },
                error: error => {
                    this.alertaService.alertaErro("Erro ao Excluir Categoria!");
                }
            });

        }

    }

    public lancamentoAutomatico(){

        let c = confirm("Deseja Realmente Fazer Lançamento em todas as categorias?");

        if (c == true) {

            let idConta = parseInt(window.sessionStorage.getItem("idConta") as string);

            this.folhaService.fazerLancamentoTodasCategorias(idConta).subscribe({
                next: () => {
                    this.alertaService.alertaSucesso("Lançamento realizado com sucesso!");
                },
                error: () => {
                    this.alertaService.alertaErro("Erro ao tentar realizar lançamento!");
                }
            });

        }

    }

}

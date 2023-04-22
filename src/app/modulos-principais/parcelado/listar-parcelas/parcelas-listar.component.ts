import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { Parcelado } from "src/app/modelos/parcelado.model";
import { Parcela } from "src/app/modelos/parcela.model";
import { ParceladoService } from "src/app/servicos/http/parcelado.service";

@Component({
    templateUrl: './parcelas-listar.component.html',
    styleUrls: ['./parcelas-listar.component.css']
})
export class ParcelasListarComponent implements OnInit{

    public idCategoria:number = 0;

    public idParcelado: number = 0;

    public parcelado: Parcelado | undefined;

    public parcelas: Parcela[] = [];

    constructor(
        private parceladoService: ParceladoService,
        private spinnerService: SpinnerService,
        private activetedRoute: ActivatedRoute,
        private router: Router
    ){}

    ngOnInit(): void {

        this.spinnerService.ativarSpinner();

        this.activetedRoute.queryParams.subscribe(queryParams => {

            this.idCategoria = queryParams?.['categoria'];

            this.idParcelado = queryParams?.['parcelado'];

            if(this.idCategoria==undefined || this.idCategoria==null || this.idCategoria==0) {
                this.spinnerService.desativarSpinner();
                this.router.navigate(['/categoria']);
            }

            if(this.idParcelado ==undefined || this.idParcelado ==null || this.idParcelado ==0) {
                this.spinnerService.desativarSpinner();
                this.router.navigate(['/categoria']);
            }

            this.buscarParcelado();

            this.buscarParcelas();

        });

    }

    private buscarParcelado(){

        this.spinnerService.ativarSpinner();

        this.parceladoService.buscarPorId(this.idParcelado).subscribe({
            next: parcelado => {
                this.parcelado = parcelado;
                this.spinnerService.desativarSpinner();
            },
            error: error => {
                this.router.navigate(['/categoria']);
                this.spinnerService.desativarSpinner();
            }
        });

    }

    private buscarParcelas(){

        this.spinnerService.ativarSpinner();

        this.parceladoService.listarParcelas(this.idParcelado).subscribe({
            next: parcelas => {
                this.parcelas = parcelas;
                this.spinnerService.desativarSpinner();
            },
            error: error => {
                this.router.navigate(['/categoria']);
                this.spinnerService.desativarSpinner();
            }
        });

    }

}

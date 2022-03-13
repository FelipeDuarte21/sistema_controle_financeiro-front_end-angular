import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { ParcelaPagar } from "src/app/modelos/parcela-pagar.model";
import { Parcela } from "src/app/modelos/parcela.model";
import { Parcelado } from "src/app/modelos/parcelado.model";
import { ParceladoService } from "src/app/servicos/http/parcelados.service";

@Component({
    selector: 'lancamento-parcelado',
    templateUrl: './lancamento-parcelado.component.html',
    styleUrls: ['./lancamento-parcelado.component.css'],
    providers: [DatePipe]
})
export class LancamentoParceladoComponent implements OnInit{

    private idCategoria:number = 0;
    private idBalanco:number = 0;
    private idParcelado:number = 0;
    private idParcela:number = 0;

    public parcelados: Array<Parcelado> = [];
    public parcelas: Array<Parcela> = [];
    
    public formParcelado: FormGroup

    public desativaBotaoEnviar:boolean = false;

    constructor(
        public activetedRoute: ActivatedRoute,
        public router: Router,
        public parceladoService: ParceladoService,
        public spinnerService: SpinnerService,
        public formBuilder: FormBuilder,
        private formatadorData: DatePipe,
        private alertaService: AlertasService
    ){}

    ngOnInit(): void {

        this.spinnerService.ativarSpinner();

        this.formParcelado = this.formBuilder.group({
            parcelado: [[],[Validators.required]],
            parcela: [[],[Validators.required]],
            numero: ['',[Validators.required]],
            valor: ['',[Validators.required,Validators.min(0.01)]],
            dataVencimento: ['',[Validators.required]],
            dataPagamento: [this.formatadorData.transform(new Date(),'yyyy-MM-dd'),[Validators.required]]
        });

        this.activetedRoute.queryParams.subscribe(
            queryParams => {

                this.idCategoria = queryParams.categoria;
                this.idBalanco = queryParams.balanco;

                this.buscarParcelados();

            },
            error => {
                this.router.navigate(['/categoria']); 
                this.spinnerService.desativarSpinner();
            }
        );

    }

    public buscarParcelados(){

        this.spinnerService.desativarSpinner();

        this.parceladoService.listar(this.idCategoria,0,1,1).subscribe(
            resp => {
                this.parceladoService.listar(this.idCategoria,0,resp.totalElements,1).subscribe(
                    pagParcelados => {
                        this.parcelados = pagParcelados.content.filter(p => !p.quitado);
                    }
                );
            }
        );

    }

    public listarParcelas(evento: any){

        let idParcelado = evento.target.value;

        if(idParcelado == 0) {
            this.parcelas = [];
            return;
        }

        this.idParcelado = idParcelado;
       
        let parcelado = this.parcelados.find(p => p.id == idParcelado);

        this.parcelas = parcelado.parcelas.filter(p => !p.pago);

        this.formParcelado.get('parcela').setValue({value: this.parcelas,disabled:false});
        
    }

    public setValores(evento: any){

        let idParcela = evento.target.value;

        if(idParcela == 0) {
            this.formParcelado.get('numero').setValue('');
            this.formParcelado.get('valor').setValue('');
            this.formParcelado.get('dataVencimento').setValue('');
            return;
        };

        this.idParcela = idParcela;

        let parcela = this.parcelas.find(p => p.id == idParcela);

        this.formParcelado.get('numero').setValue(parcela.numero);
        this.formParcelado.get('valor').setValue(parcela.valor);
        this.formParcelado.get('dataVencimento').setValue(parcela.dataVencimento);

    }

    public enviar(){

        this.spinnerService.ativarSpinner();

        this.desativaBotaoEnviar = true;

        let parcelaPagar = {
            valor:  this.formParcelado.get('valor').value,
            dataVencimento: this.formParcelado.get('dataVencimento').value,
            dataPagamento: this.formParcelado.get('dataPagamento').value
        } as ParcelaPagar;

        this.parceladoService.registrarPagamentoParcela(this.idParcelado,this.idCategoria,
            this.idParcela,parcelaPagar).subscribe(
                resp => {
                    this.formParcelado.reset();
                    this.router.navigate(['/lancamento'], { queryParams: { categoria: this.idCategoria } });
                    this.spinnerService.desativarSpinner();
                    this.alertaService.alertaSucesso("Lançamento realizado com sucesso!");
                },
                error => {
                    this.spinnerService.desativarSpinner();
                    this.desativaBotaoEnviar = false;
                    this.alertaService.alertaErro("Erro ao realizar lançamento!",false);
                    if (error.error.code == 403) {
                        this.router.navigate(['/lancamento'], { queryParams: { categoria: this.idCategoria } });
                    }
                }
        );

    }

}
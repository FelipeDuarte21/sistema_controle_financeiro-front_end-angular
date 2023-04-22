import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { Parcela } from "src/app/modelos/parcela.model";
import { Parcelado } from "src/app/modelos/parcelado.model";
import { ParcelaPagamento } from "src/app/modelos/parcelaPagamento.model";
import { FolhaService } from "src/app/servicos/http/folha.service";
import { ParceladoService } from "src/app/servicos/http/parcelado.service";

@Component({
    selector: 'lancamento-parcelado',
    templateUrl: './lancamento-parcelado.component.html',
    styleUrls: ['./lancamento-parcelado.component.css'],
    providers: [DatePipe]
})
export class LancamentoParceladoComponent implements OnInit{

    private idCategoria:number = 0;
    private idFolha:number = 0;

    private idParcelado:number = 0;
    private idParcela:number = 0;

    public parcelados: Array<Parcelado> = [];
    public parcelas: Array<Parcela> = [];

    public formParcelado: FormGroup = new FormGroup({});

    public desativaBotaoEnviar:boolean = false;

    constructor(
        private activetedRoute: ActivatedRoute,
        private router: Router,
        private parceladoService: ParceladoService,
        private folhaService: FolhaService,
        private spinnerService: SpinnerService,
        private formBuilder: FormBuilder,
        private formatadorData: DatePipe,
        private alertaService: AlertasService
    ){}

    ngOnInit(): void {

        this.spinnerService.ativarSpinner();

        this.activetedRoute.queryParams.subscribe({
            next: queryParams => {

                this.idCategoria = queryParams?.['categoria'];
                this.idFolha = queryParams?.['folha'];

                this.spinnerService.desativarSpinner();

                this.buscarParcelados();

            },
            error: error => {
                this.router.navigate(['/categorias']);
                this.spinnerService.desativarSpinner();
            }
        });

        this.formParcelado = this.formBuilder.group({
            parcelado: [[],[Validators.required]],
            parcela: [[],[Validators.required]],
            numero: ['',[Validators.required]],
            valor: ['',[Validators.required,Validators.min(0.01)]],
            dataVencimento: ['',[Validators.required]],
            dataPagamento: [this.formatadorData.transform(new Date(),'yyyy-MM-dd'),[Validators.required]]
        });



    }

    public buscarParcelados(){

        this.spinnerService.ativarSpinner();

        this.parceladoService.listarNaoQuitados(this.idCategoria).subscribe({
            next: parcelados => {
                this.parcelados = parcelados;
                this.spinnerService.desativarSpinner();
            }
        });

    }


    public escolherParcelado(evento: any){

        let idParcelado = evento.target.value;

        if(idParcelado == 0) {
            this.parcelas = [];
            return;
        }

        this.idParcelado = idParcelado;

        let parcelado = this.parcelados.find(p => p.id == idParcelado);

        this.parcelas = parcelado?.parcelas.filter(p => !p.pago) as Parcela[];

        this.formParcelado?.get('parcela')?.setValue({value: this.parcelas,disabled:false});

    }

    public escolherParcela(evento: any){

        let idParcela = evento.target.value;

        if(idParcela == 0) {
            this.setValores(null);
            return;
        };

        this.idParcela = idParcela;

        let parcela = this.parcelas.find(p => p.id == idParcela) as Parcela;

        this.setValores(parcela);

    }

    private setValores(parcela: Parcela | null){

        if(parcela != null){
            this.formParcelado?.get('numero')?.setValue(parcela.numero);
            this.formParcelado?.get('valor')?.setValue(parcela.valor);
            this.formParcelado?.get('dataVencimento')?.setValue(parcela.dataVencimento);
        }else{
            this.formParcelado?.get('numero')?.setValue('');
            this.formParcelado?.get('valor')?.setValue('');
            this.formParcelado?.get('dataVencimento')?.setValue('');
        }

    }

    public enviar(){

        this.spinnerService.ativarSpinner();

        this.desativaBotaoEnviar = true;

        let parcelaPagamento = {
            valor:  this.formParcelado?.get('valor')?.value,
            dataVencimento: this.formParcelado?.get('dataVencimento')?.value,
            dataPagamento: this.formParcelado?.get('dataPagamento')?.value
        } as ParcelaPagamento;

        this.folhaService.fazerLancamentoParcelado(this.idFolha,this.idParcelado,this.idParcela,parcelaPagamento).subscribe({
            next: () => {
                this.formParcelado.reset();
                this.spinnerService.desativarSpinner();
                this.alertaService.alertaSucesso("Lançamento realizado com sucesso!");
                this.router.navigate(['/lancamentos'], { queryParams: { categoria: this.idCategoria } });
            },
            error: error => {
                this.spinnerService.desativarSpinner();
                this.desativaBotaoEnviar = false;
                this.alertaService.alertaErro("Erro ao realizar lançamento!",false);
                if (error.error.code == 403) {
                    this.router.navigate(['/lancamentos'], { queryParams: { categoria: this.idCategoria } });
                }
            }
        });

    }

}

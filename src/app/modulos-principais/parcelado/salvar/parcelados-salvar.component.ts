import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { ParceladoDados } from "src/app/modelos/parceladoDados.model";
import { ParceladoService } from "src/app/servicos/http/parcelado.service";

@Component({
    templateUrl: './parcelados-salvar.component.html',
    styleUrls: ['./parcelados-salvar.component.css'],
    providers: [DatePipe]
})
export class ParceladosSalvarComponent implements OnInit{

    public titulo:string = "Parcelados - Cadastrar";

    public idCategoria:number = 0;

    public formParcelado: FormGroup = new FormGroup({});

    public desativaBotaoSalvar:boolean = false;

    public id:number = 0;

    constructor(
        private activetedRoute: ActivatedRoute,
        private parceladoService: ParceladoService,
        private router: Router,
        private spinnerService: SpinnerService,
        private alertaService: AlertasService,
        private formBuilder: FormBuilder,
        private formatadorData: DatePipe
    ){}

    ngOnInit(): void {

        this.spinnerService.ativarSpinner();

        this.activetedRoute.queryParams.subscribe(queryParams => {

            this.idCategoria = queryParams?.['categoria'];

            if(this.idCategoria==undefined || this.idCategoria==null || this.idCategoria==0) {
                this.spinnerService.desativarSpinner();
                this.router.navigate(['/categoria']);
            }

            this.formParcelado = this.formBuilder.group({
                titulo: ['',[Validators.required, Validators.maxLength(50)]],
                descricao: ['', [Validators.required]],
                data: [this.formatadorData.transform(new Date(),'yyyy-MM-dd'), [Validators.required]],
                totalParcela:[2,[Validators.required, Validators.min(2)]],
                parcelaDados: this.formBuilder.group({
                    valor:[0.01,[Validators.required,Validators.min(0.01)]],
                    dataVencimentoPrimeiraParcela: ['',[Validators.required]],
                })
            });

            this.spinnerService.desativarSpinner();
        });

        this.activetedRoute.params.subscribe(params => {

            if(params?.['id']){

                this.spinnerService.ativarSpinner();

                this.id = params?.['id'];

                this.titulo = "Parcelados - Atualizar",

                this.parceladoService.buscarPorId(this.id).subscribe({
                    next: parcelado => {

                        this.formParcelado.get('titulo')?.setValue(parcelado.titulo);
                        this.formParcelado.get('descricao')?.setValue(parcelado.descricao);
                        this.formParcelado.get('data')?.setValue(parcelado.data);
                        this.formParcelado.get('totalParcela')?.setValue(parcelado.totalParcelas);
                        this.formParcelado.get('parcelaDados')?.get('valor')?.setValue(parcelado.parcelas[0].valor);
                        this.formParcelado.get('parcelaDados')?.get('dataVencimentoPrimeiraParcela')?.setValue(parcelado.parcelas[0].dataVencimento);


                        this.spinnerService.desativarSpinner();

                    },
                    error: error => {
                        this.router.navigate(['/parcelados'],{queryParams:{categoria: this.idCategoria}});
                    }
                });

            }

        })

    }

    public verificaCampo(campo:string): boolean | null | undefined{
        return this.formParcelado.get(campo)?.errors && this.formParcelado.get(campo)?.touched;
    }

    public tamanhoCampo(campo:string): number{
        let valor = this.formParcelado.get(campo)?.value as string;
        if(valor == null){
            return 0;
        }
        return valor.length;
    }

    public enviar(){

        this.spinnerService.ativarSpinner();

        this.desativaBotaoSalvar = true;

        let parcelado = this.formParcelado.getRawValue() as ParceladoDados;


        this.parceladoService.salvar(this.id,this.idCategoria,parcelado).subscribe({
            next: resp => {
                this.formParcelado.reset();
                this.spinnerService.desativarSpinner();
                this.desativaBotaoSalvar = false;
                if(this.id == 0){
                    this.alertaService.alertaSucesso("Parcelado cadastrado com sucesso!");
                }else{
                    this.alertaService.alertaSucesso("Parcelado atualizado com sucesso!");
                }
                this.router.navigate(['/parcelados'],{queryParams: {categoria: this.idCategoria}});
            },
            error: error => {
                this.spinnerService.desativarSpinner();
                this.desativaBotaoSalvar = false;
                if(this.id == 0){
                    this.alertaService.alertaErro("Erro ao cadastrar parcelado!");
                }else{
                    this.alertaService.alertaErro("Erro ao atualizar parcelado!");
                }
                if (error.error.code == 403) {
                    this.router.navigate(['/parcelados'], { queryParams: { categoria: this.idCategoria } });
                }
            }
        });

    }

}

import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { AnotacaoDados } from "src/app/modelos/anotacaoDados.model";
import { AnotacaoService } from "src/app/servicos/http/anotacao.service";

@Component({
    templateUrl: './anotacao-salvar.component.html',
    styleUrls: ['./anotacao-salvar.component.css'],
    providers: [DatePipe]
})
export class AnotacaoSalvarComponent implements OnInit{

    public titulo:string = "Anotações da Categoria - Cadastrar";

    public idCategoria:number = 0;

    public formAnotacao: FormGroup = new FormGroup({});

    public desativaBotaoSalvar: boolean = false;

    private id:number = 0;

    constructor(
        private activedRoute: ActivatedRoute,
        private anotacaoService: AnotacaoService,
        private router: Router,
        private alertaService: AlertasService,
        private spinnerService: SpinnerService,
        private formBuilder: FormBuilder,
        private formatadorData: DatePipe
    ){}

    ngOnInit(): void {

        this.spinnerService.ativarSpinner();

        this.activedRoute.queryParams.subscribe(queryParams => {

            this.idCategoria = queryParams?.['categoria'];

            if(this.idCategoria==undefined || this.idCategoria==null || this.idCategoria==0) {
                this.spinnerService.desativarSpinner();
                this.router.navigate(['/categoria']);
            }

            this.spinnerService.desativarSpinner();

        });

        this.formAnotacao = this.formBuilder.group({
            data: [this.formatadorData.transform(new Date(),'yyyy-MM-dd'),[Validators.required]],
            titulo: ['',[Validators.required,Validators.maxLength(50)]],
            descricao: ['',[Validators.required]]
        });

        this.activedRoute.params.subscribe(params => {
            if(params?.['id']){
                this.spinnerService.ativarSpinner();
                this.id = params?.['id'];
                this.titulo = "Anotações da Categoria - Atualizar";
                this.anotacaoService.buscarPorId(this.id).subscribe({
                    next: anotacao => {

                        this.formAnotacao.get('data')?.setValue(anotacao.data);
                        this.formAnotacao.get('titulo')?.setValue(anotacao.titulo);
                        this.formAnotacao.get('descricao')?.setValue(anotacao.descricao);

                        this.spinnerService.desativarSpinner();

                    },
                    error: error => {
                        this.router.navigate(['/anotacoes'],{queryParams:{categoria: this.idCategoria}});
                    }
                });
            }
        });

    }

    public verificaCampo(campo:string): boolean | null | undefined{
        return this.formAnotacao.get(campo)?.errors && this.formAnotacao.get(campo)?.touched;
    }

    public tamanhoCampo(campo:string): number{
        let valor = this.formAnotacao.get(campo)?.value as string;
        if(valor == null){
            return 0;
        }
        return valor.length;
    }

    public enviar(){

        this.spinnerService.ativarSpinner();

        this.desativaBotaoSalvar = true;

        let anotacao = this.formAnotacao.getRawValue() as AnotacaoDados;

        this.anotacaoService.salvar(this.idCategoria,this.id,anotacao).subscribe({
            next: resp => {
                this.spinnerService.desativarSpinner();
                this.formAnotacao.reset();
                this.desativaBotaoSalvar = false;
                if(this.id == 0){
                    this.alertaService.alertaSucesso("Anotação cadastrada com sucesso!");
                }else{
                    this.alertaService.alertaSucesso("Anotação atualizada com sucesso!");
                }
                this.router.navigate(['/anotacoes'],{queryParams: {categoria: this.idCategoria}});
            },
            error: error => {
                this.spinnerService.desativarSpinner();
                this.desativaBotaoSalvar = false;
                if(this.id == 0){
                    this.alertaService.alertaErro("Erro ao cadastrar anotação!");
                }else{
                    this.alertaService.alertaErro("Erro ao atualizar anotação!");
                }
                if (error.error.code == 403) {
                    this.router.navigate(['/anotacoes'], { queryParams: { categoria: this.idCategoria } });
                }
            }
        });

    }

}

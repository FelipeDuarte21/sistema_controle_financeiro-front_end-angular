import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { LancamentoDados } from "src/app/modelos/lancamentoDados.model";
import { LancamentoFixoDados } from "src/app/modelos/lancamentoFixoDados.model";
import { LancamentoFixoService } from "src/app/servicos/http/lancamento-fixo.service";

@Component({
    selector: 'lancamento-fixo-salvar',
    templateUrl: './lancamento-fixo-salvar.component.html',
    styleUrls: ['./lancamento-fixo-salvar.component.css']
})
export class LancamentoFixoSalvarComponent implements OnInit{

    public titulo:string = "Lançamentos Fixos - Cadastrar";

    public idCategoria:number = 0;

    public desativaBotaoSalvar: boolean = false;

    public formLancamento: FormGroup = new FormGroup({});

    private id:number = 0;

    constructor(
        private activedRoute: ActivatedRoute,
        private router: Router,
        private spinnerService: SpinnerService,
        private formBuilder: FormBuilder,
        private lancamentoFixoService: LancamentoFixoService,
        private alertaService: AlertasService
    ){}

    ngOnInit(): void {

        this.spinnerService.ativarSpinner();

        this.activedRoute.queryParams.subscribe({
            next: queryParams => {

                this.idCategoria = queryParams?.['categoria'];

                if(this.idCategoria==undefined || this.idCategoria==null || this.idCategoria==0) {
                    this.router.navigate(['/categoria']);
                    this.spinnerService.desativarSpinner();
                }

                this.spinnerService.desativarSpinner();

            },
            error: error => {
                this.router.navigate(['/categoria']);
                this.spinnerService.desativarSpinner();
            }
        });

        this.formLancamento = this.formBuilder.group({
            titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
            descricao: ['', [Validators.maxLength(255)]],
            valor: ['', [Validators.required, Validators.min(0)]],
            tipo: ['', [Validators.required]]
        });

        this.spinnerService.ativarSpinner();

        this.activedRoute.params.subscribe({
            next: params => {

                if(params?.['id']){

                    this.id = params?.['id'];

                    this.titulo = "Lançamentos Fixos - Atualizar"

                    this.lancamentoFixoService.buscarPorId(this.id).subscribe({
                        next: lancamentoFixo => {
                            this.formLancamento.get('titulo')?.setValue(lancamentoFixo.titulo);
                            this.formLancamento.get('descricao')?.setValue(lancamentoFixo.descricao);
                            this.formLancamento.get('valor')?.setValue(lancamentoFixo.valor);
                            if(lancamentoFixo.tipo == 'Provento'){
                                this.formLancamento.get('tipo')?.setValue("0");
                            }else{
                                this.formLancamento.get('tipo')?.setValue("1");
                            }
                            this.spinnerService.desativarSpinner();
                        },
                        error: error => {
                            this.router.navigate(['/categoria']);
                            this.spinnerService.desativarSpinner();
                        }
                    });

                }

            }
        });

        this.spinnerService.desativarSpinner();

    }

    public verificaCampo(campo:string): boolean | null | undefined{
        return this.formLancamento.get(campo)?.errors && this.formLancamento.get(campo)?.touched;
    }

    public tamanhoCampo(campo:string): number{
        let valor = this.formLancamento.get(campo)?.value as string;
        if(valor == null){
            return 0;
        }
        return valor.length;
    }

    public enviar(){

        this.spinnerService.ativarSpinner();

        this.desativaBotaoSalvar = true;

        let lancamentoFixoDados = this.formLancamento.getRawValue() as LancamentoFixoDados;

        this.lancamentoFixoService.salvar(this.idCategoria,this.id,lancamentoFixoDados).subscribe({
            next: ()  => {
                this.formLancamento.reset();
                this.spinnerService.desativarSpinner();
                if(this.id == 0){
                    this.alertaService.alertaSucesso("Lançamento cadastrado com sucesso!");
                }else{
                    this.alertaService.alertaSucesso("Lançamento atualizado com sucesso!");
                }
                this.router.navigate(['/lancamentos-fixos'], { queryParams: { categoria: this.idCategoria } });
            },
            error: error => {
                this.spinnerService.desativarSpinner();
                this.desativaBotaoSalvar = false;
                if(this.id == 0){
                    this.alertaService.alertaErro("Erro ao cadastrar lançamento!",false);
                }else{
                    this.alertaService.alertaErro("Erro ao atualizar lançamento!",false);
                }
                if (error.error.code == 403) {
                    this.router.navigate(['/lancamentos-fixos'], { queryParams: { categoria: this.idCategoria } });
                }
            }
        });

    }

}

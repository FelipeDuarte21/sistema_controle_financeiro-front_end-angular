import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { LancamentoDados } from "src/app/modelos/lancamentoDados.model";
import { FolhaService } from "src/app/servicos/http/folha.service";
import { LancamentoService } from "src/app/servicos/http/lancamento.service";

@Component({
    selector: 'lancamento-novo',
    templateUrl: './lancamento-novo.component.html',
    styleUrls: ['./lancamento-novo.component.css'],
    providers: [DatePipe]
})
export class LancamentoNovoComponent implements OnInit{

    public idFolha: number = 0;
    public idCategoria: number = 0;

    public formLancamento: FormGroup = new FormGroup({});

    public desativaBotaoSalvar: boolean = false;

    public id:number =  0;

    constructor(
        private formBuilder: FormBuilder,
        private lancamentoService: LancamentoService,
        private folhaService: FolhaService,
        private router: Router,
        private activedRoute: ActivatedRoute,
        private spinnerService: SpinnerService,
        private alertaService: AlertasService,
        private formatadorData: DatePipe
    ) { }

    ngOnInit(): void {

        this.spinnerService.ativarSpinner();

        this.activedRoute.queryParams.subscribe({
            next: queryParams => {

                this.idCategoria = queryParams?.['categoria'];
                this.idFolha = queryParams?.['folha'];

                this.spinnerService.desativarSpinner();

            },
            error: error => {
                this.spinnerService.desativarSpinner();
                this.router.navigate(['/categoria']);
            }
        });

        this.formLancamento = this.formBuilder.group({
            titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
            descricao: ['', [Validators.maxLength(255)]],
            valor: ['', [Validators.required, Validators.min(0)]],
            tipo: ['', [Validators.required]],
            data: [this.formatadorData.transform(new Date(),'yyyy-MM-dd'),[Validators.required]],
            salvar: [false]
        });

        this.activedRoute.params.subscribe({
            next: params => {

                let id = params?.['id'];

                if (id != null) {
                    this.spinnerService.ativarSpinner();
                    this.id = id as number;

                    this.lancamentoService.buscarPorId(this.id).subscribe({
                        next: lancamento => {
                            this.formLancamento.get('titulo')?.setValue(lancamento.titulo);
                            this.formLancamento.get('descricao')?.setValue(lancamento?.descricao);
                            this.formLancamento.get('valor')?.setValue(lancamento.valor);
                            if(lancamento.tipo == 'Provento'){
                                this.formLancamento.get('tipo')?.setValue("0");
                            }else{
                                this.formLancamento.get('tipo')?.setValue("1");
                            }
                            this.formLancamento.get('data')?.setValue(lancamento.data);
                            this.spinnerService.desativarSpinner();
                        },
                        error: error => {
                            this.spinnerService.desativarSpinner();
                            this.router.navigate(['/lancamentos'], { queryParams: { categoria: this.idCategoria } });
                        }
                    });

                }
            }
        });

    }

    public verificaCampo(campo: string): boolean | null | undefined {
        return this.formLancamento.get(campo)?.errors && this.formLancamento.get(campo)?.touched;
    }

    public tamanhoCampo(campo: string): number {
        let valor = this.formLancamento.get(campo)?.value as string;
        if (valor == null) {
            return 0;
        }
        return valor.length;
    }

    public enviar() {

        this.spinnerService.ativarSpinner();

        let lancamento = this.formLancamento.getRawValue() as LancamentoDados;

        this.desativaBotaoSalvar = true;

        this.folhaService.salvarLancamento(this.id,this.idFolha,lancamento).subscribe({
            next: () => {
                this.formLancamento.reset();
                this.router.navigate(['/lancamentos'], { queryParams: { categoria: this.idCategoria } });
                this.spinnerService.desativarSpinner();
                if(this.id == 0){
                    this.alertaService.alertaSucesso("Lançamento realizado com sucesso!");
                }else{
                    this.alertaService.alertaSucesso("Lançamento atualizado com sucesso!");
                }
            },
            error: error => {
                this.spinnerService.desativarSpinner();
                this.desativaBotaoSalvar = false;
                if(this.id == 0){
                    this.alertaService.alertaErro("Erro ao realizar lançamento!",false);
                }else{
                    this.alertaService.alertaErro("Erro ao atualizar lançamento!",false);
                }
                if (error.error.code == 403) {
                    this.router.navigate(['/lancamentos'], { queryParams: { categoria: this.idCategoria } });
                }
            }
        });

    }

}

import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { LancamentoDados } from "src/app/modelos/lancamentoDados.model";
import { LancamentoFixo } from "src/app/modelos/lancamentoFixo.model";
import { FolhaService } from "src/app/servicos/http/folha.service";
import { LancamentoFixoService } from "src/app/servicos/http/lancamento-fixo.service";

@Component({
    selector: 'lancamento-fixo',
    templateUrl: './lancamento-fixo.component.html',
    styleUrls: ['./lancamento-fixo.component.html'],
    providers: [DatePipe]
})
export class LancamentoLancarFixoComponent implements OnInit{

    public idFolha: number = 0;
    public idCategoria: number = 0;

    public lancamentosFixos: Array<LancamentoFixo> = [];

    public formLancamento: FormGroup = new FormGroup({});

    public desativaBotaoSalvar: boolean = false;

    constructor(
        private activedRoute: ActivatedRoute,
        private router: Router,
        private formatadorData: DatePipe,
        private formBuilder: FormBuilder,
        private lancamentoFixoService: LancamentoFixoService,
        private folhaService: FolhaService,
        private spinnerService: SpinnerService,
        private alertaService: AlertasService
    ){}

    ngOnInit(): void {

        this.activedRoute.queryParams.subscribe({
            next: queryParams => {

                this.idCategoria = queryParams?.['categoria'];
                this.idFolha = queryParams?.['folha'];

            },
            error: error => {
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

        this.buscarLancamentoFixos();

    }

    public buscarLancamentoFixos(){

        this.spinnerService.ativarSpinner();

        this.lancamentoFixoService.listar(this.idCategoria).subscribe({
            next: lancamentosFixos => {
                this.lancamentosFixos = lancamentosFixos;
                this.spinnerService.desativarSpinner();
            },
            error: error => {
                this.router.navigate(['/categoria']);
                this.spinnerService.desativarSpinner();
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

    public selecionaLancamento(evento: any){

        let idLancamento = evento.target.value;

        if(idLancamento == 0){
            this.setValores(null);
            return ;
        }

        let lancamento = this.lancamentosFixos.find(l => l.id == idLancamento) as LancamentoFixo;

        this.setValores(lancamento);

    }

    private setValores(lancamento: LancamentoFixo | null){

        if(lancamento != null){
            this.formLancamento.get('titulo')?.setValue(lancamento.titulo);
            this.formLancamento.get('descricao')?.setValue(lancamento.descricao);
            this.formLancamento.get('valor')?.setValue(lancamento.valor);
            if(lancamento.tipo == 'Provento'){
                this.formLancamento.get('tipo')?.setValue("0");
            }else{
                this.formLancamento.get('tipo')?.setValue("1");
            }

        }else{
            this.formLancamento.get('titulo')?.setValue('');
            this.formLancamento.get('descricao')?.setValue('');
            this.formLancamento.get('valor')?.setValue('');
            this.formLancamento.get('tipo')?.setValue("0");
        }

    }

    public enviar(){

        this.spinnerService.ativarSpinner();

        this.desativaBotaoSalvar = true;

        let lancamento = this.formLancamento.getRawValue() as LancamentoDados;

        this.spinnerService.ativarSpinner();

        this.folhaService.salvarLancamento(0,this.idFolha,lancamento).subscribe({
            next: lancamento => {
                this.formLancamento.reset();
                this.spinnerService.desativarSpinner();
                this.alertaService.alertaSucesso("Lançamento realizado com sucesso!");
                this.router.navigate(['/lancamentos'], { queryParams: { categoria: this.idCategoria } });
            },
            error: error => {
                this.spinnerService.desativarSpinner();
                this.desativaBotaoSalvar = false;
                this.alertaService.alertaErro("Erro ao realizar lançamento!",false);
                if (error.error.code == 403) {
                    this.router.navigate(['/lancamentos'], { queryParams: { categoria: this.idCategoria } });
                }
            }
        });

    }

}

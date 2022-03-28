import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { LancamentoSalvar } from "src/app/modelos/lancamento-salvar.model";
import { Tipo } from "src/app/modelos/tipo.model";
import { LancamentoSalvoService } from "src/app/servicos/http/lancamento-salvo.service";
import { LancamentoService } from "src/app/servicos/http/lancamento.service";
import { TipoService } from "src/app/servicos/http/tipo.service";

@Component({
    selector: 'lancamento-novo',
    templateUrl: './lancamento-novo.component.html',
    styleUrls: ['./lancamento-novo.component.css'],
    providers: [DatePipe]
})
export class LancamentoNovoComponent implements OnInit{

    public idBalanco: number = 0;
    public idCategoria: number = 0;

    public tiposLancamentos: Array<Tipo>;

    public formLancamento: FormGroup;

    public desativaBotaoSalvar: boolean = false;

    public id:number = 0;

    constructor(
        private tipoService: TipoService,
        private formBuilder: FormBuilder,
        private lancamentoService: LancamentoService,
        private router: Router,
        private activedRoute: ActivatedRoute,
        private spinnerService: SpinnerService,
        private alertaService: AlertasService,
        private formatadorData: DatePipe
    ) { }

    ngOnInit(): void {

        

        this.activedRoute.queryParams.subscribe(
            queryParams => {

                this.idCategoria = queryParams.categoria;
                this.idBalanco = queryParams.balanco;

            },
            error => {
                this.spinnerService.desativarSpinner();
                this.router.navigate(['/categorias']);
            }
        );

        this.tipoService.buscarTodos().subscribe(
            tipos => {
                this.tiposLancamentos = tipos;
            }
        );

        this.formLancamento = this.formBuilder.group({
            nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
            descricao: ['', [Validators.maxLength(255)]],
            valor: ['', [Validators.required, Validators.min(0)]],
            tipo: ['', [Validators.required]],
            data: [this.formatadorData.transform(new Date(),'yyyy-MM-dd'),[Validators.required]],
            salvar: [false]
        });

        this.activedRoute.params.subscribe(
            params => {

                let id = params.id;
               
                if (id != null) {
                    this.spinnerService.ativarSpinner();
                    this.id = id;
                    this.lancamentoService.buscarPorId(this.idCategoria,this.idBalanco,id).subscribe(
                        lancamento => {
                            this.formLancamento.get('nome').setValue(lancamento.nome);
                            this.formLancamento.get('descricao').setValue(lancamento.descricao);
                            this.formLancamento.get('valor').setValue(lancamento.valor);
                            this.formLancamento.get('tipo').setValue(lancamento.tipo.valor);
                            this.formLancamento.get('data').setValue(lancamento.data);
                            this.spinnerService.desativarSpinner();
                        },
                        error => {
                            this.spinnerService.desativarSpinner();
                            this.router.navigate(['/lancamentos'], { queryParams: { categoria: this.idCategoria } });
                        }
                    );
                }
            }
        );

    }

    public verificaCampo(campo: string): boolean {
        return this.formLancamento.get(campo).errors && this.formLancamento.get(campo).touched;
    }

    public tamanhoCampo(campo: string): number {
        let valor = this.formLancamento.get(campo).value as string;
        if (valor == null) {
            return 0;
        }
        return valor.length;
    }

    public enviar() {

        this.spinnerService.ativarSpinner();

        let lancamento = this.formLancamento.getRawValue() as LancamentoSalvar;

        this.desativaBotaoSalvar = true;

        this.lancamentoService.salvar(this.idCategoria,this.idBalanco,this.id,lancamento).subscribe(
            lan => {
                this.formLancamento.reset();
                this.router.navigate(['/lancamentos'], { queryParams: { categoria: this.idCategoria } });
                this.spinnerService.desativarSpinner();
                if(this.id == 0){
                    this.alertaService.alertaSucesso("Lançamento realizado com sucesso!");
                }else{
                    this.alertaService.alertaSucesso("Lançamento atualizado com sucesso!");
                }
            },
            error => {
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
        );

    }

}
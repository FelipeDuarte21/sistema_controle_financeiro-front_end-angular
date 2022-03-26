import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { LancamentoSalvar } from "src/app/modelos/lancamento-salvar.model";
import { LancamentoSalvo } from "src/app/modelos/lancamento-salvo.model";
import { Tipo } from "src/app/modelos/tipo.model";
import { LancamentoSalvoService } from "src/app/servicos/http/lancamento-salvo.service";
import { LancamentoService } from "src/app/servicos/http/lancamento.service";
import { TipoService } from "src/app/servicos/http/tipo.service";

@Component({
    selector: 'lancamento-salvo',
    templateUrl: './lancamento-salvo.component.html',
    styleUrls: ['./lancamento-salvo.component.html'],
    providers: [DatePipe]
})
export class LancamentoSalvoComponent implements OnInit{

    public idBalanco: number = 0;
    public idCategoria: number = 0;

    public lancamentosSalvos: Array<LancamentoSalvo> = [];

    public tiposLancamentos: Array<Tipo> = [];

    public formLancamento: FormGroup;

    public desativaBotaoSalvar: boolean = false;

    constructor(
        private activedRoute: ActivatedRoute,
        private router: Router,
        private tipoService: TipoService,
        private formatadorData: DatePipe,
        private formBuilder: FormBuilder,
        private lancamentoSalvoService: LancamentoSalvoService,
        private lancamentoService: LancamentoService,
        private spinnerService: SpinnerService,
        private alertaService: AlertasService
    ){}

    ngOnInit(): void {

        this.activedRoute.queryParams.subscribe(
            queryParams => {

                this.idCategoria = queryParams.categoria;
                this.idBalanco = queryParams.balanco;

            },
            error => {
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

        this.buscarLancamentoSalvos();

    }

    public buscarLancamentoSalvos(){

        this.lancamentoSalvoService.listar(this.idCategoria,0,1).subscribe(
            resp => {
                if(resp.content.length != 0){
                    this.lancamentoSalvoService.listar(this.idCategoria,0,resp.totalElements).subscribe(
                        pagLancamentoSalvos => {
                            this.lancamentosSalvos = pagLancamentoSalvos.content;
                        },
                        error => {
                            this.router.navigate(['/categorias']);
                        }
                    );
                }
            },
            error => {
                this.router.navigate(['/categorias']);
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

    public selecionaLancamentos(evento: any){

        let idLancamento = evento.target.value;

        if(idLancamento == 0){
            this.setValores(null);
            return ;
        }

        let lancamento = this.lancamentosSalvos.find(l => l.id == idLancamento);

        this.setValores(lancamento);

    }

    private setValores(lancamento: LancamentoSalvo){

        if(lancamento != null){
            this.formLancamento.get('nome').setValue(lancamento.nome);
            this.formLancamento.get('descricao').setValue(lancamento.descricao);
            this.formLancamento.get('valor').setValue(lancamento.valor);
            this.formLancamento.get('tipo').setValue(lancamento.tipo.valor);

        }else{
            this.formLancamento.get('nome').setValue('');
            this.formLancamento.get('descricao').setValue('');
            this.formLancamento.get('valor').setValue('');
            this.formLancamento.get('tipo').setValue('');
        }

    }

    public enviar(){

        this.spinnerService.ativarSpinner();

        this.desativaBotaoSalvar = true;

        let lancamento = this.formLancamento.getRawValue() as LancamentoSalvar;

        this.lancamentoService.salvar(this.idCategoria,this.idBalanco,0,lancamento).subscribe(
            resp => {
                this.formLancamento.reset();
                this.router.navigate(['/lancamentos'], { queryParams: { categoria: this.idCategoria } });
                this.spinnerService.desativarSpinner();
                this.alertaService.alertaSucesso("Lançamento realizado com sucesso!");
            },
            error => {
                this.spinnerService.desativarSpinner();
                this.desativaBotaoSalvar = false;
                this.alertaService.alertaErro("Erro ao realizar lançamento!",false);
                if (error.error.code == 403) {
                    this.router.navigate(['/lancamentos'], { queryParams: { categoria: this.idCategoria } });
                }
            }
        );

    }

}
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { LancamentoSalvoSalvar } from "src/app/modelos/lancamento-salvo-salvar.model";
import { Tipo } from "src/app/modelos/tipo.model";
import { LancamentoSalvoService } from "src/app/servicos/http/lancamento-salvo.service";
import { TipoService } from "src/app/servicos/http/tipo.service";

@Component({
    selector: 'lancamento-salvo-salvar',
    templateUrl: './lancamento-salvo-salvar.component.html',
    styleUrls: ['./lancamento-salvo-salvar.component.css']
})
export class LancamentoSalvoSalvarComponent implements OnInit{

    public titulo:string = "Lançamentos Salvos - Cadastrar";

    public idCategoria:number = 0;

    public tiposLancamentos: Array<Tipo>;

    public desativaBotaoSalvar: boolean = false;

    public formLancamento: FormGroup;

    private id:number = 0;

    constructor(
        private activedRoute: ActivatedRoute,
        private router: Router,
        private spinnerService: SpinnerService,
        private formBuilder: FormBuilder,
        private tipoService: TipoService,
        private lancamentoSalvoService: LancamentoSalvoService,
        private alertaService: AlertasService
    ){}

    ngOnInit(): void {

        this.activedRoute.queryParams.subscribe(
            queryParams => {

                this.idCategoria = queryParams.categoria;

                if(this.idCategoria==undefined || this.idCategoria==null || this.idCategoria==0) {
                    this.router.navigate(['/categoria']);
                }

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
            tipo: ['', [Validators.required]]
        });

        this.activedRoute.params.subscribe(
            params => {

                if(params.id){

                    this.spinnerService.ativarSpinner();

                    this.id = params.id;

                    this.titulo = "Lançamentos Salvos - Atualizar"

                    this.lancamentoSalvoService.buscarPorId(this.id).subscribe(
                        lancamento => {
                            this.formLancamento.get('nome').setValue(lancamento.nome);
                            this.formLancamento.get('descricao').setValue(lancamento.descricao);
                            this.formLancamento.get('valor').setValue(lancamento.valor);
                            this.formLancamento.get('tipo').setValue(lancamento.tipo.valor);
                            this.spinnerService.desativarSpinner();
                        },
                        error => {
                            this.spinnerService.desativarSpinner();
                            this.router.navigate(['/categorias']);
                        }
                    );

                }

            }
        );

    }
    
    public verificaCampo(campo:string): boolean{
        return this.formLancamento.get(campo).errors && this.formLancamento.get(campo).touched;
    }

    public tamanhoCampo(campo:string): number{
        let valor = this.formLancamento.get(campo).value as string;
        if(valor == null){
            return 0;
        }
        return valor.length;
    }

    public enviar(){

        this.spinnerService.ativarSpinner();

        this.desativaBotaoSalvar = true;

        let lancamentoSalvoSalvar = this.formLancamento.getRawValue() as LancamentoSalvoSalvar;

        this.lancamentoSalvoService.salvar(this.idCategoria,this.id,lancamentoSalvoSalvar).subscribe(
            resp => {
                this.formLancamento.reset();
                this.router.navigate(['/lancamentos-salvos'], { queryParams: { categoria: this.idCategoria } });
                this.spinnerService.desativarSpinner();
                if(this.id == 0){
                    this.alertaService.alertaSucesso("Lançamento cadastrado com sucesso!");
                }else{
                    this.alertaService.alertaSucesso("Lançamento atualizado com sucesso!");
                }
            },
            error => {
                this.spinnerService.desativarSpinner();
                this.desativaBotaoSalvar = false;
                if(this.id == 0){
                    this.alertaService.alertaErro("Erro ao cadastrar lançamento!",false);
                }else{
                    this.alertaService.alertaErro("Erro ao atualizar lançamento!",false);
                }
                if (error.error.code == 403) {
                    this.router.navigate(['/lancamentos-salvos'], { queryParams: { categoria: this.idCategoria } });
                }
            }
        );

    }

}
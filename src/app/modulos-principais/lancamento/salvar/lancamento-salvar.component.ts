import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LancamentoSalvar } from "src/app/modelos/lancamento.model";
import { Tipo } from "src/app/modelos/tipo.model";
import { LancamentoService } from "src/app/servicos/http/lancamento.service";
import { TipoService } from "src/app/servicos/http/tipo.service";

@Component({
    selector: 'lancamento-salvar',
    templateUrl: './lancamento-salvar.component.html',
    styleUrls: ['./lancamento-salvar.component.css']
})
export class LancamentoSalvarComponent implements OnInit{

    public titulo: string = "Lançar";

    public idCategoria:number;
    public idBalanco:number;

    public tiposLancamentos: Array<Tipo>;

    public formLancamento: FormGroup;

    public exibeSpinner: boolean = false;

    public exibeSpinnerSalvar:boolean = false;
    public desativaBotaoSalvar:boolean = false;

    constructor(
        private tipoService:TipoService,
        private formBuilder: FormBuilder,
        private lancamentoService: LancamentoService,
        private router: Router,
        private activedRoute: ActivatedRoute
    ){}

    ngOnInit(): void {
        
        this.activedRoute.queryParams.subscribe(
            queryParams => {

                this.idCategoria = queryParams.categoria;
                this.idBalanco = queryParams.balanco;

                if(this.idCategoria == undefined || this.idCategoria==null || this.idCategoria==0)
                    this.router.navigate(['/categoria']);

                if(this.idBalanco==undefined || this.idBalanco==null || this.idBalanco==0)
                    this.router.navigate(['/lancamento'],{queryParams:{categoria:this.idBalanco}});
                

            },
            error => {
                this.router.navigate(['/categoria']);            
            }
        );

        
        this.tipoService.buscarTodos().subscribe(
            tipos => {
                this.tiposLancamentos = tipos;
            }
        );

        this.formLancamento = this.formBuilder.group({
            id: [0],
            nome: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(80)]],
            descricao: ['',[Validators.maxLength(255)]],
            valor: ['',[Validators.required,Validators.min(0)]],
            dataCadastro: [''],
            sugestao: [false],
            balanco: [this.idBalanco],
            tipo: ['',[Validators.required]]
        });
        

        this.activedRoute.params.subscribe(resp => {
            let id = resp.id;
            if(id == null){
                this.titulo = "Lançar";
            }else{
                this.exibeSpinner = true;
                this.titulo = "Atualizar Lançamento";
                this.lancamentoService.buscarPorId(id).subscribe(
                    lancamento => {
                        this.formLancamento.get('id').setValue(lancamento.id);
                        this.formLancamento.get('nome').setValue(lancamento.nome);
                        this.formLancamento.get('descricao').setValue(lancamento.descricao);
                        this.formLancamento.get('valor').setValue(lancamento.valor);
                        this.formLancamento.get('dataCadastro').setValue(lancamento.dataCadastro);
                        this.formLancamento.get('sugestao').setValue(lancamento.sugestao);
                        this.formLancamento.get('balanco').setValue(this.idBalanco);
                        this.formLancamento.get('tipo').setValue(lancamento.tipo.valor);
                        this.exibeSpinner = false;
                    },
                    error => {
                        this.router.navigate(['/lancamento'],{queryParams:{categoria:this.idCategoria}});
                    }
                );
            }    
        });

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

        let lancamento = this.formLancamento.getRawValue() as LancamentoSalvar;

        this.exibeSpinnerSalvar = true;
        this.desativaBotaoSalvar = true;

        if(lancamento.id == 0){

            this.lancamentoService.cadastrar(lancamento).subscribe(
                lancamento => {
                    this.formLancamento.reset();
                    this.router.navigate(['/lancamento'],{queryParams:{categoria:this.idCategoria}});
                    alert("Lançamento Realizado Com Sucesso!");
                },
                error => {
                    console.log(error);
                    alert("Erro ao Tentar Realizar Lançamento!");
                    this.exibeSpinnerSalvar = false;
                    this.desativaBotaoSalvar = false;
                    if(error.error.code == 403){
                        this.router.navigate(['/lancamento'],{queryParams:{categoria:this.idCategoria}});
                    }
                }
            );

        }else{

            this.lancamentoService.alterar(lancamento).subscribe(
                lancamento => {
                    this.formLancamento.reset();
                    this.router.navigate(['/lancamento'],{queryParams:{categoria:this.idCategoria}});
                    alert("Lançamento Atualizado Com Sucesso!");
                },
                error => {
                    console.log(error);
                    alert("Erro ao Tentar Atualizar Lançamento!");
                    this.exibeSpinnerSalvar = false;
                    this.desativaBotaoSalvar = false;
                    if(error.error.code == 403){
                        this.router.navigate(['/lancamento'],{queryParams:{categoria:this.idCategoria}});
                    }
                }
            );

        }
        
    }

}
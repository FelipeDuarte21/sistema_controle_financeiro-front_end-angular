import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LancamentoSalvar } from "src/app/modelos/lancamento.model";
import { Tipo } from "src/app/modelos/tipo.model";
import { LancamentoService } from "src/app/servicos/lancamento.service";
import { TipoService } from "src/app/servicos/tipo.service";

@Component({
    selector: 'lancamento-salvar',
    templateUrl: './lancamento-salvar.component.html',
    styleUrls: ['./lancamento-salvar.component.css']
})
export class LancamentoSalvarComponent implements OnInit{

    public titulo: string = "Lançar";

    public idCategoria:number;

    public tiposLancamentos: Array<Tipo>;

    public formLancamento: FormGroup;

    constructor(
        private tipoService:TipoService,
        private formBuilder: FormBuilder,
        private lancamentoService: LancamentoService,
        private router: Router,
        private activedRoute: ActivatedRoute
    ){}

    ngOnInit(): void {
        this.idCategoria = parseInt(localStorage.getItem("categoria"));
        
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
            balanco: [parseInt(localStorage.getItem("balanco"))],
            tipo: ['',[Validators.required]]
        });

        this.activedRoute.params.subscribe(resp => {
            let id = resp.id;
            if(id == null){
                this.titulo = "Lançar";
            }else{
                this.titulo = "Atualizar Lançamento";
                this.lancamentoService.buscarPorId(id).subscribe(
                    lancamento => {
                        this.formLancamento.get('id').setValue(lancamento.id);
                        this.formLancamento.get('nome').setValue(lancamento.nome);
                        this.formLancamento.get('descricao').setValue(lancamento.descricao);
                        this.formLancamento.get('valor').setValue(lancamento.valor);
                        this.formLancamento.get('dataCadastro').setValue(lancamento.dataCadastro);
                        this.formLancamento.get('sugestao').setValue(lancamento.sugestao);
                        this.formLancamento.get('balanco').setValue(parseInt(localStorage.getItem("balanco")));
                        this.formLancamento.get('tipo').setValue(lancamento.tipo.valor);
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

        if(lancamento.id == 0){

            this.lancamentoService.cadastrar(lancamento).subscribe(
                lancamento => {
                    this.formLancamento.reset();
                    this.router.navigate(['/lancamento',this.idCategoria]);
                    alert("Lançamento Realizado Com Sucesso!");
                },
                error => {
                    console.log(error);
                    alert("Erro ao Tentar Realizar Lançamento!");
                }
            );

        }else{

            this.lancamentoService.alterar(lancamento).subscribe(
                lancamento => {
                    this.formLancamento.reset();
                    this.router.navigate(['/lancamento',this.idCategoria]);
                    alert("Lançamento Atualizado Com Sucesso!");
                },
                error => {
                    console.log(error);
                    alert("Erro ao Tentar Atualizar Lançamento!");
                }
            );

        }
        
    }

}
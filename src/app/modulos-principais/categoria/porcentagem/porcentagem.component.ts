import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { Categoria } from "src/app/modelos/categoria.model";
import { CategoriaPorcentageDados } from "src/app/modelos/categoriaPorcentagemDados.model";
import { CategoriaService } from "src/app/servicos/http/categoria.service";
import { UsuarioService } from "src/app/servicos/http/usuario.service";

@Component({
    selector: 'porcentagem',
    templateUrl: './porcentagem.component.html',
    styleUrls: ['./porcentagem.component.css']
})
export class PorcentagemComponent implements OnInit{

    public formPorcentagem: FormGroup = new FormGroup({});

    private categorias: Categoria[] = [];

    public desativaBotaoAtualizar: boolean = false;

    constructor(
        private router: Router,
        private alertaService: AlertasService,
        private spinnerService: SpinnerService,
        private formBuilder: FormBuilder,
        private categoriaService: CategoriaService,
    ){}

    ngOnInit(): void {

        let rendaMensalTotal = parseInt(window.sessionStorage.getItem("rendaMensalTotal") as string ) as number;

        this.formPorcentagem = this.formBuilder.group({
            rendaMensalTotal: [rendaMensalTotal,[Validators.required,Validators.min(0.00)]],
            categorias: this.formBuilder.array([]),
        });

        let idConta = parseInt(window.sessionStorage.getItem("idConta") as string);

        this.categoriaService.listar(idConta).subscribe({
            next: categorias => {

                this.categorias = categorias;

                categorias.forEach(categoria => {

                    const formGroup = this.criarFormGroupCategoria(categoria);

                    this.formCategoria.push(formGroup);

                });

            },
            error: error => {}
        });

    }

    private criarFormGroupCategoria(categoria: Categoria): FormGroup{
        return this.formBuilder.group({
            id: [categoria.id,[Validators.required]],
            porcentagem: [categoria.porcentagem, [Validators.required, Validators.min(0), Validators.max(100)]]
        });
    }

    get formCategoria(): FormArray{
        return this.formPorcentagem.get('categorias') as FormArray;
    }

    public getNomeCategoria(id: number): string{
        return this.categorias.find(c => c.id == id)?.nome as string;
    }

    public getValorCalculado(porcentagem: number): number{
        let rendaTotal = this.formPorcentagem.get('rendaMensalTotal')?.value as number;
        return rendaTotal * (porcentagem / 100);
    }

    public getPorcentagemTotal(): number{
        let somatoria = 0;
        this.formCategoria.controls.forEach(cat => {
            somatoria += cat.get('porcentagem')?.value as number;
        });
        return somatoria;
    }

    public getValorTotal(): number {
        let somatoria = 0;
        this.formCategoria.controls.forEach(cat => {
            somatoria += this.getValorCalculado(cat.get('porcentagem')?.value as number);
        });
        return somatoria;
    }

    public isFormularioValido(): boolean{
        return !this.desativaBotaoAtualizar && this.getPorcentagemTotal() == 100.00 && this.formPorcentagem.valid
            && this.formCategoria.valid;
    }

    public verificaCampoPorcentagem(campo:string): boolean | null | undefined{
        return this.formPorcentagem.get(campo)?.errors && this.formPorcentagem.get(campo)?.touched;
    }

    public verificaCampoCategoria(formulario: FormGroup, campo:string): boolean | null | undefined{
        return formulario.get(campo)?.errors && formulario.get(campo)?.touched;
    }

    public enviar(){

        this.spinnerService.ativarSpinner();

        let dados = this.formCategoria.getRawValue() as CategoriaPorcentageDados[];

        this.categoriaService.alterarPorcentagems(dados).subscribe({
            next: categorias => {
                this.spinnerService.desativarSpinner();
                this.alertaService.alertaSucesso("Sucesso! porcentagems das categorias foram atualizadas com sucesso!");
                this.router.navigate(['/categoria']);
            },
            error: error => {
                this.spinnerService.desativarSpinner();
                this.alertaService.alertaErro("Erro! erro ao atualizar as porcentagems das categorias!");
            }
        })
    }

}

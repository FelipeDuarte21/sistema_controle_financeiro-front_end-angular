import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { CategoriaDados } from "src/app/modelos/categoriaDados.model";
import { CategoriaCadastro, UsuarioDados } from "src/app/modelos/usuarioDados.model";
import { UsuarioService } from "src/app/servicos/http/usuario.service";

@Component({
    selector: 'usuario-cadastro',
    templateUrl: './usuario-cadastro.component.html',
    styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent{

    public formCadastroUsuario: FormGroup = new FormGroup({});

    public messagemErro:string = "";
    public exibeErro:boolean = false;

    public desativaBotaoForm: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private usuarioService: UsuarioService,
        private router: Router,
        private spinnerService: SpinnerService,
        private alertaService: AlertasService
    ){}

    ngOnInit(): void {

        this.formCadastroUsuario = this.formBuilder.group({
            nome: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
            email: ['',[Validators.required,Validators.email,Validators.maxLength(80)]],
            senha: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(15)]],
            rendaMensalTotal: ['', [Validators.required, Validators.min(1)]],
            categorias: this.formBuilder.array([])
        });

        this.getCategoriasPadrao().forEach(categoria => {
            this.formCategorias.push(this.novoFormCategoria(categoria));
        });

    }

    public verificaCampo(campo:string): boolean | null | undefined{
        return this.formCadastroUsuario.get(campo)?.errors && this.formCadastroUsuario.get(campo)?.touched;
    }

    public verificaFormulario(formaulario: FormGroup, campo:string): boolean | null | undefined{
        return formaulario.get(campo)?.errors && formaulario.get(campo)?.touched;
    }

    public tamanhoCampo(campo:string): number{
        let valor = this.formCadastroUsuario.get(campo)?.value as string;
        if(valor == null){
            return 0;
        }
        return valor.length;
    }

    public tamanhoCampoFormulario(formulario: FormGroup, campo: string): number{
        let valor = formulario.get(campo)?.value as string;
        if(valor == null){
            return 0;
        }
        return valor.length;
    }

    public enviar(){

        this.desativaBotaoForm = true;

        this.spinnerService.ativarSpinner();

        let usuario = this.formCadastroUsuario.getRawValue() as UsuarioDados;

        this.usuarioService.cadastrar(usuario).subscribe({
            next: resp => {
                this.formCadastroUsuario.reset();
                this.desativaBotaoForm  = false;
                this.spinnerService.desativarSpinner();
                this.alertaService.alertaSucesso("Seu cadastro foi realizado com sucesso!",true,3000);
                setTimeout(()=>{
                    this.router.navigate(['/']);
                },3000);
            },
            error: error => {
                console.log(error);
                this.desativaBotaoForm = false;
                this.spinnerService.desativarSpinner();
                if(error.error.code == 400){
                    this.alertaService.alertaErro(`Erro - ${error.error.message}`,false);
                }else{
                    this.alertaService.alertaErro("Erro ao relizar cadastro",false);
                }
            }
        });

    }

    private getCategoriasPadrao(): CategoriaCadastro[]{
        return [
            {
                "nome": "Despesa Gerais",
                "descricao": "Categoria separada para despesas gerais - PADRÃO DO SISTEMA",
                "porcentagem": 50
            },
            {
                "nome": "Fundo de Emergência",
                "descricao": "Categoria separada para fundo de emergência - PADRÃO DO SISTEMA",
                "porcentagem": 40
            },
            {
                "nome": "Livre",
                "descricao": "Categoria separada para o dinheiro livre - PADRÃO DO SISTEMA",
                "porcentagem": 10
            }
        ] as CategoriaCadastro[];
    }

    get formCategorias(): FormArray{
        return this.formCadastroUsuario.get('categorias') as FormArray;
    }

    private novoFormCategoria(categoria: CategoriaCadastro | null): FormGroup{

        const formGroup = this.formBuilder.group({
            nome: ['',[Validators.required,Validators.minLength(3)]],
            descricao: [''],
            porcentagem: [0,[Validators.required,Validators.min(0),Validators.max(100)]]
        });

        if(categoria != null){
            formGroup.get('nome')?.setValue(categoria.nome);
            formGroup.get('descricao')?.setValue(categoria.descricao);
            formGroup.get('porcentagem')?.setValue(categoria.porcentagem);
        }

        return formGroup;

    }

    public addCategoria(){
        this.formCategorias.push(this.novoFormCategoria(null));
    }

    public removerCategoria(index: number){
        this.formCategorias.removeAt(index);
    }

    public getValorCalculado(porcentagem: number): number{
        let rendaTotal = this.formCadastroUsuario.get('rendaMensalTotal')?.value as number;
        return rendaTotal * (porcentagem / 100);
    }

    public getPorcentagemTotal(): number{
        let somatoria = 0;
        this.formCategorias.controls.forEach(cat => {
            somatoria += cat.get('porcentagem')?.value as number;
        });
        return somatoria;
    }

    public isFormularioValido(): boolean{
        return !this.desativaBotaoForm  && this.getPorcentagemTotal() == 100.00 && this.formCadastroUsuario.valid
            && this.formCategorias.valid;
    }

}

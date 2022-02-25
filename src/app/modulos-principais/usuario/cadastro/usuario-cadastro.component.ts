import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { UsuarioSalvar } from "src/app/modelos/usuario-salvar.model";
import { UsuarioService } from "src/app/servicos/http/usuario.service";

@Component({
    selector: 'usuario-cadastro',
    templateUrl: './usuario-cadastro.component.html',
    styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit{

    public formCadastroUsuario: FormGroup;

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
            senha: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(15)]]
        });

    }

    public verificaCampo(campo:string): boolean{
        return this.formCadastroUsuario.get(campo).errors && this.formCadastroUsuario.get(campo).touched;
    }

    public tamanhoCampo(campo:string): number{
        let valor = this.formCadastroUsuario.get(campo).value as string;
        if(valor == null){
            return 0;
        }
        return valor.length;
    }

    public enviar(){

        this.desativaBotaoForm = true;

        this.spinnerService.ativarSpinner();

        let usuario = this.formCadastroUsuario.getRawValue() as UsuarioSalvar

        this.usuarioService.cadastrar(usuario).subscribe(
            resp => {
                this.formCadastroUsuario.reset();
                this.desativaBotaoForm  = false;
                this.spinnerService.desativarSpinner();
                this.alertaService.alertaSucesso("Seu cadastro foi realizado com sucesso!",false);
            },
            error => {
                this.desativaBotaoForm = false;
                this.spinnerService.desativarSpinner();
                if(error.error.code == 400){
                    this.alertaService.alertaErro(`Erro - ${error.error.message}`,false);
                }else{
                    this.alertaService.alertaErro("Erro ao relizar cadastro",false);
                }
            }
        );

    }

}
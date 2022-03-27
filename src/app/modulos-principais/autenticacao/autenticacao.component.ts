import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { Autenticacao } from "src/app/modelos/autenticacao.model";
import { AutenticacaoService } from "src/app/servicos/http/autenticacao.service";
import { UsuarioLogadoService } from "src/app/servicos/internos/usuario-logado.service";

@Component({
    selector: 'autenticacao',
    templateUrl: './autenticacao.component.html',
    styleUrls: ['./autenticacao.component.css']
})
export class AutenticacaoComponent implements OnInit{

    public formAutenticacao: FormGroup;

    public desativaBotaoLogin:boolean = true;

    constructor(
        private formBuilder: FormBuilder,
        private autenticacaoService: AutenticacaoService,
        private usuarioLogadoService: UsuarioLogadoService,
        private router: Router,
        private spinnerService: SpinnerService,
        private alertaService: AlertasService
    ){}

    ngOnInit(): void {
        
        this.formAutenticacao = this.formBuilder.group({
            email: ['',[Validators.required,Validators.email,Validators.maxLength(80)]],
            senha: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(15)]]
        });

    }

    public verificaCampo(campo:string): boolean{
        return this.formAutenticacao.get(campo).errors && this.formAutenticacao.get(campo).touched;
    }

    public enviar(){

        this.desativaBotaoLogin = true;

        let autenticacao = this.formAutenticacao.getRawValue() as Autenticacao;

        this.spinnerService.ativarSpinner();

        this.autenticacaoService.login(autenticacao).subscribe(
            resp => {

                let token = `${resp.tipo} ${resp.token}`;
                
                this.usuarioLogadoService.logarUsuario(autenticacao.email,token);

                this.router.navigate(['/categorias']);

                this.spinnerService.desativarSpinner();

            },
            error => {
                this.formAutenticacao.reset();
                this.spinnerService.desativarSpinner();
                this.alertaService.alertaErro("Email e/ou Senha incorretos!");
            }
        );

    }

    public redirecionaSaibaMais(){
       this.router.navigate(['/sobre']);
    }

    public redirecionaCadastro(){
        this.router.navigate(['/usuarios/cadastro']);
    }

}
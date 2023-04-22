import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { Autenticacao } from "src/app/modelos/autenticacao.model";
import { AutenticacaoService } from "src/app/servicos/http/autenticacao.service";
import { UsuarioService } from "src/app/servicos/http/usuario.service";
import { UsuarioLogadoService } from "src/app/servicos/internos/usuario-logado.service";

@Component({
    selector: 'autenticacao',
    templateUrl: './autenticacao.component.html',
    styleUrls: ['./autenticacao.component.css']
})
export class AutenticacaoComponent implements OnInit{

    public formAutenticacao: FormGroup = new FormGroup({});

    public desativaBotaoLogin:boolean = true;

    constructor(
        private spinnerService: SpinnerService,
        private alertaService: AlertasService,
        private formBuilder: FormBuilder,
        private router: Router,
        private autenticacaoService: AutenticacaoService,
        private usuarioLogadoService: UsuarioLogadoService,
        private usuarioService: UsuarioService
    ){}

    ngOnInit(): void {

        this.formAutenticacao = this.formBuilder.group({
            email: ['',[Validators.required,Validators.email,Validators.maxLength(80)]],
            senha: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(15)]]
        });

    }

    public verificaCampo(campo:string): boolean | null | undefined{
        return this.formAutenticacao.get(campo)?.errors && this.formAutenticacao.get(campo)?.touched;
    }

    public enviar(){

        this.desativaBotaoLogin = true;

        let autenticacao = this.formAutenticacao.getRawValue() as Autenticacao;

        this.spinnerService.ativarSpinner();

        this.autenticacaoService.login(autenticacao).subscribe({
            next: resp => {

                let token = `${resp.tipo} ${resp.token}`;

                this.usuarioLogadoService.logarUsuario(resp.idUsuario,token);

                this.usuarioService.buscarPorId(resp.idUsuario).subscribe({
                    next: usuario => {

                        window.sessionStorage.setItem("idConta", usuario.conta.id.toString());
                        window.sessionStorage.setItem("rendaMensalTotal", usuario.conta.rendaMensalTotal.toString());

                        this.router.navigate([`/categoria`]);

                    },
                    error: error => { }
                })

                this.spinnerService.desativarSpinner();

            },
            error: () => {
                this.formAutenticacao.reset();
                this.spinnerService.desativarSpinner();
                this.alertaService.alertaErro("Email e/ou Senha incorretos!");
            }
        });

    }

    public redirecionaCadastro(){
        this.router.navigate(['/usuarios/cadastro']);
    }

}

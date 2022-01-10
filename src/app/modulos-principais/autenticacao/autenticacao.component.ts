import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
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

    public mostraErro: boolean = false;

    public desativaBotaoLogin:boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private autenticacaoService: AutenticacaoService,
        private usuarioLogadoService: UsuarioLogadoService,
        private router: Router,
        private spinnerService: SpinnerService
    ){}

    ngOnInit(): void {
        
        this.formAutenticacao = this.formBuilder.group({
            email: ['',[Validators.required,Validators.email,Validators.maxLength(80)]],
            senha: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]]
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

                let token = resp.headers.get('Authorization');
                
                this.usuarioLogadoService.logarUsuario(autenticacao.email,token);

                this.router.navigate(['/categoria']);

                this.spinnerService.desativarSpinner();

            },
            error => {
                console.log(error);
                this.formAutenticacao.reset();
                this.spinnerService.desativarSpinner();
                this.mostraErro = true;
            }
        );

    }

    public redirecionaSaibaMais(){
       this.router.navigate(['/sobre']);
    }

    public redirecionaCadastro(){
        this.router.navigate(['/usuario/cadastro']);
    }

}
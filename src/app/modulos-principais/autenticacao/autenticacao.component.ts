import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Autenticacao } from "src/app/modelos/autenticacao.model";
import { AutenticacaoService } from "src/app/servicos/autenticacao.service";
import { TokenService } from "src/app/servicos/token.service";
import { UsuarioLogadoService } from "src/app/servicos/usuario-logado.service";
import { UsuarioService } from "src/app/servicos/usuario.service";

@Component({
    selector: 'autenticacao',
    templateUrl: './autenticacao.component.html',
    styleUrls: ['./autenticacao.component.css']
})
export class AutenticacaoComponent implements OnInit{

    public formAutenticacao: FormGroup;

    public mostraErro: boolean = false;

    public mostraEspinner:boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private autenticacaoService: AutenticacaoService,
        private usuarioLogadoService: UsuarioLogadoService,
        private router: Router
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

        let autenticacao = this.formAutenticacao.getRawValue() as Autenticacao;

        this.autenticacaoService.login(autenticacao).subscribe(
            resp => {

                let token = resp.headers.get('Authorization');
                
                this.usuarioLogadoService.logarUsuario(autenticacao.email,token);

                this.mostraEspinner = true;
                setTimeout(() => {
                    this.router.navigate(['/categoria']);
                },2000);

            },
            error => {
                console.log(error);
                this.formAutenticacao.reset();
                this.mostraErro = true;
            }
        );

    }

}
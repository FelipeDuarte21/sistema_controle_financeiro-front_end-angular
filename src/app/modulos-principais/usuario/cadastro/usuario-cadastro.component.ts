import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioCadastro } from "src/app/modelos/usuario-cadastro.model";
import { UsuarioService } from "src/app/servicos/usuario.service";

@Component({
    selector: 'usuario-cadastro',
    templateUrl: './usuario-cadastro.component.html',
    styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit{

    public formCadastroUsuario: FormGroup;

    public messagemErro:string = "";
    public exibeErro:boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private usuarioService: UsuarioService,
        private router: Router
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

        let usuario = this.formCadastroUsuario.getRawValue() as UsuarioCadastro;

        this.usuarioService.cadastrar(usuario).subscribe(
            resp => {
                alert("Cadastro Realizado Com Sucesso!");
                this.formCadastroUsuario.reset();
                this.router.navigate(['/']);
            },
            error => {
                console.log(error);
                this.exibeErro = true;
                if(error.error.code == 400){
                    this.messagemErro = error.error.message;
                }
                this.formCadastroUsuario.reset();
            }
        );

    }

}
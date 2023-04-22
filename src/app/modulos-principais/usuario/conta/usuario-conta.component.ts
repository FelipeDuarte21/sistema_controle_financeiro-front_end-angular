import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { Usuario } from "src/app/modelos/usuario.model";
import { UsuarioDados } from "src/app/modelos/usuarioDados.model";
import { UsuarioService } from "src/app/servicos/http/usuario.service";
import { UsuarioLogadoService } from "src/app/servicos/internos/usuario-logado.service";

@Component({
    selector: 'usuario-conta',
    templateUrl: './usuario-conta.component.html',
    styleUrls: ['./usuario-conta.component.css']
})
export class UsuarioContaComponent implements OnInit{

    private idUsuario:number = 0;

    public formUsuario: FormGroup = new FormGroup({});

    public desativaBotaoForm: boolean = false;

    private usuario: Usuario | undefined;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private usuarioService: UsuarioService,
        private formBuilder: FormBuilder,
        private spinnerService: SpinnerService,
        private alertaService: AlertasService,
        private usuarioLogadoService: UsuarioLogadoService
    ){}

    ngOnInit(): void {

        this.spinnerService.ativarSpinner();

        this.formUsuario = this.formBuilder.group({
            nome: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
            email: ['',[Validators.required,Validators.email,Validators.maxLength(80)]],
            senha: ['',[Validators.minLength(8),Validators.maxLength(15)]]
        });

        this.activatedRoute.params.subscribe({
            next:  params => {

                if(!params["idUsuario"]){
                    this.router.navigate(['/login']);
                }

                this.idUsuario = params["idUsuario"];

                this.buscarUsuario();

            },
            error: error => {
                this.spinnerService.desativarSpinner();
                this.router.navigate(['/login']);
            }
        });

    }

    private buscarUsuario(){

        this.usuarioService.buscarPorId(this.idUsuario).subscribe(
            usuario => {
                this.setValores(usuario);
                this.usuario = usuario;
                this.spinnerService.desativarSpinner();
            },
            error => {
                this.router.navigate(['/login']);
                this.spinnerService.desativarSpinner();
            }
        );

    }

    private setValores(usuario: Usuario){
        this.formUsuario.get('nome')?.setValue(usuario.nome);
        this.formUsuario.get('email')?.setValue(usuario.email);
    }

    public verificaCampo(campo:string): boolean | null | undefined{
        return this.formUsuario.get(campo)?.errors && this.formUsuario?.get(campo)?.touched;
    }

    public tamanhoCampo(campo:string): number{
        let valor = this.formUsuario.get(campo)?.value as string;
        if(valor == null){
            return 0;
        }
        return valor.length;
    }

    public enviar(){

        this.spinnerService.ativarSpinner();

        this.desativaBotaoForm = true;

        let usuario = this.formUsuario.getRawValue() as UsuarioDados;
        usuario.rendaMensalTotal = this.usuario?.conta.rendaMensalTotal as number;

        this.usuarioService.atualizar(this.idUsuario, usuario).subscribe({
            next:  resp => {
                this.buscarUsuario();
                this.spinnerService.desativarSpinner();
                this.desativaBotaoForm = false;
                this.alertaService.alertaSucesso("Sucesso! Conta atualizada com sucesso!");
            },
            error: error => {
                this.spinnerService.desativarSpinner();
                this.desativaBotaoForm = false;
                this.alertaService.alertaErro("Erro! Erro ao tentar atualizar conta!");
                console.log(error);
                if(error.error.code == 400){
                    this.alertaService.alertaErro(error.error.message,false);
                }
            }
        });

    }

    public excluir(){

        let confirma = confirm("Deseja realmente excluir a conta? Todos os seus dados serão excluídos permanentemente!");

        if(confirma){

            this.usuarioService.excluir(this.idUsuario).subscribe({
                next: resp => {
                    this.usuarioLogadoService.deslogarUsuario();
                    this.router.navigate(['/login']);
                },
                error: error => {
                    this.alertaService.alertaErro("Erro! erro ao excluir conta do usuário!");
                }
            });

        }

    }

}

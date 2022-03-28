import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { RecuperaSenha } from "src/app/modelos/recupera-senha.model";
import { AutenticacaoService } from "src/app/servicos/http/autenticacao.service";

@Component({
    selector: 'tela-email',
    templateUrl: './tela-email.component.html',
    styleUrls: ['./tela-email.component.css']
})
export class TelaEmailComponent implements OnInit{

    public formEmail: FormGroup;

    public desativaBotaoForm:boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private spinnerService: SpinnerService,
        private autenticacaoService: AutenticacaoService,
        private alertaService: AlertasService,
        private router: Router
    ){}

    ngOnInit(): void {
        
        this.formEmail = this.formBuilder.group({
            email: ['',[Validators.required,Validators.email,Validators.maxLength(80)]]
        });

    }

    public verificaCampo(campo:string): boolean{
        return this.formEmail.get(campo).errors && this.formEmail.get(campo).touched;
    }

    public tamanhoCampo(campo:string): number{
        let valor = this.formEmail.get(campo).value as string;
        if(valor == null){
            return 0;
        }
        return valor.length;
    }

    public enviar(){

        this.spinnerService.ativarSpinner();

        this.desativaBotaoForm = true;

        let email = this.formEmail.getRawValue() as RecuperaSenha;

        this.autenticacaoService.recuperarSenha(email).subscribe(
            resp => {
                this.desativaBotaoForm = false;
                this.spinnerService.desativarSpinner();
                this.router.navigate(['recuperacao-senha/sucesso']);
            },
            error => {
                console.log(error);
                this.desativaBotaoForm = false;
                this.spinnerService.desativarSpinner();
                if(error.error.code == 400){
                    this.alertaService.alertaErro(error.error.message,false);
                }else{
                    this.router.navigate(['/login']);
                }
            }
        );

    }

}
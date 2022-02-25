import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { CategoriaSalvar } from "src/app/modelos/categoria-salvar.model";
import { Categoria } from "src/app/modelos/categoria.model";
import { CategoriaService } from "src/app/servicos/http/categoria.service";

@Component({
    selector: 'categoria-salvar',
    templateUrl: './categoria-salvar.component.html',
    styleUrls: ['./categoria-salvar.component.css']
})
export class CategoriaSalvarComponent implements OnInit{

    public formCategoria: FormGroup;

    public titulo:string = "Cadastrar";

    public categoria: Categoria;

    public desativaBotaoSalvar:boolean = false;

    private id:number = 0;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private activedRoute: ActivatedRoute,
        private categoriaService: CategoriaService,
        private spinnerService: SpinnerService,
        private alertaService: AlertasService
    ){}

    ngOnInit(): void {
        this.formCategoria = this.formBuilder.group({
            nome: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(60)]],
            descricao: ['',Validators.maxLength(255)],
        });

        this.activedRoute.params.subscribe(resp => {
            let id = resp.id;
            if(id == null){
                this.titulo = "Cadastrar";
            }else{
                this.id = id;
                this.titulo = "Atualizar";

                this.categoriaService.buscarPorId(id).subscribe(
                    categoria => {
                        this.id = categoria.id;
                        this.formCategoria.get("nome").setValue(categoria.nome);
                        this.formCategoria.get("descricao").setValue(categoria.descricao);
                    },
                    error => {
                        this.router.navigate(['/categoria']);
                    }
                );
            }
        });

    }

    public verificaCampo(campo:string): boolean{
        return this.formCategoria.get(campo).errors && this.formCategoria.get(campo).touched;
    }

    public tamanhoCampo(campo:string): number{
        let valor = this.formCategoria.get(campo).value as string;
        if(valor == null){
            return 0;
        }
        return valor.length;
    }

    public enviar(){

        this.desativaBotaoSalvar = true;
       
        let categoria = this.formCategoria.getRawValue() as CategoriaSalvar;

        this.spinnerService.ativarSpinner();

        this.categoriaService.salvar(this.id,categoria).subscribe(
            resp => {
                this.formCategoria.reset();
                this.desativaBotaoSalvar = false;
                this.router.navigate(['/categoria']);
                this.spinnerService.desativarSpinner();
                this.alertaService.alertaSucesso("Categoria salva com sucesso!");
            },
            error => {
                this.desativaBotaoSalvar = false;
                this.spinnerService.desativarSpinner();
                if(error.error.code == 400){
                    this.alertaService.alertaErro(`${error.error.message}`,false);
                }else{
                    this.alertaService.alertaErro("Erro ao salvar categoria!",false); 
                }
            }
        );

    }

}
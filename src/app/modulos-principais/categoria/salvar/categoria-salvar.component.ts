import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
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
            id: [0],
            nome: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(60)]],
            descricao: ['',Validators.maxLength(255)],
            dataCadastro: ['']
        });

        this.activedRoute.params.subscribe(resp => {
            let id = resp.id;
            if(id == null){
                this.titulo = "Cadastrar";
            }else{
                this.titulo = "Atualizar";

                this.categoriaService.buscarPorId(id).subscribe(
                    categoria => {
                        this.formCategoria.get("id").setValue(categoria.id);
                        this.formCategoria.get("nome").setValue(categoria.nome);
                        this.formCategoria.get("descricao").setValue(categoria.descricao);
                        this.formCategoria.get("dataCadastro").setValue(categoria.dataCadastro);
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
       
        let categoria = this.formCategoria.getRawValue() as Categoria;

        this.spinnerService.ativarSpinner();

        this.categoriaService.salvar(categoria).subscribe(
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
                this.alertaService.alertaErro("Erro ao salvar categoria!",false); 
            }
        );

    }

}
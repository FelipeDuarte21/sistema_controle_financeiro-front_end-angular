import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
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

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private activedRoute: ActivatedRoute,
        private categoriaService: CategoriaService
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
       
        let categoria = this.formCategoria.getRawValue() as Categoria;

        if(categoria.id == 0){

            this.categoriaService.cadastrar(categoria).subscribe(
                resp => {
                    this.formCategoria.reset();
                    this.router.navigate(['/categoria']);
                    alert("Categoria Cadastrada com Sucesso!");
                },
                error => {
                    alert("Erro ao Tentar Cadastrar Categoria!");
                    console.log(error);
                }
            );
            
        }else{
            
            this.categoriaService.alterar(categoria).subscribe(
                resp => {
                    this.formCategoria.reset();
                    this.router.navigate(['/categoria']);
                    alert("Categoria Atualizada com Sucesso!");
                },
                error => {
                    alert("Erro ao Tentar Atualizar Categoria!");
                    console.log(error);
                }
            );

        }

    }

}
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Categoria } from "src/app/modelos/categoria.model";
import { CategoriaService } from "src/app/servicos/categoria.service";

@Component({
    selector: 'categoria-salvar',
    templateUrl: './categoria-salvar.component.html',
    styleUrls: ['./categoria-salvar.component.css']
})
export class CategoriaSalvarComponent implements OnInit{

    public formCategoria: FormGroup;

    public titulo:string = "Cadastrar";

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private categoriaService: CategoriaService
    ){}

    ngOnInit(): void {
        this.formCategoria = this.formBuilder.group({
            id: [''],
            nome: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(60)]],
            descricao: ['',Validators.maxLength(255)]
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
        
        this.categoriaService.cadastrar(categoria).subscribe(
            resp => {
                this.formCategoria.reset();
                this.router.navigate(['/categoria']);
                alert("Categoria cadastrada com sucesso!");
            },
            error => {
                alert("Erro ao tentar cadastrar categoria!");
                console.log(error);
            }
        );

    }

}
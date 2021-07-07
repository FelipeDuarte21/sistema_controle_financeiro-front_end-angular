import { Component, OnInit } from "@angular/core";
import { PaginaCategoria } from "src/app/modelos/pagina-categoria.model";
import { CategoriaService } from "src/app/servicos/categoria.service";

@Component({
    selector: 'categoria-listar',
    templateUrl: './categoria-listar.component.html',
    styleUrls: ['./categoria-listar.component.css']
})
export class CategoriaListarComponent implements OnInit{

    public painelCard:boolean = true;
    public painelTabela:boolean = false;

    public paginaCategoria: PaginaCategoria;

    public qtdOpcoes = [4,8,12];

    private paginaAtual = 0;
    private quantidadeAtual = this.qtdOpcoes[0];
    private ordem = 1; 

    constructor(
        private categoriaService: CategoriaService
    ){}

    ngOnInit(): void {
       this.listarCategorias();
    }

    private listarCategorias(){
        this.categoriaService.listar(this.paginaAtual,this.quantidadeAtual,this.ordem).subscribe(
            pgCategoria => {
                this.paginaCategoria = pgCategoria;
            }
        );
    }

    public retrocederAnterior(){
        this.paginaAtual -= 1;
        this.listarCategorias();
    }
    
    public avancarPagina(){
        this.paginaAtual += 1;
        this.listarCategorias();
    }

    public mudarQuantidade(evento:any){
        this.paginaAtual = 0;
        this.quantidadeAtual = evento.value;
        this.listarCategorias();
    }

    public onPainelCard(){
        this.painelCard = true;
        this.painelTabela = false;
    }

    public onPainelTabela(){
        this.painelTabela = true;
        this.painelCard = false;
    }

    public excluir(id: number){

        let c = confirm("Deseja Realmente Excluir a Categoria?");

        if(c == true){

            this.categoriaService.excluir(id).subscribe(
                resp => {
                    alert("Categoria Excluída Com Sucesso!");
                    this.paginaAtual = 0;
                    this.quantidadeAtual = this.qtdOpcoes[0];
                    this.listarCategorias();
                },
                error => {
                    alert("Erro ao Excluir Categoria!");
                }
            );
            
        }

    }

}
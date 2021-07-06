import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Categoria } from "../modelos/categoria.model";
import { Observable } from "rxjs";
import { PaginaCategoria } from "../modelos/pagina-categoria.model";

@Injectable()
export class CategoriaService{

    constructor(
        private http: HttpClient
    ){}

    public cadastrar(categoria: Categoria):Observable<Categoria>{
        return null;
    }

    public alterar(Categoria: Categoria):Observable<Categoria>{
        return null;
    }

    public excluir(id: number):Observable<any>{
        return null;
    }

    public listar(pagina:number,quantidade:number):Observable<PaginaCategoria>{
        return null;
    }

}
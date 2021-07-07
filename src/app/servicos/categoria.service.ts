import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Categoria } from "../modelos/categoria.model";
import { Observable } from "rxjs";
import { PaginaCategoria } from "../modelos/pagina-categoria.model";
import { environment } from "src/environments/environment";

@Injectable()
export class CategoriaService{

    private baseURL:string = `${environment.apiURL}/categoria`;

    constructor(
        private http: HttpClient
    ){}

    public cadastrar(categoria: Categoria):Observable<Categoria>{
        return this.http.post<Categoria>(this.baseURL,categoria);
    }

    public alterar(categoria: Categoria):Observable<Categoria>{
        return this.http.put<Categoria>(this.baseURL,categoria);
    }

    public excluir(id: number):Observable<any>{
        return this.http.delete(`${this.baseURL}/${id}`);
    }

    public buscarPorId(id:number):Observable<Categoria>{
        return this.http.get<Categoria>(`${this.baseURL}/${id}`);
    }

    public listar(pagina:number, quantidade:number, order:number):Observable<PaginaCategoria>{
        return this.http.get<PaginaCategoria>(`${this.baseURL}?page=${pagina}&size=${quantidade}&order=${order}`);
    }

}
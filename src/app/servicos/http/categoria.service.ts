import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Categoria } from "../../modelos/categoria.model";
import { Observable } from "rxjs";
import { PaginaCategoria } from "../../modelos/pagina-categoria.model";
import { environment } from "src/environments/environment";
import { CategoriaSalvar } from "src/app/modelos/categoria-salvar.model";

@Injectable()
export class CategoriaService{

    private baseURL:string = `${environment.apiURL}/api/categorias`;

    constructor(
        private http: HttpClient
    ){}

    public salvar(id:number, categoria: CategoriaSalvar):Observable<Categoria>{

        if(id == 0){//Salvar

            return this.http.post<Categoria>(this.baseURL,categoria);

        }else{//Atualizar

            return this.http.put<Categoria>(`${this.baseURL}/${id}`,categoria);

        }
     
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
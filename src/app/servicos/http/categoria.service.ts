import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Categoria } from "../../modelos/categoria.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CategoriaDados } from "src/app/modelos/categoriaDados.model";
import { CategoriaPorcentageDados } from "src/app/modelos/categoriaPorcentagemDados.model";
import { Porcentagem } from "src/app/modelos/porcentagem.model";

@Injectable()
export class CategoriaService{

    private baseURL:string = `${environment.apiURL}/api/v1/categoria`;

    constructor(
        private http: HttpClient
    ){}

    public salvar(id:number, categoria: CategoriaDados):Observable<Categoria>{

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

    public listar(idConta: number):Observable<Categoria[]>{
        return this.http.get<Categoria[]>(`${this.baseURL}?conta=${idConta}`);
    }

    public alterarPorcentagems(porcentagem: Porcentagem): Observable<Categoria[]>{
        return this.http.patch<Categoria[]>(`${this.baseURL}/porcentagem`,porcentagem);
    }

}

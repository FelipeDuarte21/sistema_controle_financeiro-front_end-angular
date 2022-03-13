import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaginaParcelado } from "src/app/modelos/pagina-parcelados.model";
import { PaginaParcela } from "src/app/modelos/pagina-parcelas.model";
import { ParcelaPagar } from "src/app/modelos/parcela-pagar.model";
import { Parcela } from "src/app/modelos/parcela.model";
import { ParceladoSalvar } from "src/app/modelos/parcelado-salvar.model";
import { Parcelado } from "src/app/modelos/parcelado.model";
import { environment } from "src/environments/environment";

@Injectable()
export class ParceladoService{

    private baseURL:string = `${environment.apiURL}/api/categorias/`;
    private recurso = `/parcelados`;

    constructor(
        private http: HttpClient
    ){}

    public salvar(idCategoria:number, id:number, parcelado: ParceladoSalvar): Observable<Parcelado>{

        let url = this.getUrl(idCategoria);

        if(id == 0){ // cadastrar

           return this.http.post<Parcelado>(url,parcelado);

        }else{ //Atualizar

            return this.http.put<Parcelado>(`${url}/${id}`,parcelado);

        }

    }

    public excluir(idCategoria:number, id:number): Observable<any>{
        let url = `${this.getUrl(idCategoria)}/${id}`;
        return this.http.delete(url);
    }

    public buscarPorId(idCategoria:number, id: number): Observable<Parcelado>{
        let url = `${this.getUrl(idCategoria)}/${id}`;
        return this.http.get<Parcelado>(url);
    }

    public listar(idCategoria:number,page:number,size:number,order:number):Observable<PaginaParcelado>{
        let url = `${this.getUrl(idCategoria)}?page=${page}&size=${size}&order=${order}`;
        return this.http.get<PaginaParcelado>(url);
    }

    public registrarPagamentoParcela(idParcelado:number, idCategoria:number,idParcela:number, parcelaPagar: ParcelaPagar): Observable<Parcela>{
        let url = `${this.getUrl(idCategoria)}/${idParcelado}/parcelas/${idParcela}`; 
        return this.http.patch<Parcela>(url,parcelaPagar);
    }

    public listarParcelas(idParcelado:number, idCategoria: number, page:number, size:number,order:number): Observable<PaginaParcela>{
        let url = `${this.getUrl(idCategoria)}/${idParcelado}/parcelas?page=${page}&size=${size}&order=${order}`;
        return this.http.get<PaginaParcela>(url);
    }

    private getUrl(idCategoria:number):string{
        return `${this.baseURL}${idCategoria}${this.recurso}`;
    }

}
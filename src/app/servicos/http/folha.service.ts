import { HttpClient, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable, Optional } from "@angular/core";
import { Observable } from "rxjs";
import { Folha } from "src/app/modelos/folha.model";
import { LancamentoDados } from "src/app/modelos/lancamentoDados.model";
import { Lancamento } from "src/app/modelos/lancamento.model";

import { environment } from "src/environments/environment";
import { Transferencia } from "src/app/modelos/transferencia.model";
import { ParcelaPagamento } from "src/app/modelos/parcelaPagamento.model";

@Injectable()
export class FolhaService{

    private baseURL:string = `${environment.apiURL}/api/v1/folha`;

    constructor(
        private http: HttpClient
    ){}

    public buscarAtual(idCategoria:number):Observable<Folha>{
        return this.http.get<Folha>(`${this.baseURL}/atual?categoria=${idCategoria}`);
    }

    public listar(idCategoria: number):Observable<Folha[]>{
        return this.http.get<Folha[]>(`${this.baseURL}?categoria=${idCategoria}`);
    }

    public buscarArquivoCSV(idFolha: number): Observable<any> {
        return this.http.get(`${this.baseURL}/arquivo?folha=${idFolha}`,{responseType: 'blob',observe: 'response'});
    }

    public salvarLancamento(id:number, idFolha: number, lancamento: LancamentoDados): Observable<Lancamento>{
        if(id == 0){ //fazer lançamento
            return this.http.post<Lancamento>(`${this.baseURL}/lancamento?folha=${idFolha}`,lancamento);

        }else{ //alterar lançamento
            return this.http.put<Lancamento>(`${this.baseURL}/lancamento/${id}?folha=${idFolha}`,lancamento);
        }
    }

    public excluirLancamento(id:number, idFolha: number | undefined): Observable<any>{
        return this.http.delete<any>(`${this.baseURL}/lancamento/${id}?folha=${idFolha}`);
    }

    public fazerTransferencia(transferencia: Transferencia): Observable<any>{
        return this.http.post<any>(`${this.baseURL}/transferencia`,transferencia);
    }

    public fazerLancamentoParcelado(idFolha: number, idParcelado: number, idParcela: number, parcela: ParcelaPagamento): Observable<Lancamento>{
        return this.http.post<Lancamento>(`${this.baseURL}/lancamento-parcelado?folha=${idFolha}&parcelado=${idParcelado}&parcela=${idParcela}`,parcela);
    }

    public fazerLancamentoTodasCategorias(idConta: number): Observable<any>{
        return this.http.post<any>(`${this.baseURL}/lancamento-todas-categorias?conta=${idConta}`,undefined);
    }

}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Tipo } from "../../modelos/tipo.model";

@Injectable()
export class TipoService{

    private baseURL:string = `${environment.apiURL}/api/tipos-lancamentos`

    constructor(
        private http: HttpClient
    ){}

    public buscarTodos():Observable<Array<Tipo>>{
        return this.http.get<Array<Tipo>>(this.baseURL);
    }

}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tipo } from "../modelos/tipo.model";

@Injectable()
export class TipoService{

    constructor(
        private http: HttpClient
    ){}

    public buscarTodos():Observable<Tipo>{
        return null;
    }

}
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'btn-editar',
    templateUrl: './btn-editar.component.html',
    styleUrls: ['./btn-editar.component.css']
})
export class BtnEditarComponent{

    @Input() rota:string;
    @Input() id:number;
    @Input() parametros:object;

    constructor(
        private router: Router
    ){}

    onClick(){
        if(this.parametros == null){
            this.router.navigate([`${this.rota}`,this.id]);
        }else{
            this.router.navigate([`${this.rota}`,this.id],{queryParams:this.parametros});
        }
    }

}
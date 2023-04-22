import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'btn-voltar',
    templateUrl: './btn-voltar.component.html',
    styleUrls: ['./btn-voltar.component.css']
})
export class BtnVoltarComponent{

    @Input() rota:string = "";
    @Input() parametros:object|null = null;

    constructor(
        private router: Router
    ){}

    redirecionar(){
        if(this.parametros == null){
            this.router.navigate([`${this.rota}`]);
        }else{
            this.router.navigate([`${this.rota}`],{queryParams:this.parametros});
        }
    }

}

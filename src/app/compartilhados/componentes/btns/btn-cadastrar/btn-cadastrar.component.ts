import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'btn-cadastrar',
    templateUrl: './btn-cadastrar.component.html',
    styleUrls: ['./btn-cadastrar.component.css']
})
export class BtnCadastrarComponent{

    @Input() titulo:string = "";
    @Input() rota:string = "";
    @Input() parametros:object | null = null;
    @Input() desativado:boolean | undefined = false;

    constructor(
        private router: Router
    ){}

    onClick(){
        if(this.parametros == null){
            this.router.navigate([`${this.rota}`]);
        }else{
            this.router.navigate([`${this.rota}`],{queryParams:this.parametros});
        }
    }

}

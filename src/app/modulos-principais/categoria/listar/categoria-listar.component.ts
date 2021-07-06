import { Component } from "@angular/core";

@Component({
    selector: 'categoria-listar',
    templateUrl: './categoria-listar.component.html',
    styleUrls: ['./categoria-listar.component.css']
})
export class CategoriaListarComponent{

    painelCard:boolean = true;
    painelTabela:boolean = false;

    onPainelCard(){
        this.painelCard = true;
        this.painelTabela = false;
    }

    onPainelTabela(){
        this.painelTabela = true;
        this.painelCard = false;
    }

}
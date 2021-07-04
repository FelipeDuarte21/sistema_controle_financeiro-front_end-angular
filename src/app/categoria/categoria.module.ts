import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CabecalhoModule } from "../compartilhados/cabecalho/cabecalho.module";
import { CategoriaRoutingModule } from "./categoria-routing.module";
import { CategoriaComponent } from "./categoria.component";

@NgModule({
    declarations: [
        CategoriaComponent
    ],
    imports: [
        CommonModule,
        CategoriaRoutingModule,
        CabecalhoModule
    ],
    exports: [
        CategoriaComponent
    ]
})
export class CategoriaModule{

}
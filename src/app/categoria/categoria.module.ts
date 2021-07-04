import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CabecalhoModule } from "../compartilhados/cabecalho/cabecalho.module";
import { CategoriaRoutingModule } from "./categoria-routing.module";
import { CategoriaComponent } from "./categoria.component";
import { CategoriaListarComponent } from "./listar/categoria-listar.component";

@NgModule({
    declarations: [
        CategoriaComponent,
        CategoriaListarComponent
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
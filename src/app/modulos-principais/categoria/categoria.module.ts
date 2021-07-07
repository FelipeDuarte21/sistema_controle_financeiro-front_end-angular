import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CabecalhoModule } from "src/app/compartilhados/cabecalho/cabecalho.module";
import { CategoriaService } from "src/app/servicos/categoria.service";
import { CategoriaRoutingModule } from "./categoria-routing.module";
import { CategoriaComponent } from "./categoria.component";
import { CategoriaListarComponent } from "./listar/categoria-listar.component";
import { CategoriaSalvarComponent } from "./salvar/categoria-salvar.component";

@NgModule({
    declarations: [
        CategoriaComponent,
        CategoriaListarComponent,
        CategoriaSalvarComponent
    ],
    imports: [
        CommonModule,
        CategoriaRoutingModule,
        CabecalhoModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CategoriaComponent
    ],
    providers: [
        CategoriaService
    ]
})
export class CategoriaModule{

}
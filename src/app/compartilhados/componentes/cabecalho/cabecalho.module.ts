import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UsuarioLogadoService } from "src/app/servicos/internos/usuario-logado.service";
import { CabecalhoComponent } from "./cabecalho.component";

@NgModule({
    declarations: [
        CabecalhoComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        CabecalhoComponent
    ],
    providers: [
        UsuarioLogadoService
    ]
})
export class CabecalhoModule{

}

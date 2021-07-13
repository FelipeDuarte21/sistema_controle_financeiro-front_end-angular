import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AutenticacaoRoutingModule } from "./autenticacao-routing.module";
import { AutenticacaoComponent } from "./autenticacao.component";

@NgModule({
    declarations: [
        AutenticacaoComponent
    ],
    imports: [
        CommonModule,
        AutenticacaoRoutingModule
    ],
    exports: [
        AutenticacaoComponent
    ]
})
export class AutenticacaoModule{

}
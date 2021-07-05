import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CabecalhoModule } from "../compartilhados/cabecalho/cabecalho.module";
import { LancamentoRoutingModule } from "./lancamento-routing.module";
import { LancamentoComponent } from "./lancamento.component";
import { LancamentoListarComponent } from "./listar/lancamento-listar.component";

@NgModule({
    declarations: [
        LancamentoComponent,
        LancamentoListarComponent
    ],
    imports: [
        CommonModule,
        LancamentoRoutingModule,
        CabecalhoModule
    ],
    exports: [
        LancamentoComponent
    ]
})
export class LancamentoModule{

}
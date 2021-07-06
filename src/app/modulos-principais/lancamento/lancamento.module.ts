import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CabecalhoModule } from "src/app/compartilhados/cabecalho/cabecalho.module";
import { LancamentoRoutingModule } from "./lancamento-routing.module";
import { LancamentoComponent } from "./lancamento.component";
import { LancamentoListarComponent } from "./listar/lancamento-listar.component";
import { LancamentoSalvarComponent } from "./salvar/lancamento-salvar.component";

@NgModule({
    declarations: [
        LancamentoComponent,
        LancamentoListarComponent,
        LancamentoSalvarComponent
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
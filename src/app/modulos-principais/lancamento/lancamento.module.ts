import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CabecalhoModule } from "src/app/compartilhados/cabecalho/cabecalho.module";
import { ConverteMesPipe } from "src/app/compartilhados/pipes/converte-mes.pipe";
import { BalancoService } from "src/app/servicos/balanco.service";
import { LancamentoService } from "src/app/servicos/lancamento.service";
import { LancamentoRoutingModule } from "./lancamento-routing.module";
import { LancamentoComponent } from "./lancamento.component";
import { LancamentoListarComponent } from "./listar/lancamento-listar.component";
import { LancamentoSalvarComponent } from "./salvar/lancamento-salvar.component";

@NgModule({
    declarations: [
        LancamentoComponent,
        LancamentoListarComponent,
        LancamentoSalvarComponent,
        ConverteMesPipe
    ],
    imports: [
        CommonModule,
        LancamentoRoutingModule,
        CabecalhoModule,
        HttpClientModule
    ],
    exports: [
        LancamentoComponent
    ],
    providers: [
        BalancoService,
        LancamentoService
    ]
})
export class LancamentoModule{

}
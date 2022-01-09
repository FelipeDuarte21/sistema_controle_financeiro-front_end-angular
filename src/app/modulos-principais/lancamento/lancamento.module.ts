import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConverteMesPipe } from "src/app/compartilhados/pipes/converte-mes.pipe";
import { BalancoService } from "src/app/servicos/http/balanco.service";
import { InterceptorService } from "src/app/servicos/internos/interceptador.service";
import { LancamentoService } from "src/app/servicos/http/lancamento.service";
import { ModuloGuardService } from "src/app/servicos/guardas/modulo-guard.service";
import { TipoService } from "src/app/servicos/http/tipo.service";
import { LancamentoRoutingModule } from "./lancamento-routing.module";
import { LancamentoComponent } from "./lancamento.component";
import { LancamentoListarComponent } from "./listar/lancamento-listar.component";
import { LancamentoSalvarComponent } from "./salvar/lancamento-salvar.component";
import { QuantidadeRegistroModule } from "src/app/compartilhados/componentes/quantidade-registro/quantidade-registro.module";
import { PaginacaoModule } from "src/app/compartilhados/componentes/paginacao/paginacao.module";
import { BtnsModule } from "src/app/compartilhados/componentes/btns/btns.module";
import { CabecalhoModule } from "src/app/compartilhados/cabecalho/cabecalho.module";
import { TituloPaginaModule } from "src/app/compartilhados/componentes/titulo-pagina/titulo.component.module";
import { GridCardComponent } from "./listar/grid-card/grid.component";
import { BarraNavegacaoComponent } from "./listar/barra-navegacao/barra-navegacao.component";
import { InformacoesBalancoComponent } from "./listar/informacoes-balanco/informacoes-balanco.component";
import { BotaoDownloadCsvComponent } from "./listar/botao-download-csv/botao-download-csv.component";
import { BarraNavegacaoBalancoComponent } from "./listar/barra-navegacao-balanco/barra-navegacao-balanco.component";

@NgModule({
    declarations: [
        LancamentoComponent,
        LancamentoListarComponent,
        LancamentoSalvarComponent,
        ConverteMesPipe,
        GridCardComponent,
        BarraNavegacaoComponent,
        InformacoesBalancoComponent,
        BotaoDownloadCsvComponent,
        BarraNavegacaoBalancoComponent
    ],
    imports: [
        CommonModule,
        LancamentoRoutingModule,
        CabecalhoModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        QuantidadeRegistroModule,
        PaginacaoModule,
        BtnsModule,
        TituloPaginaModule
    ],
    exports: [
        LancamentoComponent
    ],
    providers: [
        BalancoService,
        LancamentoService,
        TipoService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass:  InterceptorService,
            multi: true
        },
        ModuloGuardService
    ]
})
export class LancamentoModule{

}
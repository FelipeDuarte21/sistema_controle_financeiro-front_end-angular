import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertasModule } from "src/app/compartilhados/componentes/alertas/alertas.module";
import { BtnsModule } from "src/app/compartilhados/componentes/btns/btns.module";
import { CabecalhoModule } from "src/app/compartilhados/componentes/cabecalho/cabecalho.module";
import { LayoutModule } from "src/app/compartilhados/componentes/layout/layout.module";
import { SpinnerModule } from "src/app/compartilhados/componentes/spinners/spinner.module";
import { TituloPaginaModule } from "src/app/compartilhados/componentes/titulo-pagina/titulo.component.module";
import { ConverteMesPipe } from "src/app/compartilhados/pipes/converte-mes.pipe";
import { ModuloGuardService } from "src/app/servicos/guardas/modulo-guard.service";
import { CategoriaService } from "src/app/servicos/http/categoria.service";
import { FolhaService } from "src/app/servicos/http/folha.service";
import { LancamentoService } from "src/app/servicos/http/lancamento.service";
import { UsuarioService } from "src/app/servicos/http/usuario.service";
import { InterceptorService } from "src/app/servicos/internos/interceptador.service";
import { UsuarioLogadoService } from "src/app/servicos/internos/usuario-logado.service";
import { BotaoDownloadCsvComponent } from "./listar/botao-download-csv/botao-download-csv.component";
import { LancamentoRoutingModule } from "./lancamento-routing.module";
import { LancamentoComponent } from "./lancamento.component";
import { LancamentoListarComponent } from "./listar/lancamento-listar.component";
import { LancamentoSalvarComponent } from "./salvar/lancamento-salvar.component";
import { LancamentoNovoComponent } from "./salvar/lancamento-normal/lancamento-novo/lancamento-novo.component";
import { LancamentoParceladoComponent } from "./salvar/lancamento-normal/lancamento-parcelado/lancamento-parcelado.component";
import { LancamentoNormalComponent } from "./salvar/lancamento-normal/lancamento-normal.component";
import { LancamentoFixoService } from "src/app/servicos/http/lancamento-fixo.service";
import { ParceladoService } from "src/app/servicos/http/parcelado.service";
import { TransferenciaComponent } from "./salvar/transferencia/transferencia.component";
import { LancamentoLancarFixoComponent } from "./salvar/lancamento-normal/lancamento-fixo/lancamento-fixo.component";

@NgModule({
    declarations: [
        LancamentoComponent,
        LancamentoListarComponent,
        ConverteMesPipe,
        BotaoDownloadCsvComponent,
        LancamentoSalvarComponent,
        LancamentoNovoComponent,
        LancamentoParceladoComponent,
        LancamentoLancarFixoComponent,
        LancamentoNormalComponent,
        TransferenciaComponent
    ],
    imports: [
        CommonModule,
        LancamentoRoutingModule,
        CabecalhoModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BtnsModule,
        TituloPaginaModule,
        SpinnerModule,
        AlertasModule,
        LayoutModule
    ],
    exports: [
        LancamentoComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass:  InterceptorService,
            multi: true
        },
        ModuloGuardService,
        UsuarioLogadoService,
        UsuarioService,
        FolhaService,
        CategoriaService,
        LancamentoService,
        LancamentoFixoService,
        ParceladoService
    ]
})
export class LancamentoModule{

}

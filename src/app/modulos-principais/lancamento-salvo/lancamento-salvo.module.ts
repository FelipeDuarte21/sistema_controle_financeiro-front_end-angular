import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CabecalhoModule } from "src/app/compartilhados/cabecalho/cabecalho.module";
import { AlertasModule } from "src/app/compartilhados/componentes/alertas/alertas.module";
import { BtnsModule } from "src/app/compartilhados/componentes/btns/btns.module";
import { LayoutModule } from "src/app/compartilhados/componentes/layout/layout.module";
import { PaginacaoModule } from "src/app/compartilhados/componentes/paginacao/paginacao.module";
import { QuantidadeRegistroModule } from "src/app/compartilhados/componentes/quantidade-registro/quantidade-registro.module";
import { SpinnerModule } from "src/app/compartilhados/componentes/spinners/spinner.module";
import { TituloPaginaModule } from "src/app/compartilhados/componentes/titulo-pagina/titulo.component.module";
import { ModuloGuardService } from "src/app/servicos/guardas/modulo-guard.service";
import { CategoriaService } from "src/app/servicos/http/categoria.service";
import { LancamentoSalvoService } from "src/app/servicos/http/lancamento-salvo.service";
import { TipoService } from "src/app/servicos/http/tipo.service";
import { InterceptorService } from "src/app/servicos/internos/interceptador.service";
import { LancamentoSalvoRoutingModule } from "./lancamento-salvo-routing.module";
import { LancamentoSalvoComponent } from "./lancamento-salvo.component";
import { LancamentoSalvoListarComponent } from "./listar/lancamento-salvo-listar.component";
import { LancamentoSalvoSalvarComponent } from "./salvar/lancamento-salvo-salvar.component";

@NgModule({
    declarations: [
        LancamentoSalvoComponent,
        LancamentoSalvoListarComponent,
        LancamentoSalvoSalvarComponent
    ],
    imports: [
        CommonModule,
        LancamentoSalvoRoutingModule,
        SpinnerModule,
        AlertasModule,
        CabecalhoModule,
        LayoutModule,
        TituloPaginaModule,
        BtnsModule,
        QuantidadeRegistroModule,
        PaginacaoModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: [
        LancamentoSalvoService,
        TipoService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass:  InterceptorService,
            multi: true
        },
        ModuloGuardService,
        CategoriaService
    ]
})
export class LancamentoSalvoModule{

}
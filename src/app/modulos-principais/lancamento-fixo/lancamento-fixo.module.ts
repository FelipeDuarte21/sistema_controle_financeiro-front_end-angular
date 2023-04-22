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
import { ModuloGuardService } from "src/app/servicos/guardas/modulo-guard.service";
import { CategoriaService } from "src/app/servicos/http/categoria.service";
import { LancamentoFixoService } from "src/app/servicos/http/lancamento-fixo.service";
import { UsuarioService } from "src/app/servicos/http/usuario.service";
import { InterceptorService } from "src/app/servicos/internos/interceptador.service";
import { UsuarioLogadoService } from "src/app/servicos/internos/usuario-logado.service";
import { LancamentoFixoRoutingModule } from "./lancamento-fixo-routing.model";
import { LancamentoFixoComponent } from "./lancamento.component";
import { LancamentoFixoListarComponent } from "./listar/lancamento-fixo-listar.component";
import { LancamentoFixoSalvarComponent } from "./salvar/lancamento-fixo-salvar.component";

@NgModule({
    declarations: [
        LancamentoFixoComponent,
        LancamentoFixoListarComponent,
        LancamentoFixoSalvarComponent
    ],
    imports: [
        CommonModule,
        LancamentoFixoRoutingModule,
        SpinnerModule,
        AlertasModule,
        CabecalhoModule,
        LayoutModule,
        TituloPaginaModule,
        BtnsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    exports: [

    ],
    providers: [
        UsuarioLogadoService,
        UsuarioService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass:  InterceptorService,
            multi: true
        },
        ModuloGuardService,
        CategoriaService,
        LancamentoFixoService
    ]
})
export class LancamentoFixoModule{

}

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
import { AnotacaoService } from "src/app/servicos/http/anotacao.service";
import { CategoriaService } from "src/app/servicos/http/categoria.service";
import { UsuarioService } from "src/app/servicos/http/usuario.service";
import { InterceptorService } from "src/app/servicos/internos/interceptador.service";
import { UsuarioLogadoService } from "src/app/servicos/internos/usuario-logado.service";
import { AnotacaoRoutingModule } from "./anotacao-routing.module";
import { AnotacaoComponent } from "./anotacao.component";
import { AnotacaoListarComponent } from "./listar/anotacao-listar.component";
import { AnotacaoSalvarComponent } from "./salvar/anotacao-salvar.component";

@NgModule({
    declarations: [
        AnotacaoComponent,
        AnotacaoListarComponent,
        AnotacaoSalvarComponent
    ],
    imports: [
        CommonModule,
        AnotacaoRoutingModule,
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
    exports: [],
    providers: [
        ModuloGuardService,
        CategoriaService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass:  InterceptorService,
            multi: true
        },
        UsuarioLogadoService,
        UsuarioService,
        AnotacaoService
    ]
})
export class AnotacaoModule{

}

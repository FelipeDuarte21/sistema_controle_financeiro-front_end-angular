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
import { UsuarioService } from "src/app/servicos/http/usuario.service";
import { InterceptorService } from "src/app/servicos/internos/interceptador.service";
import { UsuarioLogadoService } from "src/app/servicos/internos/usuario-logado.service";
import { UsuarioCadastroComponent } from "./cadastro/usuario-cadastro.component";
import { UsuarioContaComponent } from "./conta/usuario-conta.component";
import { UsuarioRoutingModule } from "./usuario-routing.module";
import { UsuarioComponent } from "./usuario.component";

@NgModule({
    declarations: [
        UsuarioComponent,
        UsuarioCadastroComponent,
        UsuarioContaComponent
    ],
    imports: [
        CommonModule,
        UsuarioRoutingModule,
        HttpClientModule,
        CabecalhoModule,
        SpinnerModule,
        AlertasModule,
        LayoutModule,
        FormsModule,
        ReactiveFormsModule,
        TituloPaginaModule,
        BtnsModule
    ],
    exports: [],
    providers: [
        UsuarioService,
        ModuloGuardService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass:  InterceptorService,
            multi: true
        },
        UsuarioLogadoService
    ]
})
export class UsuarioModule{

}

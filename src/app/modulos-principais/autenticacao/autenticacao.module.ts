import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertasModule } from "src/app/compartilhados/componentes/alertas/alertas.module";
import { CabecalhoModule } from "src/app/compartilhados/componentes/cabecalho/cabecalho.module";
import { LayoutModule } from "src/app/compartilhados/componentes/layout/layout.module";
import { SpinnerModule } from "src/app/compartilhados/componentes/spinners/spinner.module";
import { AutenticacaoService } from "src/app/servicos/http/autenticacao.service";
import { UsuarioService } from "src/app/servicos/http/usuario.service";
import { InterceptorService } from "src/app/servicos/internos/interceptador.service";
import { UsuarioLogadoService } from "src/app/servicos/internos/usuario-logado.service";
import { AutenticacaoComponent } from "./autenticacacao.component";
import { AutenticacaoRoutingModule } from "./autenticacao-routing.module";

@NgModule({
    declarations: [
        AutenticacaoComponent
    ],
    imports: [
        CommonModule,
        AutenticacaoRoutingModule,
        HttpClientModule,
        SpinnerModule,
        CabecalhoModule,
        LayoutModule,
        AlertasModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        AutenticacaoService,
        UsuarioService,
        UsuarioLogadoService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass:  InterceptorService,
            multi: true
        },
    ]
})
export class AutenticacaoModule{

}

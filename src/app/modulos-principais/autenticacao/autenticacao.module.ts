import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutenticacaoGuardService } from "src/app/servicos/guardas/autenticacao-guard.service";
import { AutenticacaoService } from "src/app/servicos/http/autenticacao.service";
import { InterceptorService } from "src/app/servicos/internos/interceptador.service";
import { UsuarioService } from "src/app/servicos/http/usuario.service";
import { AutenticacaoRoutingModule } from "./autenticacao-routing.module";
import { AutenticacaoComponent } from "./autenticacao.component";
import { CabecalhoModule } from "src/app/compartilhados/cabecalho/cabecalho.module";
import { SpinnerModule } from "src/app/compartilhados/componentes/spinners/spinner.module";
import { LayoutModule } from "src/app/compartilhados/componentes/layout/layout.module";

@NgModule({
    declarations: [
        AutenticacaoComponent
    ],
    imports: [
        CommonModule,
        AutenticacaoRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CabecalhoModule,
        SpinnerModule,
        LayoutModule
    ],
    exports: [
        AutenticacaoComponent
    ],
    providers: [
        AutenticacaoService,
        UsuarioService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass:  InterceptorService,
            multi: true
        },
        AutenticacaoGuardService
    ],
    
})
export class AutenticacaoModule{

}
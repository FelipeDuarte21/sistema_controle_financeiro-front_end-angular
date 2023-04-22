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
import { FolhaService } from "src/app/servicos/http/folha.service";
import { UsuarioService } from "src/app/servicos/http/usuario.service";
import { InterceptorService } from "src/app/servicos/internos/interceptador.service";
import { TokenService } from "src/app/servicos/internos/token.service";
import { UsuarioLogadoService } from "src/app/servicos/internos/usuario-logado.service";
import { CategoriaRoutingModule } from "./categoria-routing.module";
import { CategoriaComponent } from "./categoria.component";
import { CategoriaListarComponent } from "./listar/categoria-listar.component";
import { PorcentagemComponent } from "./porcentagem/porcentagem.component";
import { CategoriaSalvarComponent } from "./salvar/categoria-salvar.component";

@NgModule({
    declarations: [
        CategoriaComponent,
        CategoriaListarComponent,
        CategoriaSalvarComponent,
        PorcentagemComponent
    ],
    imports: [
        CommonModule,
        CategoriaRoutingModule,
        HttpClientModule,
        CabecalhoModule,
        SpinnerModule,
        AlertasModule,
        LayoutModule,
        TituloPaginaModule,
        BtnsModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [],
    providers: [
        UsuarioLogadoService,
        UsuarioService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass:  InterceptorService,
            multi: true
        },
        CategoriaService,
        ModuloGuardService,
        FolhaService
    ]
})
export class CategoriaModule{

}

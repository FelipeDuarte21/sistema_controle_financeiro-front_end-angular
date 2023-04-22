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
import { ParceladoService } from "src/app/servicos/http/parcelado.service";
import { UsuarioService } from "src/app/servicos/http/usuario.service";
import { InterceptorService } from "src/app/servicos/internos/interceptador.service";
import { UsuarioLogadoService } from "src/app/servicos/internos/usuario-logado.service";
import { ParcelasListarComponent } from "./listar-parcelas/parcelas-listar.component";
import { ParceladosListarComponent } from "./listar/parcelados-listar.component";
import { ParceladosRoutingModule } from "./parcelado-routing.module";
import { ParceladosComponent } from "./parcelado.component";
import { ParceladosSalvarComponent } from "./salvar/parcelados-salvar.component";

@NgModule({
    declarations: [
        ParceladosComponent,
        ParceladosListarComponent,
        ParceladosSalvarComponent,
        ParcelasListarComponent
    ],
    imports: [
        CommonModule,
        ParceladosRoutingModule,
        SpinnerModule,
        CabecalhoModule,
        AlertasModule,
        LayoutModule,
        TituloPaginaModule,
        BtnsModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [],
    providers: [
        ModuloGuardService,
        UsuarioLogadoService,
        UsuarioService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass:  InterceptorService,
            multi: true
        },
        ParceladoService,
        CategoriaService
    ]
})
export class ParceladoModule{

}

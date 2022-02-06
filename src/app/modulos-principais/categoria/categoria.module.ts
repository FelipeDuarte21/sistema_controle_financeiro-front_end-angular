import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CategoriaService } from "src/app/servicos/http/categoria.service";
import { InterceptorService } from "src/app/servicos/internos/interceptador.service";
import { ModuloGuardService } from "src/app/servicos/guardas/modulo-guard.service";
import { CategoriaRoutingModule } from "./categoria-routing.module";
import { CategoriaComponent } from "./categoria.component";
import { CategoriaListarComponent } from "./listar/categoria-listar.component";
import { CategoriaSalvarComponent } from "./salvar/categoria-salvar.component";
import { QuantidadeRegistroModule } from "src/app/compartilhados/componentes/quantidade-registro/quantidade-registro.module";
import { PaginacaoModule } from "src/app/compartilhados/componentes/paginacao/paginacao.module";
import { GridsComponent } from "./listar/grid-dados/grids/grids.component";
import { GridCardComponent } from "./listar/grid-dados/grids/grid-card/grid-card.component";
import { BarraNavegacaoComponent } from "./listar/barra-navegacao/barra-navegacao.component";
import { TituloPaginaModule } from "src/app/compartilhados/componentes/titulo-pagina/titulo.component.module";
import { BtnsModule } from "src/app/compartilhados/componentes/btns/btns.module";
import { CabecalhoModule } from "src/app/compartilhados/cabecalho/cabecalho.module";
import { SpinnerModule } from "src/app/compartilhados/componentes/spinners/spinner.module";
import { AlertasModule } from "src/app/compartilhados/componentes/alertas/alertas.module";
import { LayoutModule } from "src/app/compartilhados/componentes/layout/layout.module";

@NgModule({
    declarations: [
        CategoriaComponent,
        CategoriaListarComponent,
        CategoriaSalvarComponent,
        GridsComponent,
        GridCardComponent,
        BarraNavegacaoComponent
    ],
    imports: [
        CommonModule,
        CategoriaRoutingModule,
        CabecalhoModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        TituloPaginaModule,
        QuantidadeRegistroModule,
        PaginacaoModule,
        BtnsModule,
        SpinnerModule,
        AlertasModule,
        LayoutModule
    ],
    exports: [
        CategoriaComponent
    ],
    providers: [
        CategoriaService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass:  InterceptorService,
            multi: true
        },
        ModuloGuardService
    ]
})
export class CategoriaModule{

}
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from "@angular/core";
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
import { ParceladoService } from "src/app/servicos/http/parcelados.service";
import { InterceptorService } from "src/app/servicos/internos/interceptador.service";
import { ParcelasListarComponent } from "./listar-parcelas/parcelas-listar.component";
import { ParceladosListarComponent } from "./listar/parcelados-listar.component";
import { ParceladosRoutingModule } from "./parcelados-routing.module";
import { ParceladosComponent } from "./parcelados.component";
import { ParceladosSalvarComponent } from "./salvar/parcelados-salvar.component";

@NgModule({
    declarations: [
        ParceladosComponent,
        ParceladosListarComponent,
        ParcelasListarComponent,
        ParceladosSalvarComponent
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
        QuantidadeRegistroModule,
        PaginacaoModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [],
    providers: [
        ParceladoService,
        CategoriaService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass:  InterceptorService,
            multi: true
        },
        ModuloGuardService
    ]
})
export class ParceladosModule{

}
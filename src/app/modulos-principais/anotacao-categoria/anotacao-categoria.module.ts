import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
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
import { AnotacaoCategoriaService } from "src/app/servicos/http/anotacao-categoria.service";
import { CategoriaService } from "src/app/servicos/http/categoria.service";
import { InterceptorService } from "src/app/servicos/internos/interceptador.service";
import { AnotacaoCategoriaRoutingModule } from "./anotacao-categoria-routing.module";
import { AnotacaoCategoriaComponent } from "./anotacao-categoria.component";
import { AnotacaoCategoriaListarComponent } from "./listar/anotacao-categoria-listar.component";
import { AnotacaoCategoriaSalvarComponent } from "./salvar/anotacao-categoria-salvar.component";

@NgModule({
    declarations: [
        AnotacaoCategoriaComponent,
        AnotacaoCategoriaListarComponent,
        AnotacaoCategoriaSalvarComponent
    ],
    imports: [
        CommonModule,
        AnotacaoCategoriaRoutingModule,
        CabecalhoModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        QuantidadeRegistroModule,
        PaginacaoModule,
        BtnsModule,
        TituloPaginaModule,
        SpinnerModule,
        AlertasModule,
        LayoutModule
    ],
    exports: [],
    providers: [
        ModuloGuardService,
        AnotacaoCategoriaService,
        CategoriaService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass:  InterceptorService,
            multi: true
        },
    ]
})
export class AnotacaoCategoriaModule{

}
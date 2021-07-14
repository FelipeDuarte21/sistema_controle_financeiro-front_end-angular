import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CabecalhoModule } from "src/app/compartilhados/cabecalho/cabecalho.module";
import { CategoriaService } from "src/app/servicos/http/categoria.service";
import { InterceptorService } from "src/app/servicos/internos/interceptador.service";
import { ModuloGuardService } from "src/app/servicos/guardas/modulo-guard.service";
import { CategoriaRoutingModule } from "./categoria-routing.module";
import { CategoriaComponent } from "./categoria.component";
import { CategoriaListarComponent } from "./listar/categoria-listar.component";
import { CategoriaSalvarComponent } from "./salvar/categoria-salvar.component";

@NgModule({
    declarations: [
        CategoriaComponent,
        CategoriaListarComponent,
        CategoriaSalvarComponent
    ],
    imports: [
        CommonModule,
        CategoriaRoutingModule,
        CabecalhoModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
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
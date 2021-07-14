import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CabecalhoModule } from "src/app/compartilhados/cabecalho/cabecalho.module";
import { ConverteMesPipe } from "src/app/compartilhados/pipes/converte-mes.pipe";
import { BalancoService } from "src/app/servicos/http/balanco.service";
import { InterceptorService } from "src/app/servicos/internos/interceptador.service";
import { LancamentoService } from "src/app/servicos/http/lancamento.service";
import { ModuloGuardService } from "src/app/servicos/guardas/modulo-guard.service";
import { TipoService } from "src/app/servicos/http/tipo.service";
import { LancamentoRoutingModule } from "./lancamento-routing.module";
import { LancamentoComponent } from "./lancamento.component";
import { LancamentoListarComponent } from "./listar/lancamento-listar.component";
import { LancamentoSalvarComponent } from "./salvar/lancamento-salvar.component";

@NgModule({
    declarations: [
        LancamentoComponent,
        LancamentoListarComponent,
        LancamentoSalvarComponent,
        ConverteMesPipe
    ],
    imports: [
        CommonModule,
        LancamentoRoutingModule,
        CabecalhoModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        LancamentoComponent
    ],
    providers: [
        BalancoService,
        LancamentoService,
        TipoService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass:  InterceptorService,
            multi: true
        },
        ModuloGuardService
    ]
})
export class LancamentoModule{

}
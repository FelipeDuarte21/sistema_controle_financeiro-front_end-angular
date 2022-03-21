import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CabecalhoModule } from "src/app/compartilhados/cabecalho/cabecalho.module";
import { AlertasModule } from "src/app/compartilhados/componentes/alertas/alertas.module";
import { BtnsModule } from "src/app/compartilhados/componentes/btns/btns.module";
import { LayoutModule } from "src/app/compartilhados/componentes/layout/layout.module";
import { SpinnerModule } from "src/app/compartilhados/componentes/spinners/spinner.module";
import { TituloPaginaModule } from "src/app/compartilhados/componentes/titulo-pagina/titulo.component.module";
import { AutenticacaoService } from "src/app/servicos/http/autenticacao.service";
import { EsqueciSenhaRoutingModule } from "./esqueci-senha-routing.module";
import { EsqueciSenhaComponent } from "./esqueci-senha.component";
import { TelaEmailComponent } from "./tela-email/tela-email.component";
import { TelaSucessoComponent } from "./tela-sucesso/tela-sucesso.component";


@NgModule({
    declarations: [
        EsqueciSenhaComponent,
        TelaEmailComponent,
        TelaSucessoComponent
    ],
    imports: [
        CommonModule,
        EsqueciSenhaRoutingModule,
        SpinnerModule,
        CabecalhoModule,
        LayoutModule,
        AlertasModule,
        TituloPaginaModule,
        BtnsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: [
        AutenticacaoService
    ]
})
export class EsqueciSenhaModule{

}
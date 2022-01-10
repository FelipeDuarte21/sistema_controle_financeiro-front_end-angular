import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CabecalhoModule } from "src/app/compartilhados/cabecalho/cabecalho.module";
import { BtnsModule } from "src/app/compartilhados/componentes/btns/btns.module";
import { SpinnerModule } from "src/app/compartilhados/componentes/spinners/spinner.module";
import { UsuarioService } from "src/app/servicos/http/usuario.service";
import { UsuarioCadastroComponent } from "./cadastro/usuario-cadastro.component";
import { UsuarioRoutingModule } from "./usuario-routing.module";
import { UsuarioComponent } from "./usuario.component";

@NgModule({
    declarations: [
        UsuarioComponent,
        UsuarioCadastroComponent
    ],
    imports: [
        CommonModule,
        UsuarioRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CabecalhoModule,
        BtnsModule,
        SpinnerModule
    ],
    exports: [
        UsuarioComponent
    ],
    providers: [
        UsuarioService
    ]
})
export class UsuarioModule{

}
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
        HttpClientModule
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
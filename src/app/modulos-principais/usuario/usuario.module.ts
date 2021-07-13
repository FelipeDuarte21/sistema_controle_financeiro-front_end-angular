import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
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
        UsuarioRoutingModule
    ],
    exports: [
        UsuarioComponent
    ]
})
export class UsuarioModule{

}
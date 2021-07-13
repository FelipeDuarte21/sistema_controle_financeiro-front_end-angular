import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutenticacaoService } from "src/app/servicos/autenticacao.service";
import { InterceptorService } from "src/app/servicos/interceptador.service";
import { UsuarioService } from "src/app/servicos/usuario.service";
import { AutenticacaoRoutingModule } from "./autenticacao-routing.module";
import { AutenticacaoComponent } from "./autenticacao.component";

@NgModule({
    declarations: [
        AutenticacaoComponent
    ],
    imports: [
        CommonModule,
        AutenticacaoRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        AutenticacaoComponent
    ],
    providers: [
        AutenticacaoService,
        UsuarioService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass:  InterceptorService,
            multi: true
        }
    ],
    
})
export class AutenticacaoModule{

}
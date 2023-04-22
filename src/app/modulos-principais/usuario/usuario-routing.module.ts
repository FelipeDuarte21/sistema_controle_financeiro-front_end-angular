import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModuloGuardService } from "src/app/servicos/guardas/modulo-guard.service";
import { UsuarioCadastroComponent } from "./cadastro/usuario-cadastro.component";
import { UsuarioContaComponent } from "./conta/usuario-conta.component";
import { UsuarioComponent } from "./usuario.component";

const routes: Routes = [
    {
        path: '',
        component: UsuarioComponent,
        children: [
            {
                path: 'cadastro',
                component: UsuarioCadastroComponent
            },
            {
                path: 'conta/:idUsuario',
                component: UsuarioContaComponent,
                canActivate: [ModuloGuardService]
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule{

}

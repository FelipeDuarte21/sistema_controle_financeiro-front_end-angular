import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoGuardService } from "src/app/servicos/guardas/autenticacao-guard.service";
import { AutenticacaoComponent } from "./autenticacacao.component";

const routes: Routes = [
    {
        path: '',
        component: AutenticacaoComponent,
        canActivate: [AutenticacaoGuardService]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        AutenticacaoGuardService
    ]
})
export class AutenticacaoRoutingModule{

}

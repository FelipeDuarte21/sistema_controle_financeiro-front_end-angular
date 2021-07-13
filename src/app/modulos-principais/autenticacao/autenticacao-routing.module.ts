import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoGuardService } from "src/app/servicos/autenticacao-guard.service";
import { AutenticacaoComponent } from "./autenticacao.component";

const routes: Routes = [
    {
        path: '',
        component: AutenticacaoComponent,
        canActivate: [AutenticacaoGuardService]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AutenticacaoRoutingModule{

}
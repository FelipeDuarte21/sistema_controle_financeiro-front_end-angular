import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModuloGuardService } from "src/app/servicos/guardas/modulo-guard.service";
import { LancamentoSalvoComponent } from "./lancamento-salvo.component";
import { LancamentoSalvoListarComponent } from "./listar/lancamento-salvo-listar.component";
import { LancamentoSalvoSalvarComponent } from "./salvar/lancamento-salvo-salvar.component";

const routes: Routes = [
    {
        path: '',
        component: LancamentoSalvoComponent,
        canActivate: [ModuloGuardService],
        children: [
            {
                path: '',
                component: LancamentoSalvoListarComponent,
                canActivate: [ModuloGuardService]
            },
            {
                path: 'cadastrar',
                component: LancamentoSalvoSalvarComponent,
                canActivate: [ModuloGuardService]
            },
            {
                path: 'atualizar/:id',
                component: LancamentoSalvoSalvarComponent,
                canActivate: [ModuloGuardService]
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LancamentoSalvoRoutingModule{

}
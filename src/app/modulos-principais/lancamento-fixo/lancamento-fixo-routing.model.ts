import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModuloGuardService } from "src/app/servicos/guardas/modulo-guard.service";
import { LancamentoFixoComponent } from "./lancamento.component";
import { LancamentoFixoListarComponent } from "./listar/lancamento-fixo-listar.component";
import { LancamentoFixoSalvarComponent } from "./salvar/lancamento-fixo-salvar.component";

const routes: Routes = [
    {
        path: '',
        component: LancamentoFixoComponent,
        canActivate: [ModuloGuardService],
        children: [
            {
                path: '',
                component: LancamentoFixoListarComponent,
                canActivate: [ModuloGuardService]
            },
            {
                path: 'cadastrar',
                component: LancamentoFixoSalvarComponent,
                canActivate: [ModuloGuardService]
            },
            {
                path: 'atualizar/:id',
                component: LancamentoFixoSalvarComponent,
                canActivate: [ModuloGuardService]
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LancamentoFixoRoutingModule{

}

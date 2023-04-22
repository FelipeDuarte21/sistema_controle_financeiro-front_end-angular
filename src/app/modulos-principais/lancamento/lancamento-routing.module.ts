import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModuloGuardService } from "src/app/servicos/guardas/modulo-guard.service";
import { LancamentoComponent } from "./lancamento.component";
import { LancamentoListarComponent } from "./listar/lancamento-listar.component";
import { LancamentoSalvarComponent } from "./salvar/lancamento-salvar.component";

const routes: Routes = [
    {
        path: '',
        component: LancamentoComponent,
        canActivate: [ModuloGuardService],
        children: [
            {
                path: '',
                component: LancamentoListarComponent,
                canActivate: [ModuloGuardService]
            },
            {
                path: 'lancar',
                component: LancamentoSalvarComponent,
                canActivate: [ModuloGuardService]
            },
            {
                path: 'atualizar/:id',
                component: LancamentoSalvarComponent,
                canActivate: [ModuloGuardService]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LancamentoRoutingModule{

}

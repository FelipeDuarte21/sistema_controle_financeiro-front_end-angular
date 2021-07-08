import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LancamentoComponent } from "./lancamento.component";
import { LancamentoListarComponent } from "./listar/lancamento-listar.component";
import { LancamentoSalvarComponent } from "./salvar/lancamento-salvar.component";

const routes: Routes = [
    {
        path: '',
        component: LancamentoComponent,
        children: [
            {
                path: '',
                component: LancamentoListarComponent
            },
            {
                path: 'lancar',
                component: LancamentoSalvarComponent
            },
            {
                path: 'atualizar/:id',
                component: LancamentoSalvarComponent
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
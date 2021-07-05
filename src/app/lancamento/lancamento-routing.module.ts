import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LancamentoComponent } from "./lancamento.component";
import { LancamentoListarComponent } from "./listar/lancamento-listar.component";

const routes: Routes = [
    {
        path: '',
        component: LancamentoComponent,
        children: [
            {
                path: '',
                component: LancamentoListarComponent
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
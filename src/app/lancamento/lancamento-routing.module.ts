import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LancamentoComponent } from "./lancamento.component";

const routes: Routes = [
    {
        path: '',
        component: LancamentoComponent,
        children: []
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LancamentoRoutingModule{

}
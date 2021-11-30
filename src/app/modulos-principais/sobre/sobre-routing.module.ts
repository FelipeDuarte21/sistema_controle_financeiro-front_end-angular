import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModuloGuardService } from "src/app/servicos/guardas/modulo-guard.service";
import { SobreComponent } from "./sobre.component";

const routes: Routes = [
    {
        path: '',
        component: SobreComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SobreRoutingModule{

}
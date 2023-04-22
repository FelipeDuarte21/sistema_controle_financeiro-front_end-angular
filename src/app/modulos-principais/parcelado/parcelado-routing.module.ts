import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModuloGuardService } from "src/app/servicos/guardas/modulo-guard.service";
import { ParcelasListarComponent } from "./listar-parcelas/parcelas-listar.component";
import { ParceladosListarComponent } from "./listar/parcelados-listar.component";
import { ParceladosComponent } from "./parcelado.component";
import { ParceladosSalvarComponent } from "./salvar/parcelados-salvar.component";

const routes: Routes = [
    {
        path: '',
        component: ParceladosComponent,
        canActivate: [ModuloGuardService],
        children: [
            {
                path: '',
                component: ParceladosListarComponent,
                canActivate: [ModuloGuardService]
            },
            {
                path: 'cadastrar',
                component: ParceladosSalvarComponent,
                canActivate: [ModuloGuardService]
            },
            {
                path: 'atualizar/:id',
                component: ParceladosSalvarComponent,
                canActivate: [ModuloGuardService]
            },
            {
                path: 'parcelas',
                component: ParcelasListarComponent,
                canActivate: [ModuloGuardService]
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ParceladosRoutingModule{

}

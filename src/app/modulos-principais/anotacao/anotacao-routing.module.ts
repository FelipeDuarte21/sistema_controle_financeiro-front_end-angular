import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModuloGuardService } from "src/app/servicos/guardas/modulo-guard.service";
import { AnotacaoComponent } from "./anotacao.component";
import { AnotacaoListarComponent } from "./listar/anotacao-listar.component";
import { AnotacaoSalvarComponent } from "./salvar/anotacao-salvar.component";

const routes: Routes = [
    {
        path: '',
        component: AnotacaoComponent,
        canActivate: [ModuloGuardService],
        children: [
            {
                path: '',
                component: AnotacaoListarComponent,
                canActivate: [ModuloGuardService]
            },
            {
                path: 'cadastrar',
                component: AnotacaoSalvarComponent,
                canActivate: [ModuloGuardService]
            },
            {
                path: 'atualizar/:id',
                component: AnotacaoSalvarComponent,
                canActivate: [ModuloGuardService]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnotacaoRoutingModule{

}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModuloGuardService } from "src/app/servicos/guardas/modulo-guard.service";
import { CategoriaComponent } from "./categoria.component";
import { CategoriaListarComponent } from "./listar/categoria-listar.component";
import { PorcentagemComponent } from "./porcentagem/porcentagem.component";
import { CategoriaSalvarComponent } from "./salvar/categoria-salvar.component";

const routes: Routes = [
    {
        path: '',
        component: CategoriaComponent,
        canActivate: [ModuloGuardService],
        children: [
            {
                path: '',
                component: CategoriaListarComponent,
                canActivate: [ModuloGuardService]
            },
            {
                path: 'cadastrar',
                component: CategoriaSalvarComponent,
                canActivate: [ModuloGuardService]
            },
            {
                path: 'atualizar/:id',
                component: CategoriaSalvarComponent,
                canActivate: [ModuloGuardService]
            },
            {
                path: 'porcentagem',
                component: PorcentagemComponent,
                canActivate: [ModuloGuardService]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        ModuloGuardService
    ]
})
export class CategoriaRoutingModule{

}

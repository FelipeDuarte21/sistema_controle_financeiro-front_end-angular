import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModuloGuardService } from "src/app/servicos/modulo-guard.service";
import { CategoriaComponent } from "./categoria.component";
import { CategoriaListarComponent } from "./listar/categoria-listar.component";
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
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriaRoutingModule{

}
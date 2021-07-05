import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriaComponent } from "./categoria.component";
import { CategoriaListarComponent } from "./listar/categoria-listar.component";
import { CategoriaSalvarComponent } from "./salvar/categoria-salvar.component";

const routes: Routes = [
    {
        path: '',
        component: CategoriaComponent,
        children: [
            {
                path: '',
                component: CategoriaListarComponent
            },
            {
                path: 'cadastrar',
                component: CategoriaSalvarComponent
            },
            {
                path: 'atualizar/:id',
                component: CategoriaSalvarComponent
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
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'lancamento/1'
    },
    {
        path: 'categoria',
        loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule)
    },
    {
        path: 'lancamento/:idCategoria',
        loadChildren: () => import('./lancamento/lancamento.module').then(m => m.LancamentoModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule{

}
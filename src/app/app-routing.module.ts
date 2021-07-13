import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoComponent } from "./modulos-principais/autenticacao/autenticacao.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        loadChildren: () => import('./modulos-principais/autenticacao/autenticacao.module').then(m => m.AutenticacaoModule)
    },
    {
        path: 'usuario',
        loadChildren: () => import('./modulos-principais/usuario/usuario.module').then(m => m.UsuarioModule)
    },
    {
        path: 'categoria',
        loadChildren: () => import('./modulos-principais/categoria/categoria.module').then(m => m.CategoriaModule)
    },
    {
        path: 'lancamento/:idCategoria',
        loadChildren: () => import('./modulos-principais/lancamento/lancamento.module').then(m => m.LancamentoModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule{

}
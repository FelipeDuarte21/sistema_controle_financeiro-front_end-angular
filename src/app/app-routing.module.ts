import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

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
        path: 'usuarios',
        loadChildren: () => import('./modulos-principais/usuario/usuario.module').then(m => m.UsuarioModule)
    },
    {
        path: 'categoria',
        loadChildren: () => import('./modulos-principais/categoria/categoria.module').then(m => m.CategoriaModule)
    },
    {
        path: 'lancamentos',
        loadChildren: () => import('./modulos-principais/lancamento/lancamento.module').then(m => m.LancamentoModule)
    },
    {
        path: 'anotacoes',
        loadChildren: () => import('./modulos-principais/anotacao/anotacao.module').then(m => m.AnotacaoModule)
    },
    {
        path: 'lancamentos-fixos',
        loadChildren: () => import('./modulos-principais/lancamento-fixo/lancamento-fixo.module').then(m => m.LancamentoFixoModule)
    },
    {
        path: 'parcelados',
        loadChildren: () => import('./modulos-principais/parcelado/parcelado.module').then(m => m.ParceladoModule)
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes,{useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule{

}

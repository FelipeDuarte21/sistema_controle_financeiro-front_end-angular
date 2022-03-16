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
        path: 'categorias',
        loadChildren: () => import('./modulos-principais/categoria/categoria.module').then(m => m.CategoriaModule)
    },
    {
        path: 'lancamentos',
        loadChildren: () => import('./modulos-principais/lancamento/lancamento.module').then(m => m.LancamentoModule)
    },
    {
        path: 'anotacoes',
        loadChildren: () => import('./modulos-principais/anotacao-categoria/anotacao-categoria.module').then(m => m.AnotacaoCategoriaModule)
    },
    {
        path: 'parcelados',
        loadChildren: () => import('./modulos-principais/parcelados/parcelados.module').then(m => m.ParceladosModule)
    },
    {
        path: 'lancamentos-salvos',
        loadChildren: () => import('./modulos-principais/lancamento-salvo/lancamento-salvo.module').then(m => m.LancamentoSalvoModule)
    },
    {
        path: 'sobre',
        loadChildren: () => import('./modulos-principais/sobre/sobre.module').then(m => m.SobreModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule{

}
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModuloGuardService } from "src/app/servicos/guardas/modulo-guard.service";
import { AnotacaoCategoriaComponent } from "./anotacao-categoria.component";
import { AnotacaoCategoriaListarComponent } from "./listar/anotacao-categoria-listar.component";
import { AnotacaoCategoriaSalvarComponent } from "./salvar/anotacao-categoria-salvar.component";

const routes: Routes = [
    {
        path: '',
        component: AnotacaoCategoriaComponent,
        canActivate: [ModuloGuardService],
        children: [
            {
                path: '',
                component: AnotacaoCategoriaListarComponent,
                canActivate: [ModuloGuardService]
            },
            {
                path: 'cadastrar',
                component: AnotacaoCategoriaSalvarComponent,
                canActivate: [ModuloGuardService]
            },
            {
                path: 'atualizar/:id',
                component: AnotacaoCategoriaSalvarComponent,
                canActivate: [ModuloGuardService]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnotacaoCategoriaRoutingModule{

}
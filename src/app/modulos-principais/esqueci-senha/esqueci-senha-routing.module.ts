import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EsqueciSenhaComponent } from "./esqueci-senha.component";
import { TelaEmailComponent } from "./tela-email/tela-email.component";
import { TelaSucessoComponent } from "./tela-sucesso/tela-sucesso.component";


const routes: Routes = [
    {
        path: '',
        component: EsqueciSenhaComponent,
        children: [
            {
                path: '',
                component: TelaEmailComponent
            },
            {
                path: 'sucesso',
                component: TelaSucessoComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EsqueciSenhaRoutingModule{

}
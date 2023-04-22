import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BtnCadastrarComponent } from "./btn-cadastrar/btn-cadastrar.component";
import { BtnEditarComponent } from "./btn-editar/btn-editar.component";
import { BtnExcluirComponent } from "./btn-excluir/btn-excluir.component";
import { BtnVoltarComponent } from "./btn-voltar/btn-voltar.component";

@NgModule({
    declarations: [
        BtnVoltarComponent,
        BtnCadastrarComponent,
        BtnEditarComponent,
        BtnExcluirComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        BtnVoltarComponent,
        BtnCadastrarComponent,
        BtnEditarComponent,
        BtnExcluirComponent
    ]
})
export class BtnsModule{

}